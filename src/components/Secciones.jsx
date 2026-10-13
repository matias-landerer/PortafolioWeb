import { Fragment } from "react";
import ProjectCard from "./ProjectCard.jsx";
import { proyectos } from "../data/proyectos.js";
import {
  contacto,
  perfil,
  educacion,
  experiencia,
  habilidades,
  idiomas,
  certificaciones,
  actividades,
} from "../data/cv.js";

function Tags({ items }) {
  return (
    <ul className="tags">
      {items.map((item) => (
        <li key={item} className="tag">
          {item}
        </li>
      ))}
    </ul>
  );
}

// Cada sección tiene:
//   Resumen -> lo que se ve dentro del cuadro
//   Detalle -> lo que se ve con el cuadro agrandado
// El orden de este arreglo es el orden del menú.
export const secciones = [
  {
    id: "perfil",
    titulo: "Perfil profesional",
    Resumen: () => <p>{perfil}</p>,
    Detalle: () => (
      <>
        <p className="detalle-intro">{perfil}</p>
        <div className="bloque">
          <h3>Datos</h3>
          <dl className="datos">
            <dt>Ubicación</dt>
            <dd>Santiago, Chile</dd>
            <dt>Carrera</dt>
            <dd>Ingeniería en Ciencias de la Computación · PUC</dd>
            {contacto.map((c) => (
              <Fragment key={c.nombre}>
                <dt>{c.nombre}</dt>
                <dd>
                  <a href={c.url} target="_blank" rel="noreferrer">
                    {c.texto}
                  </a>
                </dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </>
    ),
  },
  {
    id: "educacion",
    titulo: "Educación",
    Resumen: () =>
      educacion.map((e) => (
        <div key={e.titulo}>
          <p className="resumen-fuerte">{e.titulo}</p>
          <p>{e.institucion}</p>
          <p className="resumen-fecha">{e.fecha}</p>
        </div>
      )),
    Detalle: () =>
      educacion.map((e) => (
        <article key={e.titulo} className="bloque">
          <div className="item-cabecera">
            <h3>{e.titulo}</h3>
            <span className="item-fecha">{e.fecha}</span>
          </div>
          <p className="item-lugar">
            {e.institucion} · {e.lugar}
          </p>
          <h4>Cursos relevantes</h4>
          <Tags items={e.cursos} />
        </article>
      )),
  },
  {
    id: "experiencia",
    titulo: "Experiencia laboral",
    Resumen: () =>
      experiencia.map((x) => (
        <div key={x.cargo}>
          <p className="resumen-fuerte">{x.cargo}</p>
          <p className="resumen-fecha">{x.fecha}</p>
          <p>{x.lugar}</p>
          <ul className="lista">
            {x.tareas.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      )),
    Detalle: () =>
      experiencia.map((x) => (
        <article key={x.cargo} className="bloque">
          <div className="item-cabecera">
            <h3>{x.cargo}</h3>
            <span className="item-fecha">{x.fecha}</span>
          </div>
          <p className="item-lugar">{x.lugar}</p>
          <h4>Temas del curso</h4>
          <Tags items={x.temas} />
          <h4>Responsabilidades</h4>
          <ul className="lista">
            {x.tareas.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </article>
      )),
  },
  {
    id: "proyectos",
    titulo: "Proyectos personales",
    Resumen: () =>
      proyectos.map((p) => (
        <div key={p.slug}>
          <p className="resumen-fuerte">
            {p.titulo} <span className="resumen-fecha">· {p.anio}</span>
          </p>
          <p>{p.resumen}</p>
        </div>
      )),
    Detalle: () => (
      <>
        <p className="detalle-intro">
          Haz click en un proyecto para ver su página con todos los detalles.
        </p>
        <div className="grid-proyectos">
          {proyectos.map((p) => (
            <ProjectCard key={p.slug} proyecto={p} />
          ))}
        </div>
      </>
    ),
  },
  {
    id: "habilidades",
    titulo: "Habilidades técnicas",
    Resumen: () => (
      <Tags items={habilidades.flatMap((h) => h.items).slice(0, 10)} />
    ),
    Detalle: () => (
      <div className="habilidades">
        {habilidades.map(({ grupo, items }) => (
          <div key={grupo} className="habilidad-fila">
            <h3>{grupo}</h3>
            <Tags items={items} />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "extra",
    titulo: "Información adicional",
    Resumen: () => (
      <ul className="lista">
        {idiomas.map((i) => (
          <li key={i.idioma}>
            {i.idioma}: {i.nivel}
          </li>
        ))}
        {actividades.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
    ),
    Detalle: () => (
      <>
        <div className="bloque">
          <h3>Idiomas</h3>
          <ul className="lista">
            {idiomas.map((i) => (
              <li key={i.idioma}>
                <strong>{i.idioma}:</strong> {i.nivel}
                {i.detalle && ` – ${i.detalle}`}
              </li>
            ))}
          </ul>
        </div>

        {certificaciones.length > 0 && (
          <div className="bloque">
            <h3>Certificaciones</h3>
            <ul className="lista">
              {certificaciones.map((c) => (
                <li key={c.nombre}>
                  <strong>{c.nombre}</strong> · {c.emisor} · {c.fecha}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bloque">
          <h3>Actividades y reconocimientos</h3>
          <ul className="lista">
            {actividades.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </>
    ),
  },
];