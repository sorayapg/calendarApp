# Guía de Uso de CalendarApp

Esta guía describe cómo utilizar la interfaz del frontend de CalendarApp desde el punto de vista de la persona usuaria, incluyendo autenticación, gestión de eventos y navegación por el calendario.

No es necesario conocimiento técnico previo para seguir esta guía.

## 1. Acceso inicial

Esta pantalla actúa como punto de entrada a la aplicación.
Al abrir la aplicación verás una pantalla con:

- el branding de CalendarApp en la parte superior izquierda
- el selector de tema claro u oscuro en la parte superior derecha
- dos paneles centrales: ingreso y registro

## 2. Cómo registrarse

1. En el panel derecho, completa nombre, correo, contraseña y repetición de contraseña.
2. Pulsa `Crear cuenta`.
3. Si las contraseñas no coinciden, aparecerá un mensaje de error.
4. Si el registro es correcto, se iniciará sesión automáticamente y accederás al calendario.

## 3. Cómo iniciar sesión

1. En el panel izquierdo, introduce tu correo y contraseña.
2. Pulsa `Login`.
3. Si las credenciales son válidas, accederás al calendario.

## 4. Cómo cambiar entre modo claro y oscuro

1. Usa el botón de tema de la parte superior derecha en la pantalla de acceso.
2. Una vez dentro del calendario, puedes seguir cambiando el tema desde la barra superior.
3. La aplicación guarda tu preferencia y la reaplica automáticamente al volver a entrar.

## 5. Cómo moverse por el calendario

En la vista principal encontrarás:

- botón `Hoy` para volver a la fecha actual
- flechas de navegación para avanzar o retroceder
- selector de vistas: `Mes`, `Semana`, `Día` y `Agenda`

La última vista utilizada queda guardada para la próxima vez.

## 6. Cómo crear eventos

El comportamiento es coherente en todas las vistas del calendario (mes, semana y día).

### Opción A: botón flotante

1. Pulsa el botón `+` de la esquina inferior derecha.
2. Se abrirá el modal de evento.
3. Completa fecha de inicio, fecha de fin, título y notas.
4. Pulsa `Guardar`.

### Opción B: desde el calendario

- En escritorio: haz clic sobre una celda o franja vacía.
- En tablet o móvil: haz tap sobre una celda o franja vacía.

Esto abre el modal con una fecha inicial ya preparada para crear el evento.

## 7. Cómo editar eventos

1. Haz clic o tap una sola vez sobre un evento existente.
2. El modal se abrirá con la información precargada.
3. Modifica los campos necesarios.
4. Pulsa `Guardar`.

## 8. Cómo eliminar eventos

1. Esto evita la necesidad de doble clic, mejorando la rapidez de interacción.
2. Selecciona un evento.
3. Cuando haya un evento seleccionado, aparecerá el botón flotante de papelera en la esquina inferior izquierda.
4. Pulsa ese botón para eliminarlo.

## 9. Cómo usar cada vista

### Vista mensual

- útil para revisar el calendario completo del mes
- permite crear eventos desde un día vacío
- muestra los eventos resumidos por fecha

### Vista semanal

- útil para trabajar por franjas horarias
- permite crear eventos desde una hora concreta
- facilita editar un evento existente con un solo clic o tap

### Vista diaria

- muestra una sola jornada con más detalle
- es la vista más precisa para ajustar horas de inicio y fin

### Vista agenda

- muestra los eventos en formato listado
- sirve para revisar rápidamente los próximos eventos

## 10. Uso en escritorio, tablet y móvil

- La interacción táctil ha sido adaptada para evitar conflictos con el scroll natural del dispositivo.
- En escritorio puedes interactuar con clic sobre celdas, franjas y eventos.
- En tablet y móvil la interfaz adapta la interacción táctil para crear eventos con tap sin romper el desplazamiento natural.
- La pantalla de acceso ajusta espaciados y tamaños para pantallas más pequeñas.
- El modal y los botones principales mantienen contraste y legibilidad en ambos temas.

## 11. Recomendaciones de uso

- Si cambias entre modo claro y oscuro, la preferencia se conserva automáticamente.
- Si vas a crear varios eventos, la vista semanal o diaria suele ser la más cómoda.
- Si no ves el botón de eliminar, primero selecciona un evento.
- Si trabajas desde móvil, utiliza preferentemente la vista diaria o semanal para mayor precisión.

## 12. Alcance de esta guía

Esta guía cubre únicamente el uso del frontend de CalendarApp. La configuración y lógica interna del backend no forman parte de este documento.

## 13. Consideraciones finales

CalendarApp está diseñada para ofrecer una experiencia coherente entre dispositivos, priorizando la facilidad de uso y la interacción directa con el calendario.