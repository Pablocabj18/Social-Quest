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

## Selección aleatoria
1. Obtener desafíos no vistos.
2. Excluir el desafío actual si es posible.
3. Elegir uno al azar.
4. Si no quedan, vaciar historial de vistos y comenzar nuevamente.

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
