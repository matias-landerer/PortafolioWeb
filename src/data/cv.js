// Foto de perfil (ruta dentro de la carpeta public/)
export const foto = "/img/Perfil.jpg";

// Datos de contacto. "icono" es la ruta del logo dentro de public/
export const contacto = [
  {
    nombre: "Correo",
    texto: "landerermatias@gmail.com",
    url: "mailto:landerermatias@gmail.com",
    icono: "/icons/gmail.webp",
  },
  {
    nombre: "Teléfono",
    texto: "+56 9 4468 7332",
    url: "tel:+56944687332",
    icono: "/icons/phone.png",
  },
  {
    nombre: "LinkedIn",
    texto: "LinkedIn",
    url: "https://www.linkedin.com/in/mat%C3%ADas-landerer-contreras-2b1214323",
    icono: "/icons/linkedin.png",
  },
  {
    nombre: "GitHub",
    texto: "GitHub",
    url: "https://github.com/matias-landerer",
    icono: "/icons/github.svg",
  },
];

export const perfil =
  "Estudiante de Ciencias de la Computación con interés en infraestructura y arquitectura/desarrollo de software. Experiencia práctica a través de proyectos personales y roles académicos como ayudante universitario. Orientado al trabajo en equipo, con capacidad de comunicación técnica en español e inglés.";

export const educacion = [
  {
    titulo: "Licenciatura en Ingeniería en Ciencias de la Computación",
    institucion: "Pontificia Universidad Católica de Chile",
    lugar: "Santiago, Chile",
    fecha: "2025 – Actualidad",
    cursos: [
      "Sistemas Distribuidos",
      "Arquitectura de Sistemas de Software",
      "Sistemas Operativos y Redes",
      "Bases de Datos",
    ],
  },
];

export const experiencia = [
  {
    cargo: "Ayudante Universitario – Programación Avanzada",
    lugar:
      "Pontificia Universidad Católica de Chile · Departamento de Ciencias de la Computación",
    fecha: "Ago 2025 – Dic 2026",
    temas: ["OOP", "Programación funcional", "Networking"],
    tareas: [
      "Corrección y análisis de código en tareas avanzadas de programación.",
      "Identificación de errores lógicos y técnicos.",
      "Retroalimentación clara a estudiantes.",
      "Apoyo en tiempo real a estudiantes en resolución de dudas teóricas y técnicas.",
    ],
  },
];

export const habilidades = [
  { grupo: "Lenguajes", items: ["Python", "SQL", "Bash"] },
  { grupo: "Frameworks", items: ["Flask", "Flutter"] },
  { grupo: "Bases de datos", items: ["PostgreSQL"] },
  { grupo: "Herramientas", items: ["Git", "GitHub", "Linux", "Docker", "AWS"] },
  {
    grupo: "Paradigmas",
    items: ["APIs REST", "OOP", "Programación funcional"],
  },
];

export const idiomas = [
  { idioma: "Español", nivel: "Nativo" },
  {
    idioma: "Inglés",
    nivel: "Avanzado (B2–C1)",
    detalle: "Lectura técnica fluida, comunicación oral y escrita.",
  },
];

// Agrega aquí tus certificaciones cuando las tengas, por ejemplo:
// { nombre: "AWS Certified Cloud Practitioner", emisor: "Amazon Web Services", fecha: "2026" }
export const certificaciones = [];

export const actividades = [
  "Participación en taller de programación competitiva de la universidad (promedio 7.0).",
];