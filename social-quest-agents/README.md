# Social Quest — AGENTS setup

Este paquete contiene los archivos `AGENTS.md` para orientar a Codex u otro agente de código durante la construcción de la mini web de desafíos para una social.

## Jerarquía
- `/AGENTS.md`: reglas generales del proyecto.
- `/src/AGENTS.md`: reglas de implementación frontend.
- `/src/js/AGENTS.md`: lógica JavaScript.
- `/src/css/AGENTS.md`: diseño y responsive.
- `/data/AGENTS.md`: estructura y criterios para desafíos.
- `/docs/AGENTS.md`: documentación.
- `/public/AGENTS.md`: recursos estáticos.

La idea es que el agente lea primero el archivo raíz y luego el `AGENTS.md` más cercano al archivo que vaya a modificar.

## Contenido incluido
- `data/event.js`: nombre y subtítulo del evento.
- `data/challenges.js`: 62 desafíos en 6 categorías (baile, social, foto, grupo, creatividad, random) con dificultad `facil`/`media`/`dificil`.
