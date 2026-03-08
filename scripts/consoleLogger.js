// consoleLogger.js
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('formValid', function (event) {
    const formData = event.detail || {};
    console.clear();
    console.log('Имя:', formData.fullname || '(не заполнено)');
    console.log('Email:', formData.email || '(не заполнено)');
    console.log('Тема:', formData.topic || '(не заполнено)');
    console.log('Сообщение:', formData.message || '(не заполнено)');
    console.log('Согласие:', formData.agreement ? 'Да' : 'Нет');
    const timestamp = new Date().toLocaleString('ru-RU');
    console.log('Время отправки:', timestamp);
  });
});
