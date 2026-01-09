// const registrarSintomaBtns = document.querySelectorAll(".btn-primario");
// const seccionDestacada = document.getElementById("seccion-destacada");
// const seccionFormulario = document.getElementById("seccion-formulario");
// const seccionArbovirosis = document.getElementById("info-arbovirus");
// const btnVolverForm = document.getElementById("btn-volver-form");
// const btnEnviarForm = document.getElementById("btn-enviar-form");
// const btnCalcularRiesgo = document.getElementById("btn-calcular-riesgo");
// const pacientes = [];

// function mostrarFormulario() {
//   seccionFormulario.style.display = "block";
//   seccionArbovirosis.style.display = "none";
//   seccionDestacada.style.display = "none";
//   window.scrollTo(0, 0);
// }
// function mostrarInfoArbovirosis() {
//   seccionFormulario.style.display = "none";
//   seccionArbovirosis.style.display = "block";
//   seccionDestacada.style.display = "";
// }

// if (registrarSintomaBtns && registrarSintomaBtns.length) {
//   registrarSintomaBtns.forEach((btn) =>
//     btn.addEventListener("click", mostrarFormulario)
//   );
// }
// btnVolverForm.addEventListener("click", mostrarInfoArbovirosis);

// function validarFormulario(evento) {
//   evento.preventDefault();

//   const nombreInput = document.getElementById("nombre-paciente").value.trim();
//   const apellidosInput = document
//     .getElementById("apellidos-paciente")
//     .value.trim();
//   const carneInput = document.getElementById("carnet").value.trim();
//   const consultorioInput = document.getElementById("consultorio").value;
//   const edadInput = document.getElementById("edad").value;
//   const sintomasGroup = document.querySelector(".checkbox-group");
//   const diasInput = document.getElementById("dias").value;
//   const viajeInput = document.querySelector(
//     'input[name="viaje"]:checked'
//   ).value;

//   // Validaciones

//   if (nombreInput === "" || apellidosInput === "" || carneInput === "") {
//     alert("Por favor, completa todos los campos requeridos.");
//     return;
//   }
//   if (carneInput.length !== 11) {
//     alert("El número de carnet debe tener 11 dígitos.");
//     return;
//   }
//   if (consultorioInput < 1 || consultorioInput > 100) {
//     alert("El número de consultorio debe estar entre 1 y 100.");
//     return;
//   }
//   if (edadInput < 1 || edadInput > 120) {
//     alert("La edad debe estar entre 1 y 120 años.");
//     return;
//   }

//   const sintomasSeleccionados = Array.from(
//     sintomasGroup.querySelectorAll('input[type="checkbox"]:checked')
//   );

//   if (sintomasSeleccionados.length === 0) {
//     alert("Por favor, seleccione al menos un síntoma.");
//     return;
//   }

//   // Si el síntoma fiebre está seleccionado, validar campo de temperatura
//   const fiebreCheck = document.getElementById("sintoma-fiebre");
//   let temperaturaValor = null;
//   if (fiebreCheck && fiebreCheck.checked) {
//     const tempInput = document.getElementById("temperatura");
//     if (!tempInput || tempInput.value.trim() === "") {
//       alert("Por favor, indique la temperatura corporal.");
//       if (tempInput) tempInput.focus();
//       return;
//     }
//     const tempVal = parseFloat(tempInput.value);
//     if (isNaN(tempVal) || tempVal < 30 || tempVal > 45) {
//       alert("La temperatura debe ser un número entre 30 y 45 °C.");
//       tempInput.focus();
//       return;
//     }
//     temperaturaValor = tempVal;
//   }

//   // Si todo es válido, guardar los datos del paciente
//   const nuevoPaciente = {
//     nombre: nombreInput,
//     apellidos: apellidosInput,
//     carne: carneInput,
//     consultorio: consultorioInput,
//     edad: edadInput,
//     sintomas: sintomasSeleccionados.map((checkbox) => checkbox.value),
//     dias: diasInput,
//     viaje: viajeInput,
//   };
//   if (temperaturaValor !== null) {
//     nuevoPaciente.temperatura = temperaturaValor;
//   }
//   pacientes.push(nuevoPaciente);

