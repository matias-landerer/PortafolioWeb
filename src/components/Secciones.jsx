import { Fragment, useEffect, useRef, useState } from "react";
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

// Contenido del cuadro de proyectos: muestra la lista o el detalle de uno
function Proyectos() {
  const [seleccionado, setSeleccionado] = useState(null);
  const ref = useRef(null);

  // Al cambiar entre lista y detalle, vuelve al inicio del cuadro
  useEffect(() => {
    ref.current?.closest(".panel-cuerpo")?.scrollTo(0, 0);
  }, [seleccionado]);

  const proyecto = proyectos.find((p) => p.slug === seleccionado);

  if (proyecto) {
    return (
      <div ref={ref} className="proyecto-detalle">
        <button className="volver" onClick={() => setSeleccionado(null)}>
          ← Volver a proyectos
        </button>

        <p className="etiqueta">Proyecto personal · {proyecto.anio}</p>
        <h3 className="proyecto-titulo">{proyecto.titulo}</h3>
        <p className="proyecto-descripcion">{proyecto.descripcion}</p>

        <div className="proyecto-bloque">
          <h4>Stack</h4>
          <Tags items={proyecto.stack} />
        </div>

        <div className="proyecto-bloque">
          <h4>Aspectos destacados</h4>
          <ul className="lista">
            {proyecto.destacados.map((punto) => (
              <li key={punto}>{punto}</li>
            ))}
          </ul>
        </div>

        <a href={proyecto.repo} target="_blank" rel="noreferrer" className="btn">
          Ver repositorio en GitHub
        </a>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <p className="detalle-intro">
        Haz click en un proyecto para ver todos sus detalles.
      </p>
      <div className="grid-proyectos">
        {proyectos.map((p) => (
          <ProjectCard key={p.slug} proyecto={p} onSeleccionar={setSeleccionado} />
        ))}
      </div>
    </div>
  );
}

// Cada sección tiene:
//   Resumen -> vista corta (no se usa en la portada actual)
//   Detalle -> lo que se ve con el cuadro agrandado
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
          <p className="resumen-fuerte">{p.titulo}</p>
          <p>{p.resumen}</p>
        </div>
      )),
    Detalle: Proyectos,
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