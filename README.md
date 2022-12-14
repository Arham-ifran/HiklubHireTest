# HiklubHireTest
Pruebas de desarrollo de Hiklub para contratar freelances
 
Hola a todos, este repositorio es un conjunto de pruebas para contratarlos. Esto no es un concurso y no es una obligación hacerlo.

## Resumen

- Desarrolla componentes React usando la librería material ui
- Comprender los conceptos de análisis e interpretación datos trabajando con gráficos.

## Cómo enviar tu solución

- Crea un codesandbox con la solución
- Envía un mensaje privado con el enlace a este id `@patriciarules` de Telegram

## Pruebas a desarrollar

### Quiz

- Crea un componente usando las preguntas dadas, cada pregunta tiene 4 posibles respuestas (1 a 4). El usuario puede abandonar el quiz en cualquier momento y siempre que quiera regresar debe retormar en la última pregunta donde abandonó. El usuario no puede retroceder sobre preguntas ya respondidas. El cuestionario debe estar optimizado para SEO.

### Chart

-  Dispones de un array con 15 valores comprendidos del 1 al 4, también dispones de un algoritmo de transformación, el cual lo encontrarás en el código, con estos datos: crear un gráfico de tipo radar con 5 dimensiones la leyenda final debe estar en una escala porcentual. Por ejemplo, 3 equivale a 0% y 12 al 100%

### Extra

- El cuestionario tiene una duración de 15 preguntas, una vez finalice la última pregunta, el radar con el algoritmo de transformación aplicado debe aparecer en la pantalla mediante un diálogo o ventana emergente.


## Instalar Material ui

`npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps`
`npm install @mui/icons-material --legacy-peer-deps`

Si tu codesandbox te da problemas para instalar los paquetes y/o ejecutar, puedes hacer un downgrade de react a versión 17