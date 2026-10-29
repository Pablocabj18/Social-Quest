# AGENTS.md — Social Quest

## Objetivo
Construir una mini web mobile-first para una social/fiesta juvenil. Los asistentes ingresan escaneando un QR y reciben un desafío aleatorio de la noche.

## Experiencia principal
1. El usuario abre la web desde un QR.
2. Ve el nombre del evento y una pantalla simple de bienvenida.
3. Presiona `Descubrir desafío`.
4. Se muestra un desafío aleatorio.
5. Puede marcarlo como `Cumplido` o pedir `Otro desafío`.
6. La experiencia debe ser rápida, divertida y clara desde celular.

## Alcance inicial
- HTML, CSS y JavaScript vanilla.
- Sin backend.
- Sin login.
- Sin base de datos.
- Desafíos cargados desde un archivo local.
- Persistencia liviana con `localStorage` cuando sea útil.
- Preparado para desplegar como sitio estático.

## Reglas globales
- Priorizar simplicidad.
- Mobile-first.
- No agregar dependencias salvo que sean estrictamente necesarias.
- No crear funcionalidades que no fueron pedidas.
- Mantener archivos pequeños y fáciles de entender.
- Evitar código duplicado.
- Mantener nombres de variables y funciones descriptivos.
- Usar español rioplatense (voseo) para textos visibles al usuario.
- Usar inglés o español consistentemente en nombres internos; preferencia: inglés para código.
- No guardar datos personales.
- No usar APIs externas para la funcionalidad principal.

## Estilo visual
- Moderno, juvenil y limpio.
- Sensación de evento nocturno/social, no de boliche agresivo.
- Alto contraste y botones grandes.
- Animaciones suaves y breves.
- La interfaz debe funcionar bien con una sola mano desde el celular.

## Comportamiento esperado
- No repetir inmediatamente el mismo desafío, tampoco al reiniciar el ciclo.
- Evitar repetir desafíos mientras haya otros disponibles.
- Un desafío salteado con `Otro desafío` cuenta como visto.
- Si se agotan, reiniciar el ciclo.
- Mostrar un contador simple de cumplidos (ej. `3 cumplidos`), solo local.
- Recordar en `localStorage` los desafíos vistos y cumplidos en ese dispositivo.
- Permitir reiniciar el progreso mediante una acción secundaria discreta.

## Accesibilidad
- Botones accesibles por teclado.
- Buen contraste.
- Tamaños de toque cómodos.
- No depender únicamente del color para comunicar estados.
- Respetar `prefers-reduced-motion`.

## Respuesta del agente
Cuando completes cambios, responder breve.
Formato preferido:
- `Listo.`
- `Terminado.`
- `Hecho: <resumen corto>`

No explicar detalles técnicos salvo que el usuario los pida.

## Estructura esperada
- `index.html`
- `src/css/styles.css`
- `src/js/app.js`
- `data/event.js` con el nombre del evento
- `data/challenges.js` con los desafíos (no `.json`: con `fetch` falla al abrir el archivo sin servidor)
- `public/` para imágenes, logos o íconos locales
- `docs/` para decisiones y contenido del evento

Antes de modificar una carpeta, leer el `AGENTS.md` más cercano dentro de esa carpeta si existe.
