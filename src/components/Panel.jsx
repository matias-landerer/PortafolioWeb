import { useEffect, useLayoutEffect, useRef, useState } from "react";

const DURACION = 400; // ms, igual que la transición en index.css

// Cuadro agrandado. Parte desde la posición del cuadro original
// y se expande hasta ocupar casi toda la pantalla.
export default function Panel({ seccion, obtenerOrigen, onCerrar }) {
  const [origen, setOrigen] = useState(() => obtenerOrigen());
  const [expandido, setExpandido] = useState(false);
  const [cerrando, setCerrando] = useState(false);
  const panelRef = useRef(null);
  const botonRef = useRef(null);

  const sinMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Primer cuadro: se pinta en la posición del cuadro original,
  // luego se expande (y el CSS anima la transición)
  useLayoutEffect(() => {
    panelRef.current.getBoundingClientRect(); // fuerza el layout inicial
    setExpandido(true);
  }, []);

  const cerrar = () => {
    if (cerrando) return;
    setOrigen(obtenerOrigen());
    setCerrando(true);
    setTimeout(onCerrar, sinMovimiento ? 0 : DURACION);
  };
  const cerrarRef = useRef(cerrar);
  cerrarRef.current = cerrar;

  // Bloquea el scroll de la página y permite cerrar con Escape
  useEffect(() => {
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    botonRef.current?.focus({ preventScroll: true });

    const alPresionar = (e) => {
      if (e.key === "Escape") cerrarRef.current();
    };
    window.addEventListener("keydown", alPresionar);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", alPresionar);
    };
  }, []);

  const abierto = expandido && !cerrando;

  const estilo =
    !abierto && origen
      ? {
          top: origen.top,
          left: origen.left,
          width: origen.width,
          height: origen.height,
        }
      : undefined;

  const clases = [
    "panel",
    abierto && "expandido",
    !origen && "sin-origen",
  ]
    .filter(Boolean)
    .join(" ");

  const { titulo, Detalle } = seccion;

  return (
    <>
      <div
        className={`fondo ${abierto ? "visible" : ""}`}
        onClick={cerrar}
      />
      <section
        ref={panelRef}
        className={clases}
        style={estilo}
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
      >
        <div className="panel-contenido">
          <header className="panel-cabecera">
            <h2>{titulo}</h2>
            <button
              ref={botonRef}
              className="cerrar"
              onClick={cerrar}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </header>
          <div className="panel-cuerpo">
            <Detalle />
          </div>
        </div>
      </section>
    </>
  );
}