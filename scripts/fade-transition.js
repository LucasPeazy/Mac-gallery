document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 50);

  document.querySelectorAll("a").forEach(link => {
    // Пропускаем внешние ссылки, якоря и ссылки Fancybox
    const href = link.getAttribute("href");
    if (!href
        || (href.startsWith("http") && !href.startsWith(window.location.origin))
        || href.startsWith("#")
        || link.hasAttribute("data-fancybox")  // <- добавили исключение для fancybox
    ) {
      return;
    }

    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetUrl = link.href;
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 600);
    });
  });
});


const addBtn = document.querySelector(".add_button_sticky");
const addButtonWrapper = document.querySelector(".add_photo_popup_wrapper");
const addButtonOverlay = document.querySelector(".add_photo_popup_overlay");
const addButtonContainer = document.querySelector(".add_photo_container");

// Функция открытия попапа
function openPopUp() {
  addButtonWrapper.style.visibility = "visible";

  setTimeout(() => {
    addButtonWrapper.style.opacity = "1";
    addButtonOverlay.style.opacity = "0.7";
    addButtonContainer.style.opacity = "1";
  }, 10);
}

// Функция закрытия попапа
function closePopUp() {
  addButtonWrapper.style.opacity = "0";
  addButtonOverlay.style.opacity = "0";
  addButtonContainer.style.opacity = "0";

  setTimeout(() => {
    addButtonWrapper.style.visibility = "hidden";
  }, 300); // совпадает с CSS transition duration
}

// Открываем попап по клику на кнопку
addBtn.addEventListener('click', openPopUp);

// Закрываем попап по клику на оверлей
addButtonOverlay.addEventListener('click', closePopUp);

const previewContainer = document.getElementById('preview-container');
const fileInput = document.getElementById('photos');

const people = ['dima', 'vanya', 'yarik', 'renata', 'maxim'];
const peopleNames = {
  dima: 'Дима',
  vanya: 'Ваня',
  yarik: 'Ярик',
  renata: 'Рената',
  maxim: 'Максим'
};

function createPreview(src, index) {
  const wrapper = document.createElement('div');
  wrapper.className = 'preview-wrapper';

  const img = document.createElement('img');
  img.src = src;
  wrapper.appendChild(img);

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.setAttribute('aria-label', 'Удалить фото');
  removeBtn.innerHTML = '&times;';
  removeBtn.onclick = () => wrapper.remove();
  wrapper.appendChild(removeBtn);

  const tagsWrapper = document.createElement('div');
  tagsWrapper.className = 'tags-wrapper';

  people.forEach(person => {
    const label = document.createElement('label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = `tag-photo-${index}[]`; // массив значений
    checkbox.value = person;

    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = peopleNames[person];

    label.appendChild(checkbox);
    label.appendChild(span);
    tagsWrapper.appendChild(label);
  });

  wrapper.appendChild(tagsWrapper);

  return wrapper;
}

fileInput.addEventListener('change', () => {
  previewContainer.innerHTML = ''; // очистить превью перед новым показом

  [...fileInput.files].forEach((file, index) => {
    const reader = new FileReader();

    reader.onload = e => {
      const preview = createPreview(e.target.result, index + 1);
      previewContainer.appendChild(preview);
    };

    reader.readAsDataURL(file);
  });
});

const form = document.getElementById('photo-upload-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const previews = previewContainer.querySelectorAll('.preview-wrapper');

  let valid = true;
  previews.forEach(preview => {
    const checkedBoxes = preview.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedBoxes.length === 0) {
      valid = false;
      preview.style.border = '2px solid red';
    } else {
      preview.style.border = '';
    }
  });

  if (!valid) {
    alert('Для каждой фотографии выберите хотя бы одного человека!');
    return;
  }

  // Здесь можно продолжать отправку или другую логику
  alert('Форма готова к отправке!');

  // form.submit(); // если нужно реально отправлять форму
});
