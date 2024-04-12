document.addEventListener("DOMContentLoaded", function () {
  const form = document.forms["myForm"];
  const nameInput = form.elements["myName"];
  const emailInput = form.elements["myMail"];
  const ageInput = form.elements["myAge"];
  const genderInputs = form.elements["gender"];
  const jobSelect = form.elements["myJob"];
  const passwordInput = form.elements["myPassword"];
  const agreementCheckbox = form.elements["myCheckbox"];
  const submitBtn = document.getElementById("submitBtn");

  // Функция для проверки имени
  function validateName() {
    const nameValue = nameInput.value.trim();
    const nameRegex = /^[a-zA-Z\s]{2,20}$/;
    if (!nameValue.match(nameRegex)) {
      document.getElementById("checkName").textContent =
        "Имя должно содержать только латинские буквы и пробелы, длиной от 2 до 20 символов";
      return false;
    } else {
      document.getElementById("checkName").textContent = "";
      return true;
    }
  }

  // Функция для проверки электронной почты
  function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue.match(emailRegex)) {
      document.getElementById("checkEmail").textContent =
        "Введите корректный адрес электронной почты";
      return false;
    } else {
      document.getElementById("checkEmail").textContent = "";
      return true;
    }
  }

  // Функция для проверки возраста
  function validateAge() {
    const ageValue = ageInput.value.trim();
    if (ageValue === "" || isNaN(ageValue)) {
      document.getElementById("checkAge").textContent =
        "Введите корректный возраст";
      return false;
    } else {
      document.getElementById("checkAge").textContent = "";
      return true;
    }
  }

  // Функция для проверки выбора пола
  function validateGender() {
    for (const genderInput of genderInputs) {
      if (genderInput.checked) {
        document.getElementById("checkGender").textContent = "";
        return true;
      }
    }
    document.getElementById("checkGender").textContent = "Выберите ваш пол";
    return false;
  }

  // Функция для проверки выбора профессии
  function validateJob() {
    if (jobSelect.value === "0") {
      document.getElementById("checkJob").textContent =
        "Выберите вашу профессию";
      return false;
    } else {
      document.getElementById("checkJob").textContent = "";
      return true;
    }
  }

  // Функция для проверки пароля
  function validatePassword() {
    const passwordValue = passwordInput.value.trim();
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordValue.match(passwordRegex)) {
      document.getElementById("checkPassword").textContent =
        "Пароль должен содержать не менее 6 символов, как минимум одну заглавную букву, одну строчную букву и одну цифру";
      return false;
    } else {
      document.getElementById("checkPassword").textContent = "";
      return true;
    }
  }

  // Функция для проверки согласия с обработкой данных
  function validateAgreement() {
    if (!agreementCheckbox.checked) {
      document.getElementById("checkAgreement").textContent =
        "Необходимо согласие с обработкой данных";
      return false;
    } else {
      document.getElementById("checkAgreement").textContent = "";
      return true;
    }
  }
  // Вывод в консоль полученной информации
  function printRecievedInfo() {
    console.log(`Ваше имя: ${nameInput.value}`);
    console.log(`Ваш email: ${emailInput.value}`);
    console.log(`Ваше возраст: ${ageInput.value}`);
    console.log(`Ваш пол: ${genderInputs.value}`);
    console.log(
      `Ваша профессия: ${jobSelect.options[jobSelect.selectedIndex].text}`
    );
    console.log(`Ваш пароль: ${passwordInput.value}`);
  }

  // событие focus - blur
  const focuses = document.querySelectorAll(".focus");
  for (let focus of focuses) {
    focus.addEventListener("focus", function () {
      focus.placeholder = "";
    });
    focus.addEventListener("blur", function () {
      switch (focus.name) {
        case "myName":
          return (focus.placeholder = "Введите имя");
        case "myMail":
          return (focus.placeholder = "Введите электронную почту");
        case "myAge":
          return (focus.placeholder = "Введите ваш возраст");
        default:
          return (focus.placeholder = "Введите пароль");
      }
    });
  }

  // Функция для включения/выключения кнопки отправки формы
  function toggleSubmitButton() {
    if (
      validateName() &&
      validateEmail() &&
      validateAge() &&
      validateGender() &&
      validateJob() &&
      validatePassword() &&
      validateAgreement()
    ) {
      submitBtn.removeAttribute("disabled");
      printRecievedInfo();
    } else {
      submitBtn.setAttribute("disabled", true);
    }
  }

  // Слушатели событий для полей формы
  nameInput.addEventListener("input", toggleSubmitButton);
  emailInput.addEventListener("input", toggleSubmitButton);
  ageInput.addEventListener("input", toggleSubmitButton);
  for (const genderInput of genderInputs) {
    genderInput.addEventListener("change", toggleSubmitButton);
  }
  jobSelect.addEventListener("change", toggleSubmitButton);
  passwordInput.addEventListener("input", toggleSubmitButton);
  agreementCheckbox.addEventListener("change", toggleSubmitButton);
});
