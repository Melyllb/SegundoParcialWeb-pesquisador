const PUNTOS_SINTOMAS = {
  fiebre: 2,
  dolor_de_cabeza: 1,
  dolor_muscular: 1,
  dolor_articular: 2,
  sarpullido: 3,
};

const RANGOS_VALIDACION = {
  consultorio: { min: 1, max: 100 },
  edad: { min: 1, max: 120 },
  temperatura: { min: 30, max: 45 },
  carnetLength: 11,
};

const pacientes = [];

let elementos = {};

document.addEventListener("DOMContentLoaded", function () {
  inicializarElementos();
  configurarEventListeners();
  inicializarEstadoFormulario();
  window.scrollTo(0, 0);
});

function inicializarElementos() {
  elementos = {
    registrarSintomaBtns: document.querySelectorAll(".btn-primario"),
    btnVolverForm: document.getElementById("btn-volver-form"),
    btnEnviarForm: document.getElementById("btn-enviar-form"),
    btnCalcularRiesgo: document.getElementById("btn-calcular-riesgo"),

    seccionDestacada: document.getElementById("seccion-destacada"),
    seccionFormulario: document.getElementById("seccion-formulario"),
    seccionArbovirosis: document.getElementById("info-arbovirus"),

    formulario: document.getElementById("formulario-sintomas"),

    nombreInput: document.getElementById("nombre-paciente"),
    apellidosInput: document.getElementById("apellidos-paciente"),
    carnetInput: document.getElementById("carnet"),
    consultorioInput: document.getElementById("consultorio"),
    edadInput: document.getElementById("edad"),
    municipioSelect: document.getElementById("municipio"),
    diasInput: document.getElementById("dias"),

    fiebreCheckbox: document.getElementById("sintoma-fiebre"),
    checkboxGroup: document.querySelector(".checkbox-group"),

    resultadoRiesgo: document.getElementById("resultado-riesgo"),
  };
}

function configurarEventListeners() {
  if (elementos.registrarSintomaBtns && elementos.registrarSintomaBtns.length) {
    elementos.registrarSintomaBtns.forEach((btn) => {
      btn.addEventListener("click", mostrarFormulario);
    });
  }

  if (elementos.btnVolverForm) {
    elementos.btnVolverForm.addEventListener("click", mostrarInfoArbovirosis);
  }

  if (elementos.formulario) {
    elementos.formulario.addEventListener("submit", validarFormulario);
  }

  if (elementos.btnCalcularRiesgo) {
    elementos.btnCalcularRiesgo.addEventListener("click", calcularRiesgo);
  }

  if (elementos.fiebreCheckbox) {
    elementos.fiebreCheckbox.addEventListener("change", campoTemperatura);
  }

  configurarValidacionTiempoReal();
}

function inicializarEstadoFormulario() {
  if (elementos.fiebreCheckbox) {
    campoTemperatura();
  }
}

function mostrarFormulario() {
  elementos.seccionFormulario.style.display = "block";
  elementos.seccionArbovirosis.style.display = "none";
  elementos.seccionDestacada.style.display = "none";
  window.scrollTo(0, 0);
}

function mostrarInfoArbovirosis() {
  elementos.seccionFormulario.style.display = "none";
  elementos.seccionArbovirosis.style.display = "block";
  elementos.seccionDestacada.style.display = "";
  window.scrollTo(0, 0);
}

function validarFormulario(evento) {
  evento.preventDefault();
  limpiarMensajesError();

  let formularioValido = true;

  formularioValido = validarNombre() && formularioValido;
  formularioValido = validarApellidos() && formularioValido;
  formularioValido = validarCarnet() && formularioValido;
  formularioValido = validarConsultorio() && formularioValido;
  formularioValido = validarEdad() && formularioValido;
  formularioValido = validarSintomas() && formularioValido;
  formularioValido = validarTemperatura() && formularioValido;

  if (formularioValido) {
    guardarPaciente();
  }
}

function validarNombre() {
  const valor = elementos.nombreInput.value.trim();

  if (valor === "") {
    mostrarError(elementos.nombreInput, "El nombre es obligatorio.");
    return false;
  }

  return true;
}