//   document.getElementById("formulario-sintomas").reset();
//   // Limpiar el mensaje de riesgo al reiniciar el formulario
//   limpiarResultadoRiesgo();
//   limpiarCampoTemperatura();
//   alert("Datos enviados correctamente.");
//   mostrarInfoArbovirosis();
// }
// if (btnEnviarForm) {
//   btnEnviarForm.addEventListener("click", validarFormulario);
// }

// function calcularRiesgo() {
//   const puntos = {
//     fiebre: 2,
//     dolor_de_cabeza: 1,
//     dolor_muscular: 1,
//     dolor_articular: 2,
//     sarpullido: 1,
//   };

//   const sintomasGroup = document.querySelector(".checkbox-group");
//   const resultadoDiv = document.getElementById("resultado-riesgo");
//   if (!sintomasGroup || !resultadoDiv) return;

//   const seleccionados = Array.from(
//     sintomasGroup.querySelectorAll('input[type="checkbox"]:checked')
//   );

//   let total = 0;
//   seleccionados.forEach((checkbox) => {
//     total += puntos[checkbox.value] || 0;
//   });

//   if (total >= 5) {
//     resultadoDiv.textContent = "Alto riesgo – Acuda a su consultorio";
//     resultadoDiv.classList.remove("riesgo-bajo");
//     resultadoDiv.classList.add("riesgo-alto");
//   } else {
//     resultadoDiv.textContent = "Bajo riesgo – Monitoree sus síntomas";
//     resultadoDiv.classList.remove("riesgo-alto");
//     resultadoDiv.classList.add("riesgo-bajo");
//   }

//   if (seleccionados.length == 0) {
//     resultadoDiv.textContent = "No se han seleccionado síntomas.";
//     resultadoDiv.classList.remove("riesgo-alto", "riesgo-bajo");
//   }
// }
// if (btnCalcularRiesgo) {
//   btnCalcularRiesgo.addEventListener("click", calcularRiesgo);
// }

// // Elimina el campo de temperatura si existe
// function limpiarCampoTemperatura() {
//   const campoTemp = document.getElementById("campo-temperatura");
//   if (campoTemp && campoTemp.parentElement) {
//     campoTemp.parentElement.removeChild(campoTemp);
//   }
// }

// function limpiarResultadoRiesgo() {
//   const resultadoDivReset = document.getElementById("resultado-riesgo");
//   if (resultadoDivReset) {
//     resultadoDivReset.textContent = "";
//     resultadoDivReset.classList.remove("riesgo-alto", "riesgo-bajo");
//   }
// }

// // Muestra u oculta el campo de temperatura según el checkbox de fiebre
// function temperatura() {
//   const fiebreChk = document.getElementById("sintoma-fiebre");
//   const sintomas = document.querySelector(".checkbox-group");
//   if (!sintomas || !fiebreChk) return;

//   const sintomasCampo = sintomas.closest(".campo-formulario");
//   if (!sintomasCampo) return;

//   const existing = document.getElementById("campo-temperatura");

//   if (fiebreChk.checked) {
//     if (!existing) {
//       const tempDiv = document.createElement("div");
//       tempDiv.className = "campo-formulario";
//       tempDiv.id = "campo-temperatura";
//       tempDiv.innerHTML =
//         '<label for="temperatura">Temperatura (°C):</label><input type="number" id="temperatura" step="0.1" min="30" max="45">';
//       sintomasCampo.parentNode.insertBefore(tempDiv, sintomasCampo.nextSibling);
//     }
//   } else {
//     if (existing) {
//       existing.parentElement.removeChild(existing);
//     }
//   }
// }

// // Conectar el listener al checkbox de fiebre para mostrar/ocultar el campo
// const chkFiebre = document.getElementById("sintoma-fiebre");
// if (chkFiebre) {
//   chkFiebre.addEventListener("change", temperatura);
//   // Inicializar estado en caso de que el checkbox ya estuviera marcado
//   temperatura();
// }

// ============================================
// CONFIGURACIÓN Y CONSTANTES
// ============================================
const PUNTOS_SINTOMAS = {
  fiebre: 2,
  dolor_de_cabeza: 1,
  dolor_muscular: 1,
  dolor_articular: 2,
  sarpullido: 3, // Corregido según el PDF: 3 puntos
};

