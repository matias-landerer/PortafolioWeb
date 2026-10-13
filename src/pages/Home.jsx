import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Panel from "../components/Panel.jsx";
import { secciones } from "../components/Secciones.jsx";
import { contacto, foto } from "../data/cv.js";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // Si se vuelve desde la página de un proyecto, se abre esa sección
  const [abierta, setAbierta] = useState(location.state?.seccion ?? null);
  const cuadros = useRef({});

  // Limpia el estado del historial para que al recargar no se reabra
  useEffect(() => {
    if (location.state?.seccion) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  const seccionAbierta = secciones.find((s) => s.id === abierta);

  const alTeclear = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setAbierta(id);
    }
  };

  return (
    <div className="pagina">
      <div className="contenedor">
        <header className="cabecera">
          <div className="identidad">
            <div className="foto-marco">
              <div className="foto-papel">
                <img src={foto} alt="Foto de Matías Landerer" />
              </div>
            </div>

            <div>
              <h1 className="nombre">Matías Landerer</h1>
              <p className="subtitulo">
                Estudiante de Ciencia de la Computación
              </p>
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
            </div>
          </div>

          <nav className="menu" aria-label="Secciones">
            {secciones.map((s) => (
              <button
                key={s.id}
                className={abierta === s.id ? "activo" : ""}
                onClick={() => setAbierta(s.id)}
              >
                {s.titulo}
              </button>
            ))}
          </nav>
        </header>

        <main className="mosaico">
          {secciones.map(({ id, titulo, Resumen }, i) => (
            <div
              key={id}
              ref={(el) => (cuadros.current[id] = el)}
              className={`cuadro cuadro-${id}`}
              role="button"
              tabIndex={0}
              onClick={() => setAbierta(id)}
              onKeyDown={(e) => alTeclear(e, id)}
            >
              <span className="cuadro-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2>{titulo}</h2>
              <div className="cuadro-resumen">
                <Resumen />
              </div>
              <span className="cuadro-mas">Ver más +</span>
            </div>
          ))}
        </main>

        <footer className="pie">
          © {new Date().getFullYear()} Matías Landerer Contreras
        </footer>

        {seccionAbierta && (
          <Panel
            key={seccionAbierta.id}
            seccion={seccionAbierta}
            obtenerOrigen={() =>
              cuadros.current[seccionAbierta.id]?.getBoundingClientRect() ??
              null
            }
            onCerrar={() => setAbierta(null)}
          />
        )}
      </div>
    </div>
  );
}