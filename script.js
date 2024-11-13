const products = [
  { name: "Продукт 1", price: 100 },
  { name: "Продукт 2", price: 200 },
  { name: "Продукт 3", price: 300 },
  { name: "Продукт 4", price: 400 },
  { name: "Продукт 5", price: 500 },
];

function displayProducts() {
  const tableBody = document.getElementById('productTableBody');
  tableBody.innerHTML = ""; // Очищаем таблицу перед добавлением новых данных

  products.forEach(product => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const priceCell = document.createElement('td');

    nameCell.textContent = product.name;
    priceCell.textContent = product.price;

    row.appendChild(nameCell);
    row.appendChild(priceCell);
    tableBody.appendChild(row);
  });
}

// Вызов функции для отображения продуктов при загрузке страницы
window.onload = displayProducts;



document.querySelector('button').addEventListener('click', function() {
  const box = document.querySelector('.animated-box');
  box.style.transition = "transform 1s";
  box.style.transform = "translateX(100px)";
});

document.getElementById('animatedButton').addEventListener('click', function() {
  const button = this;

  // Анимация перемещения
  button.style.transition = "transform 0.5s ease";
  button.style.transform = "translateX(100px)"; // Перемещение кнопки вправо

  // Возвращение кнопки на место через 0.5 секунды
  setTimeout(function() {
    button.style.transform = "translateX(0)"; // Возврат на место
  }, 500);
});

const dropArea = document.getElementById('drop-area');
const downloadButton = document.getElementById('downloadButton');
let uploadedFile;

// Предотвращаем стандартное поведение при перетаскивании
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

// Добавляем классы для визуальной индикации
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

// Обработка события drop
dropArea.addEventListener('drop', handleDrop, false);

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight() {
  dropArea.classList.add('hover');
}

function unhighlight() {
  dropArea.classList.remove('hover');
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
  if (files.length > 0) {
    uploadedFile = files[0];
    downloadButton.style.display = 'block'; // Показываем кнопку для скачивания
  }
}

// Обработка нажатия кнопки для скачивания файла
downloadButton.addEventListener('click', () => {
  const url = URL.createObjectURL(uploadedFile);
  const a = document.createElement('a');
  a.href = url;
  a.download = uploadedFile.name; // Название файла при скачивании
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // Освобождаем память
});
