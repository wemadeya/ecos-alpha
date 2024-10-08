let graphiqueEcos;
let sortedData = [];

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

// Fonction pour initialiser sortedData
function initializeSortedData(notes, classements) {
  sortedData = notes
    .map((note, i) => ({ note, classement: classements[i] }))
    .sort((a, b) => a.note - b.note);
}

// Fonction pour mettre à jour la valeur affichée du slider
function updateSliderValue(spanId, value) {
  document.getElementById(spanId).innerText = value;
  updateMarker(parseFloat(document.getElementById('noteEDN').value), parseFloat(document.getElementById('noteECOS').value));
}

// Fonction pour créer un graphique avec Chart.js
function createChart(matiere, notes, classements, limite) {
  
  initializeSortedData(notes, classements);

  const sortedNotes = sortedData.map((d) => d.note);

  // Calculer la régression polynomiale de degré 3
  const result = regression.polynomial(
    sortedData.map((d) => [d.note, d.classement]),
    { order: 3 }
  );
  const regressionLine = result.points;

  // Créer un nouvel élément canvas pour chaque graphique
  const canvas = document.createElement("canvas");

  // Ajouter le canvas au conteneur
  const container = document.getElementById("charts");
  container.innerHTML = ""; // Effacer le contenu précédent
  container.appendChild(canvas);

  // Configurer le graphique Chart.js
  graphiqueEcos = new Chart(canvas, {
    type: "line",
    data: {
      labels: sortedNotes, // Les notes sur l'axe X, triées
      datasets: [
        {
          label: `Classement pour ${matiere}`,
          data: sortedData.map((d) => [d.note, d.classement]), 
          borderColor: "transparent",
          tension: 0,
          showLine: false,
          pointBackgroundColor: "black",
          pointRadius: 2
        },
        {
          label: `Rang limite pour ${matiere}`,
          data: Array(sortedNotes.length).fill(limite), // La limite à afficher comme ligne
          fill: true,
          borderColor: "#48DE5A",
          backgroundColor: "rgba(72, 222, 90, 0.10)",
          pointRadius: 0, // Pas de points
        },
        {
          label: "Régression lisse",
          data: regressionLine.map((point) => ({ x: point[0], y: point[1] })),
          borderColor: "rgba(0, 0, 255, 0.8)",
          pointRadius: 0,
          borderWidth: 2,
          showLine: true,
          tension: 0.4,
          fill: false,
          backgroundColor: "rgba(0, 115, 250, 0.25)",
        },
      ],
    },
    options: {
      scales: {
        y: {
          reverse: true, // Inverser l'axe des Y (de 10000 à 0)
          min: 0, // Minimum sur l'axe Y
          max: 10500, // Maximum sur l'axe Y
          title: {
            display: true,
            text: "Classement",
          },
        },
        x: {
          type: 'linear',
          reverse: false, // Abscisse croissante, donc on désactive l'inversion ici
          min: 9.5,
          max: 17,
          ticks: {
            stepSize: 1, 
          },
          title: {
            display: true,
            text: "Note Totale",
          },
        },
      },
    },
  });
}

function updateMarker(noteEDN, noteECOS) {
  const noteTotale = Math.round((2 / 3 * noteEDN + 1 / 3 * noteECOS) * 100) / 100; 

  // Trouver le point le plus proche dans les données
  const pointGraphique = sortedData.reduce((prev, curr) => {
    return (Math.abs(curr.note - noteTotale) < Math.abs(prev.note - noteTotale) ? curr : prev);
  });

  const marker = {
    label: 'Classement estimé',
    data: [{ x: pointGraphique.note, y: pointGraphique.classement }],
    borderColor: 'rgba(0, 123, 255, 1)',
    backgroundColor: 'rgba(0, 123, 255, 1)',
    pointRadius: 5,
    showLine: false,
    fill: false
  };

  // Mettre à jour ou ajouter le marqueur au graphique
  const markerIndex = graphiqueEcos.data.datasets.findIndex(dataset => dataset.label === 'Classement estimé');
  if (markerIndex >= 0) {
    graphiqueEcos.data.datasets[markerIndex].data = [{ x: pointGraphique.note, y: pointGraphique.classement }];
  } else {
    graphiqueEcos.data.datasets.push(marker);
  }

  // Rafraîchir le graphique pour refléter les changements
  graphiqueEcos.update();
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
const btnChart = document.querySelector(".btn_chart");

btnChart.addEventListener("click", () => {

})
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
