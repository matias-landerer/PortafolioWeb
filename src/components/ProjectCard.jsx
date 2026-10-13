// Tarjeta de un proyecto. Al hacer click muestra su detalle dentro del mismo cuadro.
export default function ProjectCard({ proyecto, onSeleccionar }) {
  return (
    <button className="card" onClick={() => onSeleccionar(proyecto.slug)}>
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
    </button>
  );
}