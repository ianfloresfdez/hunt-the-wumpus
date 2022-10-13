# WUMPUS GAME!

El proyecto ha sido creado con [Angular CLI] 14.2.5.

## Correr proyecto en servidor local de desarrollo

Para probar el proyecto en un servidor de desarrollo local debemos ejecutar 'ng serve' y se desplegará en 'http://localhost:4200/'. La aplicación se reiniciará si detecta cambios en el código.

## Compilar el proyecto

Para compilar se debe ejecutar la consulta 'ng build', esta guardará en la carpeta 'dist/' una versión compilada del proyecto.

## Probar unit testing

Para ejecutar y comprobar los tests unitarios deberemos ejecutar la consulta 'ng test'.

## Instrucciones para jugar

El objetivo del juego es recoger el oro y volver a la salida sin ser asesinados por el monstruo o precipitados en un pozo.
Para ello empezamos en la casilla superior izquierda, es nuestro punto de inicio y final, cuando tengamos el oro deberemos volver donde empecemos la partida. Tenemos lanzas para poder matar el monstruo, pero no podremos evitar de ninguna forma caer en un pozo si nos topamos con uno.

Al entrar al juego veremos una pantalla que nos pedirá tres parámetros:

- Longitud del tablero
- Número de pozos
- Número de lanzas

El tablero no puede ser más grande que 10x10 y debe ser, como mínimo, de tamaño 2x2.
El número de pozos ha sido limitado a que sea más pequeño o igual que la longitud del tablero, de esta forma evitaremos sobrepoblar el tablero de pozos.
No hay un número de lanzas definido, pero como mínimo deberemos tener una lanza para poder jugar.

Una vez completados los parámetros correctamente nos encontraremos en la pantalla principal del juego, donde nuestra partida habrá empezado.
Disponemos de 4 botones para poder controlar las direcciones de nuestras acciones:

- Izquierda
- Derecha
- Arriba
- Abajo

Para realizar cualquier acción (desplazarse o lanzar una lanza) debemos marcar una dirección, que será hacia donde ejecutara nuestra acción.
Disponemos de dos botones de acción:

- Avanzar (moverá el jugar hacia la casilla en la dirección que tengamos marcada)
- Lanzar lanza (lanzara una lanza que atravesara todas las casillas en la dirección que tengamos marcada)

Por pantalla tendremos diálogos de texto donde nos indicara que está pasando en nuestro entorno:

- Si estamos cerca del monstruo
- Si estamos cerca del oro
- Si estamos cerca de un pozo
- Si nos chocamos con un muro
- Si hemos muerto
- Si hemos matado al monstruo
- Si hemos encontrado el oro
- El número de lanzas restantes

Esta información se actualizará cuando vayamos realizando acciones.

Una vez hayamos perdido o ganado, el juego nos lo hará saber y podremos reiniciar el juego y volver al menú de parametrización de la partida para poder volver a jugar.

