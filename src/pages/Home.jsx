import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Panel from "../components/Panel.jsx";
import { secciones } from "../components/Secciones.jsx";
import { contacto, foto, perfil } from "../data/cv.js";

// Botones flotantes alrededor de la foto.
// "id" corresponde a una sección de Secciones.jsx; "posicion" a una clase de index.css
const botones = [
  { id: "experiencia", etiqueta: "Experiencia", icono: "💼", posicion: "pos-1" },
  { id: "educacion", etiqueta: "Educación", icono: "🎓", posicion: "pos-2" },
  { id: "proyectos", etiqueta: "Proyectos personales", icono: "💻", posicion: "pos-3" },
  { id: "habilidades", etiqueta: "Habilidades técnicas", icono: "🛠️", posicion: "pos-4" },
];

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // Si se vuelve desde la página de un proyecto, se abre esa sección
  const [abierta, setAbierta] = useState(location.state?.seccion ?? null);
  const refsBotones = useRef({});

  // Limpia el estado del historial para que al recargar no se reabra
  useEffect(() => {
    if (location.state?.seccion) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  const seccionAbierta = secciones.find((s) => s.id === abierta);

  return (
    <div className="pagina">
      <main className="hero contenedor">
        {/* Contacto */}
        <ul className="contacto">
          {contacto.map((c) => (
            <li key={c.nombre}>
              <a
                href={c.url}
                target={c.url.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                <img src={c.icono} alt="" className="contacto-icono" />
                <span>{c.texto}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Título */}
        <h1 className="titulo">
          <svg className="trazo trazo-destello" viewBox="0 0 40 40" aria-hidden="true">
            <path d="M8 30 L16 18 M20 32 L22 14 M30 30 L34 20" />
          </svg>
          <span className="titulo-nombre">Matías Landerer Contreras</span>
          <span className="titulo-rol">Estudiante de Ciencia de la Computación</span>
        </h1>

        {/* Escena: presentación, foto y botones */}
        <div className="escena">
          <blockquote className="presentacion">
            <p>{perfil}</p>
          </blockquote>

          <div className="foto-zona">
            <svg className="trazo trazo-curva" viewBox="0 0 80 60" aria-hidden="true">
              <path d="M6 50 C 20 10, 50 6, 74 18" />
            </svg>
            <img src={foto} alt="Foto de Matías Landerer" className="foto" />
          </div>

          {botones.map((b) => (
            <button
              key={b.id}
              ref={(el) => (refsBotones.current[b.id] = el)}
              className={`chip ${b.posicion}`}
              onClick={() => setAbierta(b.id)}
            >
              <span aria-hidden="true">{b.icono}</span>
              {b.etiqueta}
            </button>
          ))}
        </div>
      </main>

      <footer className="pie">
        © {new Date().getFullYear()} Matías Landerer Contreras
      </footer>

      {seccionAbierta && (
        <Panel
          key={seccionAbierta.id}
          seccion={seccionAbierta}
          obtenerOrigen={() =>
            refsBotones.current[seccionAbierta.id]?.getBoundingClientRect() ??
            null
          }
          onCerrar={() => setAbierta(null)}
        />
      )}
    </div>
  );
}