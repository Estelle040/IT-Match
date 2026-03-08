// validation.js
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const topic = document.getElementById('topic');
  const message = document.getElementById('message');
  const agreement = document.getElementById('agreement');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    clearErrors();

    let isValid = true;

    const fullnameValue = fullname.value.trim();
    const fullnameWords = fullnameValue.split(/\s+/).filter(Boolean);
    if (fullnameValue === '' || fullnameWords.length < 2) {
      showError(fullname, 'Введите имя и фамилию');
      isValid = false;
    }

    const emailValue = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '') {
      showError(email, 'Введите email');
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      showError(email, 'Введите корректный email');
      isValid = false;
    }

    const topicValue = topic.value.trim();
    if (topicValue === '') {
      showSelectError(topic, 'Выберите тему обращения');
      isValid = false;
    }

    const messageValue = message.value.trim();
    if (messageValue === '') {
      showError(message, 'Введите сообщение');
      isValid = false;
    } else if (messageValue.length > 500) {
      showError(message, 'Сообщение не должно превышать 500 символов');
      isValid = false;
    }

    if (!agreement.checked) {
      showCheckboxError(agreement, 'Подтвердите согласие на обработку данных');
      isValid = false;
    }

    if (isValid) {
      const formData = {
        fullname: fullnameValue,
        email: emailValue,
        topic: topicValue,
        message: messageValue,
        agreement: agreement.checked,
      };

      const validEvent = new CustomEvent('formValid', { detail: formData });
      document.dispatchEvent(validEvent);

      alert('Форма отправлена! Данные в консоли.');
    }
  });

  [fullname, email, message].forEach((input) => {
    input.addEventListener('input', function () {
      clearFieldError(this);
    });
  });

  topic.addEventListener('change', function () {
    clearSelectError(this);
  });

  agreement.addEventListener('change', function () {
    clearCheckboxError(this);
  });

  function clearErrors() {
    document.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach((el) => {
      el.classList.remove('is-danger');
    });
    document.querySelectorAll('.select.is-danger').forEach((el) => {
      el.classList.remove('is-danger');
    });
    document.querySelectorAll('.help.is-danger').forEach((el) => el.remove());
    document.querySelectorAll('.checkbox.has-text-danger').forEach((el) => {
      el.classList.remove('has-text-danger');
    });
  }

  function clearFieldError(input) {
    input.classList.remove('is-danger');
    const field = input.closest('.field');
    if (!field) return;
    field.querySelectorAll('.help.is-danger').forEach((el) => el.remove());
  }

  function clearSelectError(selectEl) {
    const selectWrapper = selectEl.closest('.select');
    if (selectWrapper) selectWrapper.classList.remove('is-danger');
    const field = selectEl.closest('.field');
    if (!field) return;
    field.querySelectorAll('.help.is-danger').forEach((el) => el.remove());
  }

  function clearCheckboxError(checkboxEl) {
    const label = checkboxEl.closest('.checkbox');
    if (label) label.classList.remove('has-text-danger');
    const field = checkboxEl.closest('.field');
    if (!field) return;
    field.querySelectorAll('.help.is-danger').forEach((el) => el.remove());
  }

  function showError(input, messageText) {
    input.classList.add('is-danger');
    const field = input.closest('.field');
    if (!field) return;
    const help = document.createElement('p');
    help.classList.add('help', 'is-danger');
    help.textContent = messageText;
    field.appendChild(help);
  }

  function showSelectError(selectEl, messageText) {
    const selectWrapper = selectEl.closest('.select');
    if (selectWrapper) selectWrapper.classList.add('is-danger');
    const field = selectEl.closest('.field');
    if (!field) return;
    const help = document.createElement('p');
    help.classList.add('help', 'is-danger');
    help.textContent = messageText;
    field.appendChild(help);
  }

  function showCheckboxError(checkboxEl, messageText) {
    const label = checkboxEl.closest('.checkbox');
    if (label) label.classList.add('has-text-danger');
    const field = checkboxEl.closest('.field');
    if (!field) return;
    const help = document.createElement('p');
    help.classList.add('help', 'is-danger');
    help.textContent = messageText;
    field.appendChild(help);
  }
});
