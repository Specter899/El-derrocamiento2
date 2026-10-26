function loginAdmin() {
  const user = document.getElementById('userInput').value.trim();
  const pass = document.getElementById('passInput').value;
  const msg = document.getElementById('loginMsg');
  if (user === 'mari' && pass === '123') {
    window.location.href = `admin.html?user=${encodeURIComponent(user)}`;
  } else {
    msg.style.display = 'block';
  }
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
if (window.AOS) {
  AOS.init({ duration: 1000, once: true });
}
function cargarSaludoAdmin() {
  const params = new URLSearchParams(window.location.search);
  const user = params.get("user") || "admin";
  const saludo = document.getElementById("adminSaludo");
  if (saludo) {
    saludo.textContent = `Bienvenido/a ${user}`;
  }
}
let torneos = [];
function agregarTorneo() {
  const titulo = document.getElementById("titulo")?.value.trim();
  const juego = document.getElementById("juego")?.value.trim();
  const plataforma = document.getElementById("plataforma")?.value.trim();
  const fecha = document.getElementById("fecha")?.value;
  const cupos = document.getElementById("cupos")?.value;
  const objetivo = document.getElementById("objetivo")?.value.trim();
  if (!titulo || !juego || !plataforma || !fecha || !cupos || !objetivo) {
    alert("Complete todos los campos");
    return;
  }
  const nuevo = {
    id: Date.now(),
    titulo,
    juego,
    plataforma,
    fecha,
    cupos,
    objetivo
  };
  torneos.push(nuevo);
  renderTorneos();
  document.getElementById("titulo").value = "";
  document.getElementById("juego").value = "";
  document.getElementById("plataforma").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("cupos").value = "";
  document.getElementById("objetivo").value = "";
}
function renderTorneos() {
  const lista = document.getElementById("listaTorneos");
  if (!lista) return;
  lista.innerHTML = "";
  torneos.forEach(t => {
    const li = document.createElement("li");
    li.className = "list-group-item bg-transparent text-light border-secondary mb-2";
    li.innerHTML = `
      <b>${t.titulo}</b> — ${t.juego} (${t.plataforma})
      <br>📅 ${t.fecha} | 👥 ${t.cupos} cupos
      <br>🎯 ${t.objetivo}
      <div class="mt-2">
        <button class="btn btn-sm btn-danger" onclick="eliminarTorneo(${t.id})">Borrar</button>
      </div>
    `;
    lista.appendChild(li);
  });
}
function eliminarTorneo(id) {
  torneos = torneos.filter(t => t.id !== id);
  renderTorneos();
}
function configurarFormularioColaboracion() {
  const selector = document.getElementById("tipoColaboracion");
  const dinero = document.getElementById("seccionDinero");
  const trabajo = document.getElementById("seccionTrabajo");
  const difusion = document.getElementById("seccionDifusion");
  if (!selector) return; 
  dinero.style.display = "none";
  trabajo.style.display = "none";
  difusion.style.display = "none";
  selector.addEventListener("change", () => {
    const opcion = selector.value;
    dinero.style.display = "none";
    trabajo.style.display = "none";
    difusion.style.display = "none";
    if (opcion === "dinero") dinero.style.display = "block";
    if (opcion === "trabajo") trabajo.style.display = "block";
    if (opcion === "difusion") difusion.style.display = "block";
  });
}
document.addEventListener("DOMContentLoaded", () => {
  cargarSaludoAdmin();
  configurarFormularioColaboracion();
});
