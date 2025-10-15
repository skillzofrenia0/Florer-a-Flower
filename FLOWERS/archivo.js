
// Esperamos que el DOM cargue completamente
document.addEventListener("DOMContentLoaded", () => {

  // --- CARRUSELES Y ZOOM ---
  const carruseles = document.querySelectorAll(".carrusel-imagenes, .carrusel-imagenes2, .carrusel-imagenes3, .carrusel-imagenes4");

  carruseles.forEach(carrusel => {
    carrusel.querySelectorAll("img").forEach(img => {
      
      // Clic simple -> pausar/reanudar
      img.addEventListener("click", () => {
        carrusel.classList.toggle("paused");
      });

      // Doble clic -> abrir zoom
      img.addEventListener("dblclick", () => {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0,0,0,0.8)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.cursor = "zoom-out";
        overlay.style.zIndex = 1000;

        const zoomImg = document.createElement("img");
        zoomImg.src = img.src;
        zoomImg.style.maxWidth = "90%";
        zoomImg.style.maxHeight = "90%";
        zoomImg.style.borderRadius = "10px";

        overlay.appendChild(zoomImg);
        document.body.appendChild(overlay);

        // Cerrar modal al clic en el overlay
        overlay.addEventListener("click", () => {
          document.body.removeChild(overlay);
        });
      });
    });
  });

  // --- BUSCADOR FUNCIONAL ---
  const formulario = document.getElementById("buscador");
  const input = document.getElementById("inputBuscar");

  const flores = { 
    "rosas": "Rosas", 
    "orquideas": "Orquideas", 
    "orquídeas": "Orquideas", 
    "arreglos": "Arreglos", 
    "girasoles": "Arreglos",
    "ramos": "Ramos"
  };

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const valor = input.value.trim().toLowerCase();

    if(flores[valor]) {
      const seccion = document.getElementById(flores[valor]);
      if(seccion) {
        seccion.scrollIntoView({ behavior: "smooth", block: "start" });
        seccion.classList.add("resaltado");
        setTimeout(() => { seccion.classList.remove("resaltado"); }, 2000);
      }
    } else {
      alert("No se encontró la flor: " + input.value);
    }
  });

});
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("buscador");
  const input = document.getElementById("inputBuscar");
  const sugerencias = document.getElementById("sugerencias");

  // Lista de flores y secciones
  const flores = {
    "rosas": "Rosas",
    "orquídeas": "Orquídeas",
    "orquideas": "Orquídeas",
    "arreglos": "Arreglos",
    "girasoles": "Arreglos",
    "ramos": "Ramos"
  };

  // Autocompletado
  input.addEventListener("input", () => {
    const valor = input.value.toLowerCase().trim();
    sugerencias.innerHTML = "";
    if(valor === "") {
      sugerencias.style.display = "none";
      return;
    }
    Object.keys(flores).forEach(nombre => {
      if(nombre.startsWith(valor)) {
        const div = document.createElement("div");
        div.textContent = nombre;
        div.addEventListener("click", () => {
          input.value = nombre;
          sugerencias.style.display = "none";
          scrollToSection(nombre);
        });
        sugerencias.appendChild(div);
        sugerencias.style.display = "block";
      }
    });
  });

  // Submit del formulario
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const valor = input.value.toLowerCase().trim();
    if(flores[valor]) {
      scrollToSection(valor);
      sugerencias.style.display = "none";
    } else {
      alert("No se encontró la flor: " + input.value);
    }
  });

  // Función para hacer scroll suave
  function scrollToSection(valor) {
    const id = flores[valor];
    const seccion = document.getElementById(id);
    if(seccion) {
      seccion.scrollIntoView({ behavior: "smooth", block: "start" });
      seccion.classList.add("resaltado");
      setTimeout(() => seccion.classList.remove("resaltado"), 2000);
    }
  }
});

