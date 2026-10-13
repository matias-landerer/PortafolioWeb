import { Link, useParams } from "react-router-dom";
import { proyectos } from "../data/proyectos.js";

function Volver() {
  return (
    <Link to="/" state={{ seccion: "proyectos" }} className="volver">
      ← Volver a proyectos
    </Link>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const proyecto = proyectos.find((p) => p.slug === slug);

  if (!proyecto) {
    return (
      <main className="contenedor proyecto-pagina">
        <Volver />
        <h1>Proyecto no encontrado</h1>
      </main>
    );
  }

  return (
    <main className="contenedor proyecto-pagina">
      <Volver />

      <p className="etiqueta">Proyecto personal · {proyecto.anio}</p>
      <h1>{proyecto.titulo}</h1>
      <p className="proyecto-descripcion">{proyecto.descripcion}</p>

      <section className="proyecto-bloque">
        <h2>Stack</h2>
        <ul className="tags">
          {proyecto.stack.map((tec) => (
            <li key={tec} className="tag">
              {tec}
            </li>
          ))}
        </ul>
      </section>

      <section className="proyecto-bloque">
        <h2>Aspectos destacados</h2>
        <ul className="lista">
          {proyecto.destacados.map((punto) => (
            <li key={punto}>{punto}</li>
          ))}
        </ul>
      </section>

      <a href={proyecto.repo} target="_blank" rel="noreferrer" className="btn">
        Ver repositorio en GitHub
      </a>
    </main>
  );
}