function validarApellidos() {
  const valor = elementos.apellidosInput.value.trim();

  if (valor === "") {
    mostrarError(elementos.apellidosInput, "Los apellidos son obligatorios.");
    return false;
  }

  return true;
}

function validarCarnet() {
  const valor = elementos.carnetInput.value.trim();

  if (valor === "") {
    mostrarError(
      elementos.carnetInput,
      "El carnet de identidad es obligatorio."
    );
    return false;
  }

  if (valor.length !== RANGOS_VALIDACION.carnetLength) {
    mostrarError(
      elementos.carnetInput,
      "El carné debe tener exactamente 11 dígitos."
    );
    return false;
  }

  return true;
}

function validarConsultorio() {
  const valor = parseInt(elementos.consultorioInput.value);
  const { min, max } = RANGOS_VALIDACION.consultorio;

  if (isNaN(valor)) {
    mostrarError(
      elementos.consultorioInput,
      "El número de consultorio es obligatorio."
    );
    return false;
  }

  if (valor < min || valor > max) {
    mostrarError(
      elementos.consultorioInput,
      `El número de consultorio debe estar entre ${min} y ${max}.`
    );
    return false;
  }

  return true;
}

function validarEdad() {
  const valor = parseInt(elementos.edadInput.value);
  const { min, max } = RANGOS_VALIDACION.edad;

  if (isNaN(valor)) {
    mostrarError(elementos.edadInput, "La edad es obligatoria.");
    return false;
  }

  if (valor < min || valor > max) {
    mostrarError(
      elementos.edadInput,
      `La edad debe estar entre ${min} y ${max} años.`
    );
    return false;
  }

  return true;
}

function validarSintomas() {
  const sintomasSeleccionados = obtenerSintomasSeleccionados();

  if (sintomasSeleccionados.length === 0) {
    mostrarError(
      elementos.checkboxGroup,
      "Debe seleccionar al menos un síntoma."
    );
    return false;
  }

  return true;
}

function validarTemperatura() {
  if (!elementos.fiebreCheckbox.checked) {
    return true;
  }

  const tempInput = document.getElementById("temperatura");

  if (!tempInput) {
    return true;
  }

  const valor = parseFloat(tempInput.value);
  const { min, max } = RANGOS_VALIDACION.temperatura;

  if (isNaN(valor) || tempInput.value.trim() === "") {
    mostrarError(
      tempInput,
      "La temperatura es obligatoria cuando selecciona fiebre."
    );
    return false;
  }

  if (valor < min || valor > max) {
    mostrarError(
      tempInput,
      `La temperatura debe estar entre ${min}°C y ${max}°C.`
    );
    return false;
  }

  return true;
}

function mostrarError(elemento, mensaje) {
  elemento.classList.add("input-error");

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = mensaje;
  elemento.parentElement.appendChild(errorDiv);
}

function limpiarMensajesError() {
  const camposConError = elementos.formulario.querySelectorAll(".input-error");
  camposConError.forEach((campo) => {
    campo.classList.remove("input-error");
  });

  const mensajesError = elementos.formulario.querySelectorAll(".error-message");
  mensajesError.forEach((mensaje) => {
    mensaje.remove();
  });
}

function configurarValidacionTiempoReal() {
  if (elementos.carnetInput) {
    elementos.carnetInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^\d]/g, "");
    });
  }

  if (elementos.consultorioInput) {
    elementos.consultorioInput.addEventListener("input", function () {
      const valor = parseInt(this.value);
      const { min, max } = RANGOS_VALIDACION.consultorio;

      if (valor < min) this.value = min;
      if (valor > max) this.value = max;
    });
  }

  if (elementos.edadInput) {
    elementos.edadInput.addEventListener("input", function () {
      const valor = parseInt(this.value);
      const { min, max } = RANGOS_VALIDACION.edad;

      if (valor < min) this.value = min;
      if (valor > max) this.value = max;
    });
  }
}

