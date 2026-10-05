const ventas = {
    conos: 0,
    acrilicos: 0,
    polipapel: 0,
    vasos12oz: 0,
    copas: 0
};


// ========================================
// CARGAR DATOS GUARDADOS
// ========================================

function cargarDatos() {

    const datosGuardados = localStorage.getItem("ventasActuales");

    if (datosGuardados) {

        const datos = JSON.parse(datosGuardados);

        ventas.conos = datos.conos || 0;
        ventas.acrilicos = datos.acrilicos || 0;
        ventas.polipapel = datos.polipapel || 0;
        ventas.vasos12oz = datos.vasos12oz || 0;
        ventas.copas = datos.copas || 0;

    }

    actualizarPantalla();
}


// ========================================
// GUARDAR AUTOMÁTICAMENTE
// ========================================

function guardarDatos() {

    localStorage.setItem(
        "ventasActuales",
        JSON.stringify(ventas)
    );

}


// ========================================
// SUMAR
// ========================================

function sumar(producto) {

    ventas[producto]++;

    guardarDatos();
    actualizarPantalla();

}


// ========================================
// RESTAR
// ========================================

function restar(producto) {

    if (ventas[producto] > 0) {

        ventas[producto]--;

        guardarDatos();
        actualizarPantalla();

    }

}


// ========================================
// ACTUALIZAR PANTALLA
// ========================================

function actualizarPantalla() {

    document.getElementById("conos").textContent =
        ventas.conos;

    document.getElementById("acrilicos").textContent =
        ventas.acrilicos;

    document.getElementById("polipapel").textContent =
        ventas.polipapel;

    document.getElementById("vasos12oz").textContent =
        ventas.vasos12oz;

    document.getElementById("copas").textContent =
        ventas.copas;


    const total =
        ventas.conos +
        ventas.acrilicos +
        ventas.polipapel +
        ventas.vasos12oz +
        ventas.copas;


    document.getElementById("totalVentas").textContent =
        total;

}


// ========================================
// CERRAR TURNO
// ========================================

function cerrarTurno() {

    const total =
        ventas.conos +
        ventas.acrilicos +
        ventas.polipapel +
        ventas.vasos12oz +
        ventas.copas;


    if (total === 0) {

        alert("No hay ventas registradas en este turno.");

        return;

    }


    const confirmar = confirm(
        `¿Quieres cerrar este turno?\n\n` +
        `Total vendido: ${total} unidades`
    );


    if (!confirmar) {

        return;

    }


    // Crear registro del turno

    const turno = {

        fecha: new Date().toLocaleString("es-PE"),

        conos: ventas.conos,

        acrilicos: ventas.acrilicos,

        polipapel: ventas.polipapel,

        vasos12oz: ventas.vasos12oz,

        copas: ventas.copas,

        total: total

    };


    // Obtener historial

    const historial =
        JSON.parse(
            localStorage.getItem("historialTurnos")
        ) || [];


    // Agregar turno

    historial.unshift(turno);


    // Guardar historial

    localStorage.setItem(
        "historialTurnos",
        JSON.stringify(historial)
    );


    // Reiniciar ventas actuales

    ventas.conos = 0;
    ventas.acrilicos = 0;
    ventas.polipapel = 0;
    ventas.vasos12oz = 0;
    ventas.copas = 0;


    // Borrar turno actual

    localStorage.removeItem("ventasActuales");


    actualizarPantalla();


    alert(
        "✅ Turno cerrado correctamente.\n\n" +
        "El turno fue guardado en el historial."
    );


    mostrarHistorial();

}


// ========================================
// MOSTRAR HISTORIAL
// ========================================

function mostrarHistorial() {

    const historial =
        JSON.parse(
            localStorage.getItem("historialTurnos")
        ) || [];


    const contenedor =
        document.getElementById("historial");


    contenedor.innerHTML = "";


    if (historial.length === 0) {

        contenedor.innerHTML = `
            <p class="sin-historial">
                Todavía no tienes turnos registrados.
            </p>
        `;

        return;

    }


    historial.forEach((turno, index) => {

        const tarjeta = document.createElement("div");

        tarjeta.className = "history-card";


        tarjeta.innerHTML = `

            <div class="history-header">

                <strong>
                    Turno ${historial.length - index}
                </strong>

                <span>
                    ${turno.fecha}
                </span>

            </div>


            <div class="history-products">

                <p>🍦 Conos: <strong>${turno.conos}</strong></p>

                <p>🥤 Acrílicos: <strong>${turno.acrilicos}</strong></p>

                <p>🥤 Polipapel: <strong>${turno.polipapel}</strong></p>

                <p>🥤 Vasos 12 oz: <strong>${turno.vasos12oz}</strong></p>

                <p>🍨 Copas: <strong>${turno.copas}</strong></p>

            </div>


            <div class="history-total">

                Total vendido:
                <strong>${turno.total} unidades</strong>

            </div>

        `;


        contenedor.appendChild(tarjeta);

    });

}


// ========================================
// INICIAR APLICACIÓN
// ========================================

cargarDatos();

mostrarHistorial();