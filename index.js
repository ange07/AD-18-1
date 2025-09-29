const itemsContainer = document.querySelector("#list-items")

function addItem(item) {
  const colourCard = document.createElement("section")
  colourCard.className = "card w-75"
  itemsContainer.append(colourCard)

  const colourCardBody = document.createElement("article")
  colourCardBody.className = "card-body"
  colourCard.append(colourCardBody)

  const colourCardTitle = document.createElement("h5")
  colourCardTitle.className = "card-title"
  colourCardTitle.innerText = item.name
  colourCardBody.append(colourCardTitle)

  const colourCardText = document.createElement("p")
  colourCardText.className = "card-text"
  colourCardText.innerText = item.pantone_value
  colourCardBody.append(colourCardText)

  const colourCardColour = document.createElement("figure")
  colourCardColour.style = "background-color: " + item.color + ";"
  colourCardColour.innerText = item.color
  colourCardBody.append(colourCardColour)

  const colourCardBreak = document.createElement("br")
  itemsContainer.append(colourCardBreak)
}

// Tarea 1, 2 y 3. Traer datos de la API y guardarlos
async function fetchColorsList() {
    console.log('Solicitando colores a la API');
  try {
    const response = await fetch('https://reqres.in/api/unknown');
    const data = await response.json();
    console.log('Datos recibidos:', data);
    
    const colors = data.data;
    colors.forEach(color => addItem(color));
    localStorage.setItem('colorsList', JSON.stringify(colors));
    console.log('Colores guardados en localStorage');
    
  } catch (error) {
    console.error('Error al cargar colores:', error);
  }
}
// Tarea 4. Cargar desde localStorage
function loadColorsFromStorage() {
  console.log('📂 Buscando colores en localStorage...');
  
  const storedColors = localStorage.getItem('colorsList');
  
  if (storedColors) {
    const colors = JSON.parse(storedColors);
    console.log('Encontrados', colors.length, 'colores en localStorage');
    
    colors.forEach(color => {
      addItem(color);
    });
  } else {
    console.log('No hay colores guardados. Descargando desde API.');
    fetchColorsList();
  }
}

// Tarea 5. Borrar todo
function clearColors() {
  itemsContainer.innerHTML = '';
  localStorage.removeItem('colorsList');
  console.log('Todos los colores borrados');
}

// Tarea 6. Recargar colores
function reloadColors() {
  itemsContainer.innerHTML = '';
  fetchColorsList();
  console.log('Recargando colores desde la API');
}

// Conectar botones cargar colores y borrar todo
document.addEventListener('DOMContentLoaded', function() {
  const btnClear = document.getElementById('btn-clear');
  const btnLoad = document.getElementById('btn-load');
  
  if (btnClear) {
    btnClear.addEventListener('click', clearColors);
  }
  
  if (btnLoad) {
    btnLoad.addEventListener('click', reloadColors);
  }
});

// Inicializar se carga desde localStorage o API
loadColorsFromStorage()