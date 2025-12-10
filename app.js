const API = "http://proyectobackend-production-19cb.up.railway.app"; 

let citaEditando = null;

// función para mostrar secciones
function mostrarSeccion(seccion) {
    document.getElementById("lista").style.display = "none";
    document.getElementById("crear").style.display = "none";
    document.getElementById("editar").style.display = "none";

    document.getElementById(seccion).style.display = "block";

    if (seccion === "lista") cargarCitas();
}

// cargar citas registradas
async function cargarCitas() {
    const res = await fetch(API);
    const datos = await res.json();

    const tabla = document.getElementById("tablaCitas");
    tabla.innerHTML = "";

    datos.forEach(cita => {
        const fila = `
            <tr>
                <td>${cita.paciente}</td>
                <td>${cita.motivo}</td>
                <td>${cita.fecha}</td>
                <td>${cita.hora}</td>
                <td>${cita.estado}</td>
                <td>
                    <button onclick='editar(${JSON.stringify(cita)})'>Editar</button>
                    <button onclick='eliminar(${cita.id})'>Eliminar</button>
                </td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}

// Crear cita
document.getElementById("formCrear").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nueva = {
        paciente: document.getElementById("paciente").value,
        motivo: document.getElementById("motivo").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value
    };

    await fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(nueva)
    });

    alert("Cita registrada");
    mostrarSeccion("lista");
});

// Editar cita
function editar(cita) {
    citaEditando = cita;
    mostrarSeccion("editar");

    document.getElementById("editPaciente").value = cita.paciente;
    document.getElementById("editMotivo").value = cita.motivo;
    document.getElementById("editFecha").value = cita.fecha;
    document.getElementById("editHora").value = cita.hora;
    document.getElementById("editEstado").value = cita.estado;
}

// Actualizar cita usa PUT
document.getElementById("formEditar").addEventListener("submit", async (e) => {
    e.preventDefault();

    citaEditando.paciente = document.getElementById("editPaciente").value;
    citaEditando.motivo = document.getElementById("editMotivo").value;
    citaEditando.fecha = document.getElementById("editFecha").value;
    citaEditando.hora = document.getElementById("editHora").value;
    citaEditando.estado = document.getElementById("editEstado").value;

    await fetch(`${API}/${citaEditando.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(citaEditando)
    });

    alert("Cita actualizada");
    mostrarSeccion("lista");
});

// Eliminar cita
async function eliminar(id) {
    if (confirm("¿Deseas eliminar esta cita?")) {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        cargarCitas();
    }
}

mostrarSeccion("lista");