const RANGOS_VALIDACION = {
  consultorio: { min: 1, max: 100 },
  edad: { min: 1, max: 120 },
  temperatura: { min: 30, max: 45 },
  carnetLength: 11,
};

// ============================================
// ALMACENAMIENTO DE DATOS
// ============================================
const pacientes = [];

// ============================================
// REFERENCIAS DEL DOM
// ============================================
let elementos = {};

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  inicializarElementos();
  configurarEventListeners();
  inicializarEstadoFormulario();
});

/**
 * Inicializa todas las referencias a elementos del DOM
 */
function inicializarElementos() {
  elementos = {
    // Botones
    registrarSintomaBtns: document.querySelectorAll(".btn-primario"),
    btnVolverForm: document.getElementById("btn-volver-form"),
    btnEnviarForm: document.getElementById("btn-enviar-form"),
    btnCalcularRiesgo: document.getElementById("btn-calcular-riesgo"),

    // Secciones
    seccionDestacada: document.getElementById("seccion-destacada"),
    seccionFormulario: document.getElementById("seccion-formulario"),
    seccionArbovirosis: document.getElementById("info-arbovirus"),

    // Formulario
    formulario: document.getElementById("formulario-sintomas"),

    // Campos de entrada
    nombreInput: document.getElementById("nombre-paciente"),
    apellidosInput: document.getElementById("apellidos-paciente"),
    carnetInput: document.getElementById("carnet"),
    consultorioInput: document.getElementById("consultorio"),
    edadInput: document.getElementById("edad"),
    municipioSelect: document.getElementById("municipio"),
    diasInput: document.getElementById("dias"),

    // Checkboxes y radio buttons
    fiebreCheckbox: document.getElementById("sintoma-fiebre"),
    checkboxGroup: document.querySelector(".checkbox-group"),

    // Resultados
    resultadoRiesgo: document.getElementById("resultado-riesgo"),
  };
}

/**
 * Configura todos los event listeners de la aplicación
 */
function configurarEventListeners() {
  // Botones de "Registrar Síntoma"
  if (elementos.registrarSintomaBtns && elementos.registrarSintomaBtns.length) {
    elementos.registrarSintomaBtns.forEach((btn) => {
      btn.addEventListener("click", mostrarFormulario);
    });
  }

  // Botón volver
  if (elementos.btnVolverForm) {
    elementos.btnVolverForm.addEventListener("click", mostrarInfoArbovirosis);
  }

  // Envío del formulario
  if (elementos.formulario) {
    elementos.formulario.addEventListener("submit", validarFormulario);
  }

  // Cálculo de riesgo
  if (elementos.btnCalcularRiesgo) {
    elementos.btnCalcularRiesgo.addEventListener("click", calcularRiesgo);
  }

  // Checkbox de fiebre (mostrar/ocultar campo de temperatura)
  if (elementos.fiebreCheckbox) {
    elementos.fiebreCheckbox.addEventListener("change", campoTemperatura);
  }

  // Validación en tiempo real (opcional, mejora la UX)
  configurarValidacionTiempoReal();
}

/**
 * Inicializa el estado del formulario
 */
function inicializarEstadoFormulario() {
  // Verificar si el checkbox de fiebre ya está marcado
  if (elementos.fiebreCheckbox) {
    campoTemperatura();
  }
}

// ============================================
// NAVEGACIÓN ENTRE SECCIONES
// ============================================

/**
 * Muestra el formulario de registro y oculta otras secciones
 */
function mostrarFormulario() {
  elementos.seccionFormulario.style.display = "block";
  elementos.seccionArbovirosis.style.display = "none";
  elementos.seccionDestacada.style.display = "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Muestra la información de arbovirus y oculta el formulario
 */
function mostrarInfoArbovirosis() {
  elementos.seccionFormulario.style.display = "none";
  elementos.seccionArbovirosis.style.display = "block";
  elementos.seccionDestacada.style.display = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================
// VALIDACIÓN DEL FORMULARIO
// ============================================

/**
 * Valida todos los campos del formulario
 * @param {Event} evento - Evento de envío del formulario
 */
function validarFormulario(evento) {
  evento.preventDefault();

  // Limpiar mensajes de error previos
  limpiarMensajesError();

  let formularioValido = true;

  // Validar cada campo
  formularioValido = validarNombre() && formularioValido;
  formularioValido = validarApellidos() && formularioValido;
  formularioValido = validarCarnet() && formularioValido;
  formularioValido = validarConsultorio() && formularioValido;
  formularioValido = validarEdad() && formularioValido;
  formularioValido = validarSintomas() && formularioValido;
  formularioValido = validarTemperatura() && formularioValido;

  // Si todo es válido, guardar los datos
  if (formularioValido) {
    guardarPaciente();
  }
}

/**
 * Valida el campo de nombre
 * @returns {boolean} - true si es válido
 */
function validarNombre() {
  const valor = elementos.nombreInput.value.trim();

  if (valor === "") {
    mostrarError(elementos.nombreInput, "El nombre es obligatorio.");
    return false;
  }

  return true;
}

/**
 * Valida el campo de apellidos
 * @returns {boolean} - true si es válido
 */
function validarApellidos() {
  const valor = elementos.apellidosInput.value.trim();

  if (valor === "") {
    mostrarError(elementos.apellidosInput, "Los apellidos son obligatorios.");
    return false;
  }

  return true;
}

/**
 * Valida el carnet de identidad (debe tener exactamente 11 dígitos numéricos)
 * @returns {boolean} - true si es válido
 */
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
      "El carnet debe tener exactamente 11 dígitos."
    );
    return false;
  }

  if (!/^\d+$/.test(valor)) {
    mostrarError(
      elementos.carnetInput,
      "El carnet debe contener solo números."
    );
    return false;
  }

  return true;
}

/**
 * Valida el número de consultorio (entre 1 y 100)
 * @returns {boolean} - true si es válido
 */
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

/**
 * Valida la edad (entre 1 y 120)
 * @returns {boolean} - true si es válido
 */
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

/**
 * Valida que al menos un síntoma esté seleccionado
 * @returns {boolean} - true si es válido
 */
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

/**
 * Valida el campo de temperatura (si el checkbox de fiebre está marcado)
 * @returns {boolean} - true si es válido
 */
