const registrarSintomaBtns = document.querySelectorAll(".btn-primario");
const seccionDestacada = document.getElementById("seccion-destacada");
const seccionFormulario = document.getElementById("seccion-formulario");
const seccionArbovirosis = document.getElementById("info-arbovirus");
const btnVolverForm = document.getElementById("btn-volver-form");
const btnEnviarForm = document.getElementById("btn-enviar-form");
const btnCalcularRiesgo = document.getElementById("btn-calcular-riesgo");
const pacientes = [];

function mostrarFormulario() {
  seccionFormulario.style.display = "block";
  seccionArbovirosis.style.display = "none";
  seccionDestacada.style.display = "none";
  window.scrollTo(0, 0);
}
function mostrarInfoArbovirosis() {
  seccionFormulario.style.display = "none";
  seccionArbovirosis.style.display = "block";
  seccionDestacada.style.display = "";
}

if (registrarSintomaBtns && registrarSintomaBtns.length) {
  registrarSintomaBtns.forEach((btn) =>
    btn.addEventListener("click", mostrarFormulario)
  );
}
btnVolverForm.addEventListener("click", mostrarInfoArbovirosis);

function validarFormulario(evento) {
  evento.preventDefault();

  const nombreInput = document.getElementById("nombre-paciente").value.trim();
  const apellidosInput = document
    .getElementById("apellidos-paciente")
    .value.trim();
  const carneInput = document.getElementById("carnet").value.trim();
  const consultorioInput = document.getElementById("consultorio").value;
  const edadInput = document.getElementById("edad").value;
  const sintomasGroup = document.querySelector(".checkbox-group");
  const diasInput = document.getElementById("dias").value;
  const viajeInput = document.querySelector(
    'input[name="viaje"]:checked'
  ).value;

  // Validaciones

  if (nombreInput === "" || apellidosInput === "" || carneInput === "") {
    alert("Por favor, completa todos los campos requeridos.");
    return;
  }
  if (carneInput.length !== 11) {
    alert("El número de carnet debe tener 11 dígitos.");
    return;
  }
  if (consultorioInput < 1 || consultorioInput > 100) {
    alert("El número de consultorio debe estar entre 1 y 100.");
    return;
  }
  if (edadInput < 1 || edadInput > 120) {
    alert("La edad debe estar entre 1 y 120 años.");
    return;
  }

  const sintomasSeleccionados = Array.from(
    sintomasGroup.querySelectorAll('input[type="checkbox"]:checked')
  );

  if (sintomasSeleccionados.length === 0) {
    alert("Por favor, seleccione al menos un síntoma.");
    return;
  }

  // Si el síntoma fiebre está seleccionado, validar campo de temperatura
  const fiebreCheck = document.getElementById("sintoma-fiebre");
  let temperaturaValor = null;
  if (fiebreCheck && fiebreCheck.checked) {
    const tempInput = document.getElementById("temperatura");
    if (!tempInput || tempInput.value.trim() === "") {
      alert("Por favor, indique la temperatura corporal.");
      if (tempInput) tempInput.focus();
      return;
    }
    const tempVal = parseFloat(tempInput.value);
    if (isNaN(tempVal) || tempVal < 30 || tempVal > 45) {
      alert("La temperatura debe ser un número entre 30 y 45 °C.");
      tempInput.focus();
      return;
    }
    temperaturaValor = tempVal;
  }

  // Si todo es válido, guardar los datos del paciente
  const nuevoPaciente = {
    nombre: nombreInput,
    apellidos: apellidosInput,
    carne: carneInput,
    consultorio: consultorioInput,
    edad: edadInput,
    sintomas: sintomasSeleccionados.map((checkbox) => checkbox.value),
    dias: diasInput,
    viaje: viajeInput,
  };
  if (temperaturaValor !== null) {
    nuevoPaciente.temperatura = temperaturaValor;
  }
  pacientes.push(nuevoPaciente);

  document.getElementById("formulario-sintomas").reset();
  // Limpiar el mensaje de riesgo al reiniciar el formulario
  limpiarResultadoRiesgo();
  limpiarCampoTemperatura();
  alert("Datos enviados correctamente.");
  mostrarInfoArbovirosis();
}
if (btnEnviarForm) {
  btnEnviarForm.addEventListener("click", validarFormulario);
}

function calcularRiesgo() {
  const puntos = {
    fiebre: 2,
    dolor_de_cabeza: 1,
    dolor_muscular: 1,
    dolor_articular: 2,
    sarpullido: 1,
  };

  const sintomasGroup = document.querySelector(".checkbox-group");
  const resultadoDiv = document.getElementById("resultado-riesgo");
  if (!sintomasGroup || !resultadoDiv) return;

  const seleccionados = Array.from(
    sintomasGroup.querySelectorAll('input[type="checkbox"]:checked')
  );

  let total = 0;
  seleccionados.forEach((checkbox) => {
    total += puntos[checkbox.value] || 0;
  });

  if (total >= 5) {
    resultadoDiv.textContent = "Alto riesgo – Acuda a su consultorio";
    resultadoDiv.classList.remove("riesgo-bajo");
    resultadoDiv.classList.add("riesgo-alto");
  } else {
    resultadoDiv.textContent = "Bajo riesgo – Monitoree sus síntomas";
    resultadoDiv.classList.remove("riesgo-alto");
    resultadoDiv.classList.add("riesgo-bajo");
  }

  if (seleccionados.length == 0) {
    resultadoDiv.textContent = "No se han seleccionado síntomas.";
    resultadoDiv.classList.remove("riesgo-alto", "riesgo-bajo");
  }
}
if (btnCalcularRiesgo) {
  btnCalcularRiesgo.addEventListener("click", calcularRiesgo);
}

// Elimina el campo de temperatura si existe
function limpiarCampoTemperatura() {
  const campoTemp = document.getElementById("campo-temperatura");
  if (campoTemp && campoTemp.parentElement) {
    campoTemp.parentElement.removeChild(campoTemp);
  }
}

function limpiarResultadoRiesgo() {
  const resultadoDivReset = document.getElementById("resultado-riesgo");
  if (resultadoDivReset) {
    resultadoDivReset.textContent = "";
    resultadoDivReset.classList.remove("riesgo-alto", "riesgo-bajo");
  }
}

// Muestra u oculta el campo de temperatura según el checkbox de fiebre
function temperatura() {
  const fiebreChk = document.getElementById("sintoma-fiebre");
  const sintomas = document.querySelector(".checkbox-group");
  if (!sintomas || !fiebreChk) return;

  const sintomasCampo = sintomas.closest(".campo-formulario");
  if (!sintomasCampo) return;

  const existing = document.getElementById("campo-temperatura");

  if (fiebreChk.checked) {
    if (!existing) {
      const tempDiv = document.createElement("div");
      tempDiv.className = "campo-formulario";
      tempDiv.id = "campo-temperatura";
      tempDiv.innerHTML =
        '<label for="temperatura">Temperatura (°C):</label><input type="number" id="temperatura" step="0.1" min="30" max="45">';
      sintomasCampo.parentNode.insertBefore(tempDiv, sintomasCampo.nextSibling);
    }
  } else {
    if (existing) {
      existing.parentElement.removeChild(existing);
    }
  }
}

// Conectar el listener al checkbox de fiebre para mostrar/ocultar el campo
const chkFiebre = document.getElementById("sintoma-fiebre");
if (chkFiebre) {
  chkFiebre.addEventListener("change", temperatura);
  // Inicializar estado en caso de que el checkbox ya estuviera marcado
  temperatura();
}
