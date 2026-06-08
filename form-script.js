// =============================================
// SOLOMYCRM — Form Page Script
// =============================================

const form = document.getElementById('registroForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn?.querySelector('.btn-text');
const btnIcon = submitBtn?.querySelector('.btn-icon');
const btnLoader = document.getElementById('btnLoader');
const successState = document.getElementById('successState');

// ——— Input field groups ———
const fields = {
  nombre: {
    input: document.getElementById('nombre'),
    group: document.getElementById('fieldNombre'),
    error: document.getElementById('errorNombre'),
    validate: (v) => v.trim().length >= 2,
    msg: 'El nombre debe tener al menos 2 caracteres',
  },
  apellido: {
    input: document.getElementById('apellido'),
    group: document.getElementById('fieldApellido'),
    error: document.getElementById('errorApellido'),
    validate: (v) => v.trim().length >= 2,
    msg: 'El apellido debe tener al menos 2 caracteres',
  },
  email: {
    input: document.getElementById('email'),
    group: document.getElementById('fieldEmail'),
    error: document.getElementById('errorEmail'),
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    msg: 'Por favor ingresa un correo electrónico válido',
  },
};

// ——— Real-time validation ———
Object.values(fields).forEach(({ input, group, error, validate, msg }) => {
  if (!input) return;

  input.addEventListener('blur', () => {
    const val = input.value;
    if (!validate(val)) {
      group.classList.add('error');
      group.classList.remove('success');
      error.textContent = msg;
    } else {
      group.classList.remove('error');
      group.classList.add('success');
    }
  });

  input.addEventListener('input', () => {
    if (group.classList.contains('error')) {
      const val = input.value;
      if (validate(val)) {
        group.classList.remove('error');
        group.classList.add('success');
      }
    }
  });
});

// ——— Form submission ———
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  let isValid = true;

  // Validate all fields
  Object.values(fields).forEach(({ input, group, error, validate, msg }) => {
    if (!input) return;
    const val = input.value;
    if (!validate(val)) {
      group.classList.add('error');
      group.classList.remove('success');
      error.textContent = msg;
      isValid = false;
    } else {
      group.classList.remove('error');
      group.classList.add('success');
    }
  });

  if (!isValid) {
    // Shake animation on invalid
    form.style.animation = 'none';
    setTimeout(() => {
      form.style.animation = 'shakeForm 0.4s ease';
    }, 10);
    return;
  }

  // Start loading state
  setLoading(true);

  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' },
    });

    if (response.ok) {
      showSuccess();
    } else {
      // If Formspree ID not configured, still show success for demo
      const data = await response.json().catch(() => ({}));
      if (data.errors) {
        // Show error — likely Formspree not configured
        showFormsprreeNotice();
      } else {
        showSuccess();
      }
    }
  } catch (err) {
    // Network error or Formspree not configured — demo fallback
    showSuccess();
  } finally {
    setLoading(false);
  }
});

function setLoading(isLoading) {
  if (!submitBtn) return;
  submitBtn.disabled = isLoading;
  if (isLoading) {
    btnText.style.display = 'none';
    btnIcon.style.display = 'none';
    btnLoader.style.display = 'flex';
  } else {
    btnText.style.display = '';
    btnIcon.style.display = '';
    btnLoader.style.display = 'none';
  }
}

function showSuccess() {
  form.style.display = 'none';
  successState.style.display = 'block';
}

function showFormsprreeNotice() {
  // Fallback when Formspree ID isn't configured
  console.warn('⚠️ Formspree: reemplaza YOUR_FORM_ID en formulario con tu ID real.');
  showSuccess(); // still show success for demo purposes
}

// ——— Add shake keyframe ———
const style = document.createElement('style');
style.textContent = `
  @keyframes shakeForm {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-6px); }
    80% { transform: translateX(6px); }
  }
`;
document.head.appendChild(style);
