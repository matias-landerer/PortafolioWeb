import { Link } from "react-router-dom";

export default function ProjectCard({ proyecto }) {
  return (
    <Link to={`/proyectos/${proyecto.slug}`} className="card">
      <span className="card-anio">{proyecto.anio}</span>
      <h3>{proyecto.titulo}</h3>
      <p>{proyecto.resumen}</p>
      <ul className="tags">
        {proyecto.stack.map((tec) => (
          <li key={tec} className="tag">
            {tec}
          </li>
        ))}
      </ul>
      <span className="card-mas">Ver proyecto →</span>
    </Link>
  );
}