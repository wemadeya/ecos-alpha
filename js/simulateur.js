// Liste des matières
const matieres = [
  "Allergologie",
  "Anatomie et cytologie pathologiques",
  "Anesthésie-réanimation",
  "Biologie médicale",
  "Chirurgie maxillo-faciale",
  "Chirurgie orale",
  "Chirurgie orthopédique et traumatologique",
  "Chirurgie pédiatrique",
  "Chirurgie plastique, reconstructrice et esthétique",
  "Chirurgie thoracique et cardiovasculaire",
  "Chirurgie vasculaire",
  "Chirurgie viscérale et digestive",
  "Dermatologie et vénéréologie",
  "Endocrinologie-diabétologie-nutrition",
  "Génétique médicale",
  "Gériatrie",
  "Gynécologie médicale",
  "Gynécologie obstétrique",
  "Hématologie",
  "Hépato-gastro-entérologie",
  "Maladies infectieuses et tropicales",
  "Médecine cardiovasculaire",
  "Médecine d’urgence",
  "Médecine et santé au travail",
  "Médecine générale",
  "Médecine intensive-réanimation",
  "Médecine interne et immunologie clinique",
  "Médecine légale et expertises médicales",
  "Médecine nucléaire",
  "Médecine physique et de réadaptation",
  "Médecine vasculaire",
  "Néphrologie",
  "Neurochirurgie",
  "Neurologie",
  "Oncologie",
  "Ophtalmologie",
  "Oto-rhino-laryngologie - chirurgie cervico-faciale",
  "Pédiatrie",
  "Pneumologie",
  "Psychiatrie",
  "Radiologie et imagerie médicale",
  "Rhumatologie",
  "Santé publique",
  "Urologie",
];

// Fonction pour récupérer les données de la première API (notes et classements)
async function fetchMatiereData() {
  const response = await fetch(
    "https://n8n.wemadeya.fr/webhook/f7e590f8-6eed-45f4-a13b-ac1e4ea9bcd1"
  );
  const data = await response.json();
  return data.data;
}

// Fonction pour récupérer les données de la deuxième API (limites)
async function fetchLimitesData() {
  const response = await fetch(
    "https://n8n.wemadeya.fr/webhook/b7545da9-8d97-406a-85ac-fe8097132737"
  );
  const data = await response.json();
  return data.limites;
}

// Fonction pour calculer la régression linéaire
function calculateLinearRegression(xValues, yValues) {
  const n = xValues.length;
  const sumX = xValues.reduce((a, b) => a + b, 0);
  const sumY = yValues.reduce((a, b) => a + b, 0);
  const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
  const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);

  // Calculer la pente (m) et l'ordonnée à l'origine (b)
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

// Fonction pour générer les points de la ligne de régression
function getRegressionLine(xValues, slope, intercept) {
  return xValues.map((x) => slope * x + intercept);
}

// Fonction pour créer un graphique avec Chart.js
function createChart(matiere, notes, classements, limite) {
  // Trier les notes et classements par ordre croissant
  const sortedData = notes
    .map((note, i) => ({ note, classement: classements[i] }))
    .sort((a, b) => a.note - b.note);

  const sortedNotes = sortedData.map((d) => d.note);
  const sortedClassements = sortedData.map((d) => d.classement);

  // Calculer la régression linéaire
  const { slope, intercept } = calculateLinearRegression(
    sortedNotes,
    sortedClassements
  );
  const regressionLine = getRegressionLine(sortedNotes, slope, intercept);

  // Créer un nouvel élément canvas pour chaque graphique
  const canvas = document.createElement("canvas");

  // Ajouter le canvas au conteneur
  const container = document.getElementById("charts");
  container.innerHTML = ""; // Effacer le contenu précédent
  container.appendChild(canvas);

  // Configurer le graphique Chart.js
  new Chart(canvas, {
    type: "line",
    data: {
      labels: sortedNotes, // Les notes sur l'axe X, triées
      datasets: [
        {
          label: `Classement pour ${matiere}`,
          data: sortedClassements, // Les classements sur l'axe Y, triés
          borderColor: "transparent",
          tension: 0,
          showLine: false,
          pointBackgroundColor: "black",
          pointRadius: 2,
        },
        {
          label: `Rang limite pour ${matiere}`,
          data: Array(sortedNotes.length).fill(limite), // La limite à afficher comme ligne
          fill: true,
          borderColor: "rgba(72, 222, 90, 1)",
          backgroundColor: "rgba(72, 222, 90, 0.1)",
          //borderDash: [10, 10], // Ligne pointillée
          pointRadius: 0, // Pas de points
        },
        {
          label: "Régression linéaire",
          data: regressionLine, // Points de la régression linéaire
          fill: false,
          borderColor: "rgba(0, 0, 255, 0.8)", // Couleur de la régression linéaire
          pointRadius: 0, // Pas de points
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          reverse: true, // Inverser l'axe des Y (de 10000 à 0)
          min: 0, // Minimum sur l'axe Y
          max: 10000, // Maximum sur l'axe Y
          title: {
            display: true,
            text: "Classement",
          },
        },
        x: {
          reverse: false, // Abscisse croissante, donc on désactive l'inversion ici
          title: {
            display: true,
            text: "Note Totale",
          },
        },
      },
    },
  });
}

// Initialiser le formulaire avec les matières et villes
function initForm(matieres, villes) {
  const matiereSelect = document.getElementById("matiere");
  const villeSelect = document.getElementById("ville");

  // Ajouter les matières
  matieres.forEach((matiere) => {
    const option = document.createElement("option");
    option.value = matiere;
    option.textContent = matiere;
    matiereSelect.appendChild(option);
  });

  // Ajouter les villes
  villes.forEach((ville) => {
    const option = document.createElement("option");
    option.value = ville;
    option.textContent = ville;
    villeSelect.appendChild(option);
  });
}

// Fonction pour générer le graphique en fonction de la sélection
async function generateChart() {
  const selectedMatiere = document.getElementById("matiere").value;
  const selectedVille = document.getElementById("ville").value;

  const matiereData = await fetchMatiereData();
  const limitesData = await fetchLimitesData();

  // Récupérer les données de la matière sélectionnée
  const matiereEntry = matiereData.find(
    (obj) => Object.keys(obj)[0] === selectedMatiere
  );

  // Vérification si la matière a été trouvée
  if (!matiereEntry) {
    alert(`Aucune donnée trouvée pour la matière ${selectedMatiere}`);
    return;
  }

  const matiereValues = matiereEntry[selectedMatiere];
  const notes = matiereValues.map((d) => d.Note);
  const classements = matiereValues.map((d) => d.Classement);

  // Récupérer la limite pour la ville sélectionnée
  const limiteVille = limitesData.find(
    (obj) => obj.Spécialité === selectedMatiere && obj.Ville === selectedVille
  );
  const limite = limiteVille ? limiteVille["Rang limite ajusté"] : null;

  // Générer le graphique avec la limite
  if (limite) {
    createChart(selectedMatiere, notes, classements, limite);
  } else {
    alert(
      `Aucune limite trouvée pour ${selectedMatiere} dans la ville ${selectedVille}`
    );
  }
}

// Fonction principale pour démarrer l'application
async function initApp() {
  const limitesData = await fetchLimitesData();

  // Extraire les villes disponibles à partir des limites
  const villes = [...new Set(limitesData.map((d) => d.Ville))];

  // Initialiser le formulaire avec les matières et les villes
  initForm(matieres, villes);

  // Définir une matière et une ville par défaut
  const defaultMatiere = matieres[0]; // Par exemple, la première matière
  const defaultVille = villes[0]; // Par exemple, la première ville

  // Sélectionner les valeurs par défaut dans les menus déroulants
  document.getElementById("matiere").value = defaultMatiere;
  document.getElementById("ville").value = defaultVille;

  // Générer le graphique par défaut
  generateChart();
}

// Démarrer l'application
initApp();


const { scrollTop, clientHeight } = document.documentElement;
window.addEventListener("scroll", () => {

  /* simulateur */
  const simulateurContent1 = document.querySelector(".simulateur_content_1");
  const simulateurContent2 = document.querySelector(".simulateur_content_2");
  const simulateurIphone = document.querySelector(".simulateur_iphone img");
  const simulateurContent2Text1 = document.querySelector(".simulateur_content_2_text1");
  const simulateurContent2Text2 = document.querySelector(".simulateur_content_2_text2");

  const simulateurContent1Top = simulateurContent1.getBoundingClientRect().top;
  const simulateurContent2Top = simulateurContent2.getBoundingClientRect().top;

  if (scrollTop > scrollTop + simulateurContent1Top - clientHeight * 0.8) {
    simulateurContent1.classList.add("anim-y-both");
    simulateurIphone.classList.add("anim-iphone-simulateur");
  }
  if (scrollTop > scrollTop + simulateurContent2Top - clientHeight * 0.8) {
    simulateurContent2.classList.add("anim-y-both");
    simulateurContent2Text1.classList.add("anim-y-both");
    simulateurContent2Text2.classList.add("anim-y-both");
  }

});
