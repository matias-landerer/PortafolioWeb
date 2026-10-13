export const proyectos = [
  {
    slug: "fake-news-detector",
    titulo: "Fake News Detector",
    anio: "2026",
    resumen:
      "App móvil/web que recibe el titular de una noticia y entrega un porcentaje de veracidad, con su justificación y las fuentes usadas.",
    descripcion:
      "Aplicación móvil/web que recibe el titular de una noticia y entrega un porcentaje de su veracidad, junto a una breve descripción de por qué se llegó a esa conclusión y una lista con las fuentes usadas. Permite saber de forma fácil y rápida si una noticia es real o falsa.",
    stack: ["Python", "Flask", "PostgreSQL", "Dart", "Flutter", "Docker", "AWS"],
    destacados: [
      "Arquitectura cliente-servidor.",
      "Integración de la API externa de Anthropic.",
      "Despliegue en AWS EC2 usando contenedores Docker.",
    ],
    repo: "https://github.com/matias-landerer/APP_FakeNews",
  },
];