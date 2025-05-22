const fieldConfig = {
  name: {
    id: 'name',
    errorId: 'name-error',
    pattern: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
    errors: {
      empty: 'поле обязательно для заполнения',
      invalid: 'Имя должно содержать только буквы'
    }
  },
  surname: {
    id: 'surname',
    errorId: 'surname-error',
    pattern: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
    errors: {
      empty: 'поле обязательно для заполнения',
      invalid: 'фамилия должна содержать только буквы'
    }
  },
  email: {
    id: 'mail',
    errorId: 'email-error',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errors: {
      empty: 'поле обязательно для заполнения',
      invalid: 'введите корректный email'
    }
  },
  gender: {
    name: 'gender',
    errorId: 'gender-error'
  },
  age: {
    id: 'age',
    errorId: 'age-error',
    pattern: /^(1[89]|[2-9]\d)$/,
    errors: {
      empty: 'укажите возраст',
      invalid: 'возраст должен быть от 18 до 99 лет'
    }
  },
  question: {
    id: 'question',
    errorId: 'question-error',
    pattern: /^[a-zA-Zа-яА-ЯёЁ0-9\s\.,!?\-\"\']+$/,
    errors: {
      empty: 'поле обязательно для заполнения',
      invalid: 'вопрос содержит недопустимые символы'
    }
  }
};

function initForm() {
  const formFields = document.getElementById('form-fields');
  const ageField = document.getElementById('age-field');

  ageField.style.display = 'none';
  formFields.style.display = 'none';

  document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener('change', function() {
      const isMale = document.querySelector('input[name="gender"]:checked')?.value === 'male';

      if (isMale) {
        formFields.style.display = 'block';
        ageField.style.display = 'block';
      } else {
        formFields.style.display = 'none';
        ageField.style.display = 'none';
      }

      clearError(document.getElementById('gender-error'));
      clearError(document.getElementById('age-error'));
    });
  });

  Object.values(fieldConfig).forEach(config => {
    const field = config.id ? document.getElementById(config.id) : null;
    if (field) {
      field.addEventListener('input', () => validateField(config.id || config.name));
      field.addEventListener('paste', () => setTimeout(() => validateField(config.id || config.name), 0));
    }
  });
}

function validateField(fieldId) {
  const config = Object.values(fieldConfig).find(c => c.id === fieldId || c.name === fieldId);
  if (!config) return true;

  if (fieldId === 'gender') {
    const checkedRadio = document.querySelector('input[name="gender"]:checked');
    const errorElement = document.getElementById(config.errorId);
    if (!checkedRadio) {
      showError(errorElement, 'укажите пол');
      return false;
    }
    clearError(errorElement);
    return true;
  }

  if (fieldId === 'age') {
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    if (gender !== 'male') return true;

    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(config.errorId);
    const value = field.value.trim();

    if (!value) {
      showError(errorElement, config.errors.empty);
      return false;
    }

    if (!config.pattern.test(value)) {
      showError(errorElement, config.errors.invalid);
      return false;
    }

    clearError(errorElement);
    return true;
  }

  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(config.errorId);
  const value = field.value.trim();

  if (!value) {
    showError(errorElement, config.errors.empty);
    return false;
  }

  if (config.pattern && !config.pattern.test(value)) {
    showError(errorElement, config.errors.invalid);
    return false;
  }

  clearError(errorElement);
  return true;
}

document.getElementById('application-form').addEventListener('submit', async e => {
  e.preventDefault();
  const submitBtn = document.getElementById('submit-btn');

  if (!validateForm()) return;

  submitBtn.disabled = true;
  submitBtn.classList.add('sending');

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await fetch(e.target.action, {
      method: 'POST',
      body: new FormData(e.target)
    });
    showSuccess(e.target, submitBtn);
  } catch {
    showSuccess(e.target, submitBtn);
  }
});

function validateForm() {
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const fieldsToValidate = gender === 'male'
    ? Object.values(fieldConfig)
    : Object.values(fieldConfig).filter(f => f.id !== 'age');

  return fieldsToValidate.every(config =>
    validateField(config.id || config.name)
  );
}

function showError(element, message) {
  if (element) {
    element.textContent = message;
    element.style.display = 'block';
  }
}

function clearError(element) {
  if (element) {
    element.textContent = '';
    element.style.display = 'none';
  }
}

function showSuccess(form, submitBtn) {
  submitBtn.classList.replace('sending', 'success');
  setTimeout(() => {
    form.reset();
    document.getElementById('age-field').style.display = 'none';
    document.getElementById('form-fields').style.display = 'none';
    submitBtn.classList.remove('success');
    submitBtn.disabled = false;
  }, 2000);
}

document.addEventListener('DOMContentLoaded', initForm);