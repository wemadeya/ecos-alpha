let graphiqueEcos;
let sortedData = [];

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

  // Ajuster les bornes de l'axe X en fonction de la note calculée
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

  const ctx = canvas.getContext('2d');

  // Fixer la taille du canvas
  canvas.width = 350;  // ou toute autre largeur nécessaire
  canvas.height = 420;

  // Dessinez un fond blanc sur le canvas
  ctx.fillStyle = '#ffffff'; // Couleur de fond
  ctx.fillRect(0, 0, canvas.width, canvas.height); 

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
          label: "Régression lisse",
          data: regressionLine.map((point) => ({ x: point[0], y: point[1] })),
          borderColor: "rgba(0, 0, 255, 0.8)",
          backgroundColor: "rgba(0, 0, 255, 0.8)",
          pointRadius: 0,
          borderWidth: 2,
          showLine: true,
          tension: 0.5,
          fill: false,
        },
        {
          label: `Autres étudiants`,
          data: sortedData.map((d) => ({ x: d.note, y: d.classement })),
          borderColor: "rgba(0, 0, 0, 0.8)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          tension: 0.4,
          fill: false,
          pointBackgroundColor: "black",
          pointRadius: 1.5,
          showLine: false,
        },
        {
          label: `Rang limite`,
          data: [
            { x: xAxisMin, y: limite },
            { x: xAxisMax, y: limite }
          ],
          fill: 'end',
          borderColor: "#48DE5A",
          backgroundColor: "rgba(72, 222, 90, 0.20)",
          pointRadius: 1,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: true,
          position: 'bottom', 
          align: 'start',
          labels: {
            usePointStyle: true,
            padding: 20,
            generateLabels: function (chart) {
              const datasets = chart.data.datasets;
            
              return datasets.map((dataset, i) => {
                let label = dataset.label;
                if (label === 'Rang limite') {
                  label += ` : ${limite}`; // Ajouter la valeur de rang limite
                } else if (label.startsWith('Ton classement')) {
                  const classementEstime = dataset.data[0]?.y || 'N/A'; // Récupérer la valeur du classement estimé
                  const noteTotale = dataset.data[0]?.x || 'N/A'; // Récupérer la note calculée
                  label += ` : ${classementEstime} (Note : ${noteTotale})`; // Ajouter la valeur du classement estimé suivi de la note calculée
                }
                return {
                  text: label,
                  fillStyle: dataset.backgroundColor,
                  strokeStyle: dataset.borderColor,
                  hidden: !chart.isDatasetVisible(i),
                  index: i,
                };
              });
            },
          },
        },
      },
      // Désactiver les interactions par survol
      hover: {
        mode: null, // Désactiver le mode de survol
      },
      // Désactiver les événements au clic/survol
      events: [],
      scales: {
        x: {
          type: 'linear',
          min: xAxisMin, // Ajuster l'axe X pour inclure la note calculée
          max: xAxisMax, // Ajuster l'axe X pour inclure la note calculée
          title: { 
            display: true,
            text: "Note totale"
          },
          grid: { display: false },
          ticks: { padding: 10 },
        },
        y: {
          min: yAxisMin,
          max: 11000,
          reverse: true,
          title: { display: false, text: "Classement" },
          grid: {
            display: true,
            drawBorder: false,
            drawOnChartArea: true,
            drawTicks: false,
            color: (context) => (context.tick.value === yAxisMin || context.tick.value === 11000 ? 'transparent' : 'rgba(224, 224, 224, 0.5)'),
          },
          ticks: {
            padding: 10,
            display: window.innerWidth > 430,
            callback: (value) => (value === yAxisMin || value === 11000 ? '' : value),
          },
        },
      },
    },
  });
}


// Fonction pour mettre à jour le marqueur du classement estimé
function updateMarker(noteEDN, noteECOS) {
  const noteTotale = Math.round((2 / 3 * noteEDN + 1 / 3 * noteECOS) * 100) / 100;

  // Vérifier si la noteTotale est en dehors de la plage des données
  const minNote = Math.min(...sortedData.map(d => d.note));
  const maxNote = Math.max(...sortedData.map(d => d.note));

  let classementEstime = null;
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

  // Si aucun classement estimé n'est trouvé, on laisse le marqueur vide
  if (classementEstime === null) {
    console.error('Erreur : impossible de calculer le classement estimé.');
    return;
  }

  // Arrondir la valeur du classement estimé
  classementEstime = Math.round(classementEstime);

  // Créer le marqueur à l'emplacement exact de la noteTotale et du classement estimé
  const marker = {
    label: `Ton classement`,
    data: [{ x: noteTotale, y: classementEstime }],
    borderColor: '#FF4747',
    backgroundColor: '#FF4747',
    pointRadius: 6,
    pointHoverRadius: 12,
    showLine: false,
    fill: false,
    pointStyle: 'circle',
    z: 10 // Donne une priorité visuelle plus élevée aux points du marqueur
  };

  // Mettre à jour ou ajouter le marqueur au graphique
  const markerIndex = graphiqueEcos.data.datasets.findIndex(dataset => dataset.label === 'Ton classement');
  if (markerIndex >= 0) {
    // Supprimez l'ancien dataset du marqueur pour l'ajouter à la fin
    graphiqueEcos.data.datasets.splice(markerIndex, 1);
  }

  // Ajouter le marqueur en dernier dans les datasets pour le dessiner par-dessus les autres
  graphiqueEcos.data.datasets.push(marker);

  // Rafraîchir le graphique et la légende
  graphiqueEcos.update();
}



window.addEventListener('resize', () => {
  graphiqueEcos.options.scales.y.ticks.display = window.innerWidth > 430;
  graphiqueEcos.update(); // Mettre à jour le graphique
});

// Fonction pour mettre à jour la valeur affichée du slider
function updateSliderValue(sliderId, value) {
  const outputElement = document.getElementById(`${sliderId}Output`);
  if (outputElement) {
    outputElement.textContent = value; // Met à jour la valeur affichée du slider
  }
}
// Fonction pour générer le graphique en fonction de la sélection
async function generateChart() {
  const selectedMatiere = document.getElementById("matiere").value;
  const selectedVille = document.getElementById("ville").value;

  // Obtenez les éléments du message par défaut et du conteneur du simulateur
  const defaultMessage = document.getElementById("default-message");
  const classementContainer = document.querySelector(".classement");

  // Vérifiez si une ville et une spécialité sont sélectionnées
  if (!selectedVille || !selectedMatiere || selectedMatiere === "") {
    // Afficher le message par défaut et masquer le simulateur
    defaultMessage.style.display = "block";
    classementContainer.style.display = "none"; // Masquer le simulateur
    return;
  }

  defaultMessage.style.display = "none"; // Masquer le message par défaut
  classementContainer.style.display = "flex"; // Afficher le simulateur

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



// Fonction pour mettre à jour les spécialités en fonction de la ville sélectionnée
function updateSpecialitesForVille(ville, limitesData) {
  const matiereSelect = document.getElementById("matiere");
  matiereSelect.innerHTML = ''; // Effacer les options précédentes

  // Ajouter l'option par défaut "Choisir une spécialité"
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Choisir une spécialité";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  matiereSelect.appendChild(defaultOption);

  const filteredSpecialites = limitesData
    .filter(d => d.Ville === ville && d["Rang limite ajusté"] !== 0)
    .map(d => d.Spécialité);

  // Trier les spécialités par ordre alphabétique
  const uniqueSpecialites = [...new Set(filteredSpecialites)].sort();

  uniqueSpecialites.forEach((specialite) => {
    const option = document.createElement("option");
    option.value = specialite;
    option.textContent = specialite;
    matiereSelect.appendChild(option);
  });
}

// Fonction pour initialiser le formulaire avec les matières et villes
async function initForm() {
  const limitesData = await fetchLimitesData();
  const villes = [...new Set(limitesData.map(d => d.Ville))].sort(); // Trier les villes par ordre alphabétique

  const villeSelect = document.getElementById("ville");
  const matiereSelect = document.getElementById("matiere");

  // Ajouter l'option par défaut pour la sélection de ville
  const defaultVilleOption = document.createElement("option");
  defaultVilleOption.value = "";
  defaultVilleOption.textContent = "Choisir une ville";
  defaultVilleOption.disabled = true;
  defaultVilleOption.selected = true;
  villeSelect.appendChild(defaultVilleOption);

  // Remplir la liste des villes
  villes.forEach((ville) => {
    const option = document.createElement("option");
    option.value = ville;
    option.textContent = ville;
    villeSelect.appendChild(option);
  });

  // Ajouter l'option par défaut pour la sélection de spécialité
  const defaultMatiereOption = document.createElement("option");
  defaultMatiereOption.value = "";
  defaultMatiereOption.textContent = "Choisir une spécialité";
  defaultMatiereOption.disabled = true;
  defaultMatiereOption.selected = true;
  matiereSelect.appendChild(defaultMatiereOption);

  villeSelect.addEventListener('change', () => {
    const selectedVille = villeSelect.value;
    updateSpecialitesForVille(selectedVille, limitesData);
    
    const selectedMatiere = document.getElementById("matiere").value;
    if (selectedVille || selectedMatiere) {
      generateChart(); // Mettre à jour le graphique seulement si les deux sont sélectionnés
    }
  });
  
  matiereSelect.addEventListener('change', () => {
    const selectedVille = document.getElementById("ville").value;
    const selectedMatiere = matiereSelect.value;
    
    if (selectedVille || selectedMatiere) {
      generateChart(); // Mettre à jour le graphique seulement si les deux sont sélectionnés
    }
  });
}



// Fonction principale pour démarrer l'application
async function initApp() {
  await initForm();

  const noteEDNInput = document.getElementById('noteEDN');
  const noteECOSInput = document.getElementById('noteECOS');
  
  noteEDNInput.addEventListener('input', () => {
    const noteEDN = parseFloat(noteEDNInput.value);
    const noteECOS = parseFloat(noteECOSInput.value);
  
    // Régénérer le graphique avec les nouvelles valeurs EDN et ECOS
    generateChart().then(() => {
      // Une fois le graphique généré, mettre à jour le marqueur
      updateMarker(noteEDN, noteECOS);
    });
  });
  
  noteECOSInput.addEventListener('input', () => {
    const noteEDN = parseFloat(noteEDNInput.value);
    const noteECOS = parseFloat(noteECOSInput.value);
  
    // Régénérer le graphique avec les nouvelles valeurs EDN et ECOS
    generateChart().then(() => {
      // Une fois le graphique généré, mettre à jour le marqueur
      updateMarker(noteEDN, noteECOS);
    });
  });
  
}

// Initialisation du formulaire et démarrage de l'application
document.addEventListener("DOMContentLoaded", () => {
  initApp(); // Initialiser l'application après le chargement du DOM
});

// Fonction pour afficher ou masquer les options du menu déroulant
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Fonction pour sélectionner une option et afficher sa valeur
function selectOption(selectedElementId, optionElement) {
  const selectedElement = document.getElementById(selectedElementId);
  selectedElement.textContent = optionElement.textContent;
  const dropdownOptions = optionElement.parentElement;
  dropdownOptions.style.display = 'none'; // Masque les options après la sélection
}

// Fonction pour convertir le canvas en image et ouvrir une option de partage

const btnShareChart = document.querySelector(".btn_share_chart");

function shareChartImage() {
  const canvas = document.querySelector("#charts canvas");

  if (canvas) {
    // Créer un canvas temporaire pour ajouter un fond blanc
    const tempCanvas = document.createElement("canvas");
    const ctx = tempCanvas.getContext("2d");

    // Configurer la taille du canvas temporaire pour correspondre au canvas d'origine
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Dessinez un fond blanc sur le canvas temporaire
    ctx.fillStyle = '#ffffff'; // Couleur de fond blanche
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Dessiner le canvas original par-dessus le fond blanc
    ctx.drawImage(canvas, 0, 0);

    // Convertir le canvas temporaire en image PNG
    const imageURL = tempCanvas.toDataURL("image/png");

    // Vérifiez si l'API Web Share est disponible
    if (navigator.share) {
      // Utilisez l'API Web Share pour partager l'image directement via les options natives
      navigator.share({
        title: 'Mon résultat ECOS !',
        text: 'Voici mon classement et mes notes pour la ville et la spécialité sélectionnées !',
        files: [
          new File([dataURItoBlob(imageURL)], "graphique-ecos.png", { type: "image/png" })
        ]
      }).then(() => {
        console.log('Partage réussi');
      }).catch((error) => {
        console.error('Erreur lors du partage :', error);
      });
    } else {
      // Si l'API Web Share n'est pas disponible, afficher simplement l'image dans une nouvelle fenêtre
      const newTab = window.open();
      newTab.document.body.innerHTML = `<img src="${imageURL}" alt="Graphique ECOS" />`;
    }
  } else {
    alert("Veuillez choisir une ville, une spécialité ainsi que des notes EDN et ECOS pour pouvoir partager le graphique.");
  }
}

// Fonction pour convertir les données en base64 en Blob
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}


// Fonction pour convertir les données en base64 en Blob
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

btnShareChart.addEventListener("click", () => {
  shareChartImage();
});


const { scrollTop, clientHeight } = document.documentElement;
window.addEventListener("scroll", () => {

  /* simulateur */
  const simulateurContent1 = document.querySelector(".simulateur_content_1");
  const simulateurContent2 = document.querySelector(".simulateur_content_2");
  const simulateurIphone = document.querySelector(".simulateur_iphone img");
  const simulateurContent2Text1 = document.querySelector(".simulateur_content_2_text1");

  const simulateurContent1Top = simulateurContent1.getBoundingClientRect().top;
  const simulateurContent2Top = simulateurContent2.getBoundingClientRect().top;

  if (scrollTop > scrollTop + simulateurContent1Top - clientHeight * 0.8) {
    simulateurContent1.classList.add("anim-y-both");
    simulateurIphone.classList.add("anim-iphone-simulateur");
  }
  if (scrollTop > scrollTop + simulateurContent2Top - clientHeight * 0.8) {
    simulateurContent2.classList.add("anim-y-both");
    simulateurContent2Text1.classList.add("anim-y-both");
  }

});