function validarTemperatura() {
  // Solo validar si el checkbox de fiebre está marcado
  if (!elementos.fiebreCheckbox.checked) {
    return true;
  }

  const tempInput = document.getElementById("temperatura");

  if (!tempInput) {
    return true; // No debería ocurrir, pero por seguridad
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

/**
 * Muestra un mensaje de error debajo de un campo
 * @param {HTMLElement} elemento - Campo que tiene el error
 * @param {string} mensaje - Mensaje de error a mostrar
 */
function mostrarError(elemento, mensaje) {
  // Añadir clase de error al campo
  elemento.classList.add("input-error");

  // Crear elemento de mensaje de error
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = mensaje;

  // Insertar después del campo (o del grupo en caso de checkboxes)
  if (elemento.classList.contains("checkbox-group")) {
    elemento.parentElement.appendChild(errorDiv);
  } else {
    elemento.parentElement.appendChild(errorDiv);
  }
}

/**
 * Limpia todos los mensajes de error del formulario
 */
function limpiarMensajesError() {
  // Eliminar clases de error
  const camposConError = elementos.formulario.querySelectorAll(".input-error");
  camposConError.forEach((campo) => {
    campo.classList.remove("input-error");
  });

  // Eliminar mensajes de error
  const mensajesError = elementos.formulario.querySelectorAll(".error-message");
  mensajesError.forEach((mensaje) => {
    mensaje.remove();
  });
}

/**
 * Configura la validación en tiempo real (opcional)
 */
function configurarValidacionTiempoReal() {
  // Validar carnet mientras se escribe
  if (elementos.carnetInput) {
    elementos.carnetInput.addEventListener("input", function () {
      // Permitir solo números
      this.value = this.value.replace(/[^\d]/g, "");
    });
  }

  // Validar consultorio
  if (elementos.consultorioInput) {
    elementos.consultorioInput.addEventListener("input", function () {
      const valor = parseInt(this.value);
      const { min, max } = RANGOS_VALIDACION.consultorio;

      if (valor < min) this.value = min;
      if (valor > max) this.value = max;
    });
  }

  // Validar edad
  if (elementos.edadInput) {
    elementos.edadInput.addEventListener("input", function () {
      const valor = parseInt(this.value);
      const { min, max } = RANGOS_VALIDACION.edad;

      if (valor < min) this.value = min;
      if (valor > max) this.value = max;
    });
  }
}

// ============================================
// CÁLCULO DE RIESGO
// ============================================

/**
 * Calcula el nivel de riesgo basado en los síntomas seleccionados
 */
function calcularRiesgo() {
  const sintomasSeleccionados = obtenerSintomasSeleccionados();

  if (sintomasSeleccionados.length === 0) {
    elementos.resultadoRiesgo.textContent = "No se han seleccionado síntomas.";
    elementos.resultadoRiesgo.classList.remove("riesgo-alto", "riesgo-bajo");
    return;
  }

  // Calcular puntuación total
  const totalPuntos = sintomasSeleccionados.reduce((total, checkbox) => {
    return total + (PUNTOS_SINTOMAS[checkbox.value] || 0);
  }, 0);

  // Mostrar resultado según la puntuación
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

/**
 * Obtiene todos los checkboxes de síntomas que están seleccionados
 * @returns {Array} - Array de elementos checkbox seleccionados
 */
function obtenerSintomasSeleccionados() {
  return Array.from(
    elementos.checkboxGroup.querySelectorAll('input[type="checkbox"]:checked')
  );
}

// ============================================
// MANEJO DEL CAMPO DE TEMPERATURA
// ============================================

/**
 * Muestra u oculta el campo de temperatura según el estado del checkbox de fiebre
 */
function campoTemperatura() {
  const campoExistente = document.getElementById("campo-temperatura");

  if (elementos.fiebreCheckbox.checked) {
    // Mostrar campo si no existe
    if (!campoExistente) {
      crearCampoTemperatura();
    }
  } else {
    // Ocultar campo si existe
    if (campoExistente) {
      campoExistente.remove();
    }
  }
}

/**
 * Crea el campo de entrada para la temperatura corporal
 */
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

  // Insertar después del campo de síntomas
  sintomasCampo.parentNode.insertBefore(tempDiv, sintomasCampo.nextSibling);
}

// ============================================
// GUARDAR DATOS DEL PACIENTE
// ============================================

/**
 * Guarda los datos del paciente en el array de pacientes
 */
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

  // Agregar temperatura si está disponible
  const tempInput = document.getElementById("temperatura");
  if (tempInput && elementos.fiebreCheckbox.checked) {
    nuevoPaciente.temperatura = parseFloat(tempInput.value);
  }

  // Guardar en el array
  pacientes.push(nuevoPaciente);

  console.log("Paciente registrado:", nuevoPaciente);
  console.log("Total de pacientes:", pacientes.length);

  // Resetear formulario y volver a la página principal
  resetearFormulario();
  mostrarMensajeExito();
  mostrarInfoArbovirosis();
}

/**
 * Resetea el formulario a su estado inicial
 */
function resetearFormulario() {
  elementos.formulario.reset();
  limpiarResultadoRiesgo();
  limpiarMensajesError();

  // Eliminar campo de temperatura si existe
  const campoTemp = document.getElementById("campo-temperatura");
  if (campoTemp) {
    campoTemp.remove();
  }
}

/**
 * Limpia el resultado del cálculo de riesgo
 */
function limpiarResultadoRiesgo() {
  elementos.resultadoRiesgo.textContent = "";
  elementos.resultadoRiesgo.classList.remove("riesgo-alto", "riesgo-bajo");
}

/**
 * Muestra un mensaje de éxito al usuario
 */
function mostrarMensajeExito() {
  alert("Datos registrados correctamente. Gracias por su colaboración.");
}

// ============================================
// UTILIDADES
// ============================================

/**
 * Función para debugging - muestra todos los pacientes registrados
 */
function mostrarPacientes() {
  console.table(pacientes);
}

// Hacer la función disponible globalmente para debugging
window.mostrarPacientes = mostrarPacientes;