function calcularRiesgo() {
  const sintomasSeleccionados = obtenerSintomasSeleccionados();

  if (sintomasSeleccionados.length === 0) {
    elementos.resultadoRiesgo.textContent = "No se han seleccionado síntomas.";
    elementos.resultadoRiesgo.classList.remove("riesgo-alto", "riesgo-bajo");
    return;
  }

  const totalPuntos = sintomasSeleccionados.reduce((total, checkbox) => {
    return total + (PUNTOS_SINTOMAS[checkbox.value] || 0);
  }, 0);

  if (totalPuntos >= 5) {
    elementos.resultadoRiesgo.textContent =
      "Alto riesgo – Acuda a su consultorio";
    elementos.resultadoRiesgo.classList.remove("riesgo-bajo");
    elementos.resultadoRiesgo.classList.add("riesgo-alto");
  } else {
    elementos.resultadoRiesgo.textContent =
      "Bajo riesgo – Monitorice sus síntomas";
    elementos.resultadoRiesgo.classList.remove("riesgo-alto");
    elementos.resultadoRiesgo.classList.add("riesgo-bajo");
  }
}

function obtenerSintomasSeleccionados() {
  return Array.from(
    elementos.checkboxGroup.querySelectorAll('input[type="checkbox"]:checked')
  );
}

function campoTemperatura() {
  const campoExistente = document.getElementById("campo-temperatura");

  if (elementos.fiebreCheckbox.checked) {
    if (!campoExistente) {
      crearCampoTemperatura();
    }
  } else {
    if (campoExistente) {
      campoExistente.remove();
    }
  }
}

function crearCampoTemperatura() {
  const sintomasCampo = elementos.checkboxGroup.closest(".campo-formulario");

  if (!sintomasCampo) return;

  const tempDiv = document.createElement("div");
  tempDiv.className = "campo-formulario";
  tempDiv.id = "campo-temperatura";
  tempDiv.innerHTML = `
    <label for="temperatura">Temperatura (°C):</label>
    <input type="number" id="temperatura" step="0.1" min="30" max="45">
  `;

  sintomasCampo.parentNode.insertBefore(tempDiv, sintomasCampo.nextSibling);
}

function guardarPaciente() {
  const sintomasSeleccionados = obtenerSintomasSeleccionados();
  const viajeSeleccionado = document.querySelector(
    'input[name="viaje"]:checked'
  );

  const nuevoPaciente = {
    nombre: elementos.nombreInput.value.trim(),
    apellidos: elementos.apellidosInput.value.trim(),
    carnet: elementos.carnetInput.value.trim(),
    consultorio: parseInt(elementos.consultorioInput.value),
    edad: parseInt(elementos.edadInput.value),
    municipio: elementos.municipioSelect.value,
    sintomas: sintomasSeleccionados.map((checkbox) => checkbox.value),
    dias: parseInt(elementos.diasInput.value) || 0,
    viaje: viajeSeleccionado ? viajeSeleccionado.value : "no",
  };

  const tempInput = document.getElementById("temperatura");
  if (tempInput && elementos.fiebreCheckbox.checked) {
    nuevoPaciente.temperatura = parseFloat(tempInput.value);
  }

  pacientes.push(nuevoPaciente);

  console.log("Paciente registrado:", nuevoPaciente);
  console.log("Total de pacientes:", pacientes.length);

  resetearFormulario();
  mostrarMensajeExito();
  mostrarInfoArbovirosis();
}

function resetearFormulario() {
  elementos.formulario.reset();
  limpiarResultadoRiesgo();
  limpiarMensajesError();

  const campoTemp = document.getElementById("campo-temperatura");
  if (campoTemp) {
    campoTemp.remove();
  }
}

function limpiarResultadoRiesgo() {
  elementos.resultadoRiesgo.textContent = "";
  elementos.resultadoRiesgo.classList.remove("riesgo-alto", "riesgo-bajo");
}

function mostrarMensajeExito() {
  alert("Datos registrados correctamente. Gracias por su colaboración.");
}

function mostrarPacientes() {
  console.table(pacientes);
}
