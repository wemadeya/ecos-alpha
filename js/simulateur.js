let graphiqueEcos;
let sortedData = [];
let isButtonClicked = false; // Variable pour suivre si le bouton a été cliqué

// Fonction pour récupérer les données de la deuxième API (limites)
async function fetchLimitesData() {
  try {
    const response = await fetch("https://n8n.wemadeya.fr/webhook/b7545da9-8d97-406a-85ac-fe8097132737");
    const data = await response.json();
    return data.limites; // Retourne les données des limites
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'API :', error);
    return [];
  }
}

// Fonction pour récupérer les données de la première API (notes et classements)
async function fetchMatiereData() {
  try {
    const response = await fetch("https://n8n.wemadeya.fr/webhook/f7e590f8-6eed-45f4-a13b-ac1e4ea9bcd1");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données des matières :', error);
    return [];
  }
}

// Fonction pour initialiser sortedData
function initializeSortedData(notes, classements) {
  sortedData = notes.map((note, i) => ({ note, classement: classements[i] })).sort((a, b) => a.note - b.note);
}

// Fonction pour créer une légende personnalisée avec des checkboxes
function createCustomLegend(chart) {
  const legendContainer = document.getElementById('chart-legend-container');
  legendContainer.innerHTML = ''; // Efface le contenu précédent

  chart.data.datasets.forEach((dataset, index) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !dataset.hidden; // Afficher ou masquer par défaut selon la configuration du dataset
    checkbox.id = `checkbox-${index}`;
    checkbox.onchange = () => {
      const meta = chart.getDatasetMeta(index);
      meta.hidden = !checkbox.checked; // Affiche ou masque le dataset
      chart.update();
    };

    const label = document.createElement('label');
    label.htmlFor = `checkbox-${index}`;
    label.textContent = dataset.label;

    const legendItem = document.createElement('div');
    legendItem.appendChild(checkbox);
    legendItem.appendChild(label);
    legendContainer.appendChild(legendItem);
  });
}

// Fonction pour créer un graphique avec Chart.js
function createChart(matiere, notes, classements, limite, noteCalculee) {
  initializeSortedData(notes, classements);
  const sortedNotes = sortedData.map((d) => d.note);

  // Obtenir la note minimum et maximum pour la matière sélectionnée
  const minNote = Math.min(...sortedNotes);
  const maxNote = Math.max(...sortedNotes);

  // Déterminer les bornes de l'axe X en fonction de la note calculée
  let xAxisMin = Math.min(minNote, noteCalculee);
  let xAxisMax = Math.max(maxNote, noteCalculee);

  // Valeur minimale de l'axe Y
  const yAxisMin = -1000;

  // Calculer la régression polynomiale de degré 3
  const result = regression.polynomial(sortedData.map((d) => [d.note, d.classement]), { order: 3 });
  let regressionLine = result.points;

  // Forcer les points de la courbe de régression à correspondre aux valeurs réelles aux extrémités
  regressionLine[0] = [sortedData[0].note, sortedData[0].classement];
  regressionLine[regressionLine.length - 1] = [sortedData[sortedData.length - 1].note, sortedData[sortedData.length - 1].classement];

  // Créer un nouvel élément canvas pour le graphique
  const canvas = document.createElement("canvas");
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
          label: `Classement`,
          data: sortedData.map((d) => ({ x: d.note, y: d.classement })),
          borderColor: "rgba(0, 0, 0, 0.8)",
          backgroundColor: "transparent",
          tension: 0.4,
          fill: false,
          pointBackgroundColor: "black",
          pointRadius: 1.5,
          showLine: false,
          hidden: true,
        },
        {
          label: `Rang limite`,
          data: [{ x: xAxisMin, y: limite }, { x: xAxisMax, y: limite }],
          fill: 'end',
          borderColor: "#48DE5A",
          backgroundColor: "rgba(72, 222, 90, 0.20)",
          pointRadius: 1,
          borderWidth: 1,
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
      plugins: {
        tooltip: {
          enabled: true,
          position: 'nearest',
          mode: "index",
          intersect: true,
          callbacks: {
            label: function (tooltipItem) {
              const dataset = tooltipItem.chart.data.datasets[tooltipItem.datasetIndex];
              // Ne pas afficher le tooltip pour les datasets "Régression lisse" et "Classement"
              if (dataset.label === 'Régression lisse' || dataset.label === 'Classement') {
                return null;
              }
              // Afficher le classement estimé pour le marqueur "Classement estimé"
              if (dataset.label === 'Classement estimé') {
                const classementEstime = Math.round(tooltipItem.raw.y); // Afficher le classement estimé arrondi
                return `${dataset.label}: ${classementEstime}`; // Afficher le classement estimé pour le marqueur
              }
            },
          },
        },
        legend: { display: false },
      },
      hover: { mode: 'nearest', intersect: true },
      scales: {
        x: {
          type: 'linear',
          min: xAxisMin,
          max: xAxisMax,
          title: { display: true, text: "Note Totale" },
          grid: { display: false },
          ticks: { padding: 10 },
        },
        y: {
          min: yAxisMin,
          max: 11000,
          reverse: true,
          title: { display: true, text: "Classement" },
          grid: {
            display: true,
            drawBorder: false, // Désactive la ligne de bordure autour du graphique
            drawOnChartArea: true, // Affiche les lignes de grille dans la zone du graphique
            drawTicks: false, // Désactive les petits traits sur les axes
            color: (context) => (context.tick.value === yAxisMin || context.tick.value === 11000 ? 'transparent' : 'rgba(224, 224, 224, 0.4)'), // Rendre les lignes invisibles aux extrémités
          },
          ticks: {
            padding: 10,
            callback: (value) => (value === yAxisMin || value === 11000 ? '' : value),
          },
        },
      },
    },
  });

  // Créer la légende personnalisée après la création du graphique
  createCustomLegend(graphiqueEcos);
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
        classementEstime = Math.round(point1.classement + slope * (noteTotale - point1.note));
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

// Fonction pour mettre à jour la valeur affichée du slider
function updateSliderValue(sliderId, value) {
  const outputElement = document.getElementById(`${sliderId}Output`);
  if (outputElement) {
    outputElement.textContent = value; // Met à jour la valeur affichée du slider
  }
}
// Fonction pour générer le graphique en fonction de la sélection
async function generateChart() {
  isButtonClicked = true;
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

  const noteEDN = parseFloat(document.getElementById('noteEDN').value);
  const noteECOS = parseFloat(document.getElementById('noteECOS').value);
  const noteCalculee = Math.round((2 / 3 * noteEDN + 1 / 3 * noteECOS) * 100) / 100;

  if (limite) {
    createChart(selectedMatiere, notes, classements, limite, noteCalculee);
    updateMarker(noteEDN, noteECOS);
  } else {
    alert(`Aucune limite trouvée pour ${selectedMatiere} dans la ville ${selectedVille}`);
  }
}

// Fonction pour initialiser le formulaire avec les matières et villes
async function initForm() {
  const limitesData = await fetchLimitesData();
  const specialites = [...new Set(limitesData.map(d => d.Spécialité))];
  const villes = [...new Set(limitesData.map(d => d.Ville))];

  const matiereSelect = document.getElementById("matiere");
  const villeSelect = document.getElementById("ville");

  specialites.forEach((specialite) => {
    const option = document.createElement("option");
    option.value = specialite;
    option.textContent = specialite;
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
  await initForm();
  generateChart();
}

// Initialisation du formulaire et démarrage de l'application
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
