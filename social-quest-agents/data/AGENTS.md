# AGENTS.md — data

## Responsabilidad
Gestionar únicamente el contenido del evento y de los desafíos.

## Archivos
- `event.js`: datos del evento (nombre, subtítulo).
- `challenges.js`: lista de desafíos.

Usar `.js` (no `.json`): se cargan con `<script>` clásico y funcionan aunque se abra `index.html` directamente, sin servidor y sin `fetch`.

Cada archivo expone una sola variable global:
```js
window.SOCIAL_QUEST_EVENT = { name: "Social de Primavera", subtitle: "Un desafío, una noche" };
window.SOCIAL_QUEST_CHALLENGES = [ /* ... */ ];
```

## Formato de desafío
Obligatorios:
- `id`: único, con el formato `<categoría>-<número de 2 dígitos>` (ej. `foto-01`). No reutilizar ni renumerar ids existentes: el progreso guardado en `localStorage` depende de ellos.
- `text`: una frase, máximo ~110 caracteres, en segunda persona con voseo (`Sacate`, `Bailá`, `Encontrá`).
- `category`: una de las categorías de abajo.

Opcionales:
- `difficulty`: `facil` | `media` | `dificil`.
- `icon`: un emoji. Es decorativo: la interfaz no debe depender de él.

Ejemplo:
```js
{
  id: "foto-01",
  text: "Sacate una foto con tres personas que no estén en tu mesa (si se suman con ganas).",
  category: "foto",
  difficulty: "media",
  icon: "📸"
}
```

## Categorías
- `baile`: moverse en la pista.
- `social`: conocer gente nueva y charlar.
- `foto`: fotos con el celular propio.
- `grupo`: juntar varias personas para algo en común.
- `creatividad`: inventar, actuar, contar.
- `random`: misiones de búsqueda o curiosas.

## Dificultad
- `facil`: se cumple en menos de un minuto y sin exponerse (apto para personas tímidas).
- `media`: requiere hablar con alguien nuevo o hacer algo visible.
- `dificil`: requiere coordinar varias personas o animarse frente a otros.

Mantener al menos la mitad de los desafíos en `facil` o `media`.

## Tono
- Divertido.
- Social.
- Respetuoso.
- Fácil de entender.
- Realizable durante una fiesta, sin materiales extra.

## Seguridad y convivencia
No incluir desafíos que:
- humillen o ridiculicen a alguien (ni a quien lo cumple ni a otros);
- obliguen contacto físico (abrazos, chocar manos, trencito, cargar a alguien);
- presionen situaciones románticas;
- impliquen alcohol, apuestas o conductas riesgosas (subirse a muebles, correr en la pista);
- expongan información personal (dirección, teléfono, redes, colegio exacto);
- filmen o fotografíen a alguien sin su consentimiento;
- interrumpan al DJ, al staff o a otros invitados;
- puedan generar conflicto o incomodidad seria.

Cuando un desafío involucra a otras personas, debe quedar claro que pueden decir que no (ej. `si se suman`, `con su permiso`).

## Calidad
- Evitar desafíos casi idénticos.
- Una sola acción principal por desafío.
- Que se pueda saber claramente cuándo está cumplido.
- Preferir desafíos que incentiven integración entre grupos.
