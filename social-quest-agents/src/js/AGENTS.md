# AGENTS.md — JavaScript

## Responsabilidad
Implementar la lógica de Social Quest.

## Funcionalidades
- Elegir desafío aleatorio.
- Evitar repetición inmediata.
- Mantener historial local de vistos.
- Registrar desafíos cumplidos localmente.
- Reiniciar el pool cuando todos hayan sido vistos.
- Actualizar la interfaz sin recargar la página.

## Estado sugerido
Mantener un estado simple con:
- `currentChallenge`
- `seenChallengeIds`
- `completedChallengeIds`

## localStorage
Usar claves con namespace, por ejemplo:
- `socialQuest.seen`
- `socialQuest.completed`

Validar el contenido leído desde `localStorage`. Si está corrupto, recuperar usando valores vacíos.

Ignorar ids guardados que ya no existan en `data/challenges.js` (puede pasar si se editan los desafíos entre eventos).

## Selección aleatoria
1. Obtener desafíos no vistos (excluyendo siempre el actual).
2. Si no quedan, vaciar historial de vistos y repetir el paso 1: el actual sigue excluido para no repetirlo inmediatamente.
3. Elegir uno al azar y agregarlo a vistos.
4. Si solo existe un desafío, mostrarlo igual (no entrar en bucle).

## Datos
- Leer `window.SOCIAL_QUEST_EVENT` y `window.SOCIAL_QUEST_CHALLENGES`.
- Si no existen o la lista está vacía, mostrar el estado de error recuperable, no una pantalla en blanco.

## DOM
- Centralizar selectores al inicio.
- Usar `addEventListener`.
- Evitar HTML generado con datos no confiables.
- Preferir `textContent` para mostrar desafíos.

## Código
- Funciones pequeñas.
- Evitar clases si no aportan claridad.
- No instalar librerías para resolver tareas triviales.
- No usar `alert()` para la experiencia principal.

## Animaciones
Controlar estados mediante clases CSS. JavaScript solo debe activar/desactivar dichas clases.
