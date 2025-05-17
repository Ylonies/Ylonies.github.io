 document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('submit-btn');

        clearErrors();

        const isValid = validateForm();

        if (isValid) {
            submitBtn.disabled = true;
            submitBtn.classList.add('sending');

            const formData = new FormData(this);

            setTimeout(() => {
                fetch(this.action, {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (response.ok) {
                        // Успешная отправка
                        submitBtn.classList.remove('sending');
                        submitBtn.classList.add('success');

                        setTimeout(() => {
                            this.reset();
                            submitBtn.classList.remove('success');
                            submitBtn.disabled = false;
                        }, 2000);
                    } else {
                        throw new Error('Ошибка отправки формы');
                    }
                })
                .catch(error => {
                    submitBtn.classList.remove('sending');
                    submitBtn.disabled = false;
                    alert('Произошла ошибка при отправке: ' + error.message);
                });
            }, 2000);
        }
    });

function validateForm() {
    let isValid = true;

    // Валидация имени
    const name = document.getElementById('name').value;
    if (!name) {
        showError('name-error', 'поле обязательно для заполнения');
        isValid = false;
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name)) {
        showError('name-error', 'Имя должно содержать только буквы');
        isValid = false;
    }

    // Валидация фамилии
    const surname = document.getElementById('surname').value;
    if (!surname) {
        showError('surname-error', 'поле обязательно для заполнения');
        isValid = false;
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(surname)) {
        showError('surname-error', 'фамилия должна содержать только буквы');
        isValid = false;
    }

    // Валидация email
    const email = document.getElementById('mail').value;
    if (!email) {
        showError('email-error', 'поле обязательно для заполнения');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('email-error', 'введите корректный email');
        isValid = false;
    }

    // Валидация вопроса
    const question = document.getElementById('question').value;
    if (!question) {
        showError('question-error', 'поле обязательно для заполнения');
        isValid = false;
    } else if (!/^[a-zA-Zа-яА-ЯёЁ0-9\s\.,!?\-\"\']+$/.test(question)) {
        showError('question-error', 'вопрос содержит недопустимые символы');
        isValid = false;
    }

    return isValid;
}

    function showError(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }