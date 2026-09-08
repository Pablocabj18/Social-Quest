# AGENTS.md — src

## Responsabilidad
Contiene toda la implementación de la interfaz y la lógica del cliente.

## Reglas
- Separar presentación y comportamiento.
- No hardcodear listas largas de desafíos dentro de `app.js`.
- No introducir frameworks en esta versión.
- No realizar peticiones de red innecesarias.
- Mantener compatibilidad con navegadores móviles modernos.

## Prioridades
1. Correcto funcionamiento en celular.
2. Fluidez de interacción.
3. Código simple.
4. Diseño cuidado.
5. Escritorio como adaptación secundaria.

## Estados mínimos de UI
- bienvenida
- cargando/transición breve
- desafío visible
- desafío cumplido
- error recuperable

## No hacer
- No agregar registro de usuarios.
- No agregar rankings públicos.
- No agregar chat.
- No agregar tracking de ubicación.
- No recolectar nombres, teléfonos o correos.
