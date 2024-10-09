let graphiqueEcos;
let sortedData = [];
let isButtonClicked = false; // Variable pour suivre si le bouton a été cliqué

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
}

// Fonction pour créer un graphique avec Chart.js
function createChart(matiere, notes, classements, limite) {
  initializeSortedData(notes, classements);
  const sortedNotes = sortedData.map((d) => d.note);

  // Obtenir la note minimum et maximum pour la matière sélectionnée
  const minNote = Math.min(...sortedNotes);
  const maxNote = Math.max(...sortedNotes);

// Calculer la régression polynomiale de degré 3
const result = regression.polynomial(
  sortedData.map((d) => [d.note, d.classement]),
  { order: 3 }
);

// Ajuster manuellement la courbe aux extrémités pour passer par les points réels
let regressionLine = result.points;

// Forcer le premier point de la courbe de régression à correspondre exactement à la note et au classement minimum
regressionLine[0] = [sortedData[0].note, sortedData[0].classement];

// Forcer le dernier point de la courbe de régression à correspondre exactement à la note et au classement maximum
regressionLine[regressionLine.length - 1] = [sortedData[sortedData.length - 1].note, sortedData[sortedData.length - 1].classement];

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
      labels: sortedNotes,
      datasets: [
        {
          label: `Classement pour ${matiere}`,
          data: sortedData.map((d) => ({ x: d.note, y: d.classement })), // Utilisation de {x, y} pour une meilleure flexibilité
          borderColor: "rgba(0, 0, 0, 0.8)",
          backgroundColor: "transparent",
          tension: 0.4,
          fill: false,
          pointBackgroundColor: "black",
          pointRadius: 2,
          showLine: false,
        },
        {
          label: `Rang limite pour ${matiere}`,
          data: Array(sortedNotes.length).fill(limite),
          fill: true,
          borderColor: "#48DE5A",
          backgroundColor: "rgba(72, 222, 90, 0.20)",
          pointRadius: 0,
          borderWidth: 0.5,
        },
        {
          label: "Régression lisse",
          data: regressionLine.map((point) => ({ x: point[0], y: point[1] })),
          borderColor: "rgba(0, 0, 255, 0.8)",
          pointRadius: 0,
          borderWidth: 2,
          showLine: true,
          tension: 0.3,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          min: minNote,
          max: maxNote,
          title: {
            display: true,
            text: "Note Totale",
          },
          ticks: {
            align: 'center', // Positionne le texte de l'étiquette horizontalement au centre de chaque tick
            crossAlign: 'center', // Aligne le texte de l'étiquette verticalement au centre
            padding: 5, // Ajuste l'espace autour du texte
          },
        },
        y: {
          reverse: true,
          min: -500,
          max: 10500,
          title: {
            display: true,
            text: "Classement",
          },
          ticks: {
            align: 'start', // Positionne le texte de l'étiquette horizontalement au début
            crossAlign: 'center', // Aligne le texte de l'étiquette verticalement au centre
            padding: 10, // Ajuste l'espace autour du texte pour le séparer de l'axe
          },
        },
      },
    },
  });
}


// Fonction pour mettre à jour le marqueur du classement estimé
function updateMarker(noteEDN, noteECOS) {
  if (!isButtonClicked) return; // Ne pas afficher le marqueur si le bouton n'a pas été cliqué

  const noteTotale = Math.round((2 / 3 * noteEDN + 1 / 3 * noteECOS) * 100) / 100;

  // Vérifier si la noteTotale est en dehors de la plage des données
  const minNote = Math.min(...sortedData.map(d => d.note));
  const maxNote = Math.max(...sortedData.map(d => d.note));

  let classementEstime;
  if (noteTotale < minNote) {
    classementEstime = sortedData[0].classement; // Utiliser le classement minimum si en dessous de la plage
  } else if (noteTotale > maxNote) {
    classementEstime = sortedData[sortedData.length - 1].classement; // Utiliser le classement maximum si au-dessus de la plage
  } else {
    // Interpolation linéaire si la noteTotale est dans la plage
    for (let i = 0; i < sortedData.length - 1; i++) {
      const point1 = sortedData[i];
      const point2 = sortedData[i + 1];
      if (point1.note <= noteTotale && noteTotale <= point2.note) {
        const slope = (point2.classement - point1.classement) / (point2.note - point1.note);
        classementEstime = point1.classement + slope * (noteTotale - point1.note);
        break;
      }
    }
  }

  // Créer le marqueur à l'emplacement exact de la noteTotale et du classement estimé
  const marker = {
    label: 'Classement estimé',
    data: [{ x: noteTotale, y: classementEstime }],
    borderColor: 'rgba(0, 123, 255, 1)',
    backgroundColor: 'rgba(0, 123, 255, 1)',
    pointRadius: 5,
    showLine: false,
    fill: false,
  };

  // Mettre à jour ou ajouter le marqueur au graphique
  const markerIndex = graphiqueEcos.data.datasets.findIndex(dataset => dataset.label === 'Classement estimé');
  if (markerIndex >= 0) {
    graphiqueEcos.data.datasets[markerIndex].data = [{ x: noteTotale, y: classementEstime }];
  } else {
    graphiqueEcos.data.datasets.push(marker);
  }

  // Rafraîchir le graphique pour refléter les changements
  graphiqueEcos.update();
}

// Fonction pour générer le graphique en fonction de la sélection
async function generateChart() {
  isButtonClicked = true; // Marquer que le bouton a été cliqué
  const selectedMatiere = document.getElementById("matiere").value;
  const selectedVille = document.getElementById("ville").value;

  const matiereData = await fetchMatiereData();
  const limitesData = await fetchLimitesData();

  const matiereEntry = matiereData.find((obj) => Object.keys(obj)[0] === selectedMatiere);

  if (!matiereEntry) {
    alert(`Aucune donnée trouvée pour la matière ${selectedMatiere}`);
    return;
  }

  const matiereValues = matiereEntry[selectedMatiere];
  const notes = matiereValues.map((d) => d.Note);
  const classements = matiereValues.map((d) => d.Classement);

  const limiteVille = limitesData.find(
    (obj) => obj.Spécialité === selectedMatiere && obj.Ville === selectedVille
  );
  const limite = limiteVille ? limiteVille["Rang limite ajusté"] : null;

  if (limite) {
    createChart(selectedMatiere, notes, classements, limite);

    const noteEDN = parseFloat(document.getElementById('noteEDN').value);
    const noteECOS = parseFloat(document.getElementById('noteECOS').value);
    updateMarker(noteEDN, noteECOS);
  } else {
    alert(`Aucune limite trouvée pour ${selectedMatiere} dans la ville ${selectedVille}`);
  }
}

// Initialiser le formulaire avec les matières et villes
function initForm(matieres, villes) {
  const matiereSelect = document.getElementById("matiere");
  const villeSelect = document.getElementById("ville");

  matieres.forEach((matiere) => {
    const option = document.createElement("option");
    option.value = matiere;
    option.textContent = matiere;
    matiereSelect.appendChild(option);
  });

  villes.forEach((ville) => {
    const option = document.createElement("option");
    option.value = ville;
    option.textContent = ville;
    villeSelect.appendChild(option);
  });
}

// Fonction principale pour démarrer l'application
async function initApp() {
  const limitesData = await fetchLimitesData();
  const villes = [...new Set(limitesData.map((d) => d.Ville))];

  initForm(matieres, villes);

  const defaultMatiere = matieres[0];
  const defaultVille = villes[0];

  document.getElementById("matiere").value = defaultMatiere;
  document.getElementById("ville").value = defaultVille;

  generateChart(); // Initialiser le graphique sans le marqueur
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
