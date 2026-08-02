// Base de datos de vehículos (Enfocada en el mercado objetivo)
const catalogoVehiculos = {
    "honda": {
        "crv": { nombre: "CR-V", versiones: ["EX", "EX-L", "Touring"], precioBaseRD: 29000 },
        "civic": { nombre: "Civic", versiones: ["Sport", "EX", "Touring"], precioBaseRD: 24000 }
    },
    "hyundai": {
        "tucson": { nombre: "Tucson", versiones: ["SEL", "N-Line", "Limited"], precioBaseRD: 25000 },
        "santafe": { nombre: "Santa Fe", versiones: ["SEL", "Calligraphy"], precioBaseRD: 32000 }
    },
    "toyota": {
        "rav4": { nombre: "RAV4", versiones: ["XLE", "Premium", "Limited"], precioBaseRD: 31000 },
        "highlander": { nombre: "Highlander", versiones: ["XLE", "Platinum"], precioBaseRD: 42000 }
    },
    "infiniti": {
        "q50s": { nombre: "Q50s", versiones: ["Sport", "Red Sport 400"], precioBaseRD: 28000 }
    }
};

// Lógica de Formulario Dinámico en Cascada
function actualizarModelos() {
    const marca = document.getElementById("marca").value;
    const modeloSelect = document.getElementById("modelo");
    const versionSelect = document.getElementById("version");

    modeloSelect.innerHTML = '<option value="" disabled selected>Seleccionar modelo...</option>';
    versionSelect.innerHTML = '<option value="" disabled selected>Seleccionar versión...</option>';
    versionSelect.disabled = true;

    if (marca) {
        modeloSelect.disabled = false;
        const modelos = catalogoVehiculos[marca];
        for (let key in modelos) {
            let opt = document.createElement("option");
            opt.value = key;
            opt.textContent = modelos[key].nombre;
            modeloSelect.appendChild(opt);
        }
    }
}

function actualizarVersiones() {
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const versionSelect = document.getElementById("version");

    versionSelect.innerHTML = '<option value="" disabled selected>Seleccionar versión...</option>';

    if (modelo) {
        versionSelect.disabled = false;
        const versiones = catalogoVehiculos[marca][modelo].versiones;
        versiones.forEach(v => {
            let opt = document.createElement("option");
            opt.value = v;
            opt.textContent = v;
            versionSelect.appendChild(opt);
        });
    }
}

// Motor de Cálculo Financiero
function calcularProyeccion() {
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const presupuesto = document.getElementById("presupuesto").value;

    if (!marca || !modelo || !presupuesto) {
        alert("Completar campos obligatorios (Marca, Modelo y Presupuesto) para generar la proyección.");
        return;
    }

    // Extracción de datos de mercado
    const precioCalleRD = catalogoVehiculos[marca][modelo].precioBaseRD;
    
    // Simulación de costos operativos ocultos + comisión (El cliente NUNCA ve esto)
    // Se ajusta el precio final de NEXT PRO BROKER para garantizar que esté por debajo del precio de calle y muestre un ahorro real.
    const ahorroCalculado = precioCalleRD * 0.15; // 15% de ahorro promedio simulado
    const precioNextBroker = precioCalleRD - ahorroCalculado;

    // Actualización del UI
    animarContador("precio-local", precioCalleRD);
    animarContador("precio-broker", precioNextBroker);
    animarContador("monto-ahorro", ahorroCalculado, " USD");

    document.getElementById("panel-resultados").classList.remove("hidden");
    
    // Scroll suave hacia los resultados
    document.getElementById("panel-resultados").scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Función para animar los números dándole un toque prémium
function animarContador(id, valorFinal, sufijo = "") {
    const elemento = document.getElementById(id);
    let iteracion = 0;
    const intervalo = setInterval(() => {
        iteracion += 500;
        if (iteracion >= valorFinal) {
            elemento.textContent = "$" + valorFinal.toLocaleString('en-US') + sufijo;
            clearInterval(intervalo);
        } else {
            elemento.textContent = "$" + iteracion.toLocaleString('en-US') + sufijo;
        }
    }, 10);
}

// Cierre Directo vía WhatsApp
function cerrarVentaWA() {
    const marca = document.getElementById("marca").options[document.getElementById("marca").selectedIndex].text;
    const modelo = document.getElementById("modelo").options[document.getElementById("modelo").selectedIndex].text;
    const version = document.getElementById("version").value;
    const anio = document.getElementById("anio").value;
    const titulo = document.getElementById("titulo").options[document.getElementById("titulo").selectedIndex].text;
    const precioCotizado = document.getElementById("precio-broker").textContent;
    const ahorro = document.getElementById("monto-ahorro").textContent;

    const texto = `VENTA DIRECTA: Solicito iniciar contrato de búsqueda y representación. \n\n` +
                  `- Vehículo: ${marca} ${modelo} ${version} (${anio})\n` +
                  `- Condición: ${titulo}\n` +
                  `- Precio Proyectado: ${precioCotizado}\n` +
                  `- Ahorro Estimado: ${ahorro}\n\n` +
                  `Estoy listo para realizar el depósito de compromiso.`;

    const numeroAsesor = "18290000000"; // Reemplazar
    const url = `https://wa.me/${numeroAsesor}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
}
