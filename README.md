# Ecommerce
Este repositorio es la implementación de una API REST para un modelo simplificado de un ecommerce haciendo uso de Nodejs y consultas en SQL. Para el modelo utilizado en la base de datos tenemos en consideración a clientes, productos, categorias de los productos, ordenes y el carrito de compras.


&nbsp;


## Base de datos
Instalamos MySQL y creamos nuestra base de datos. Para revisar mejor el modelo de la base de datos puedes entrar al [diseño fisico](https://github.com/andrescaro16/Ecommerce/blob/main/diseñoFisicoEcommerce.sql "diseño fisico").


&nbsp;


## Instalamos las dependencias

Para esto, ejecutamos el siguiente comando. Este se encargará de instalar todas las librerías que requiere nuestro proyecto:

`npm install`


&nbsp;


## Iniciar nuestro servidor

Aquí, hacemos uso de nodemon, el cual nos permite reiniciar de manera automática nuestra aplicación Node luego de cualquier cambio realizado. Especialmente útil para cuando nos toca cerrar el puerto de manera repetida luego de alguna modificación al código.

Para ello, lo instalamos con:

`npm i -D nodemon`

Luego debemos modificar el fichero package.json para ejecutar nodemon en vez de node con **npm start**. Entonces en dicho fichero agregamos: 

`"start": "nodemon app/server.js"`

En caso de no funcionar, prueba con el siguiente comando:

`sudo npm install -g --force nodemon`

Finalmente para iniciar nuestra aplicación ejecutamos el siguiente comando:

`npm start`

En caso de no querer utilizar nodemon puedes ejecutar directamente el comando anterior.

Luego de esto, puedes visitar cada uno de los links con los parámetros requeridos por cada operación a continuación.


&nbsp;
&nbsp;

## Consultas

#### Total de dinero invertido en compras por parte de un cliente
http://localhost:3000/ecommerce/clientes/dinero_total/id_cliente

Parámetros - URI:

id_cliente

&nbsp;

#### Quien hizo la compra más alta en la historia de la tienda
http://localhost:3000/ecommerce/clientes/mayor_compra

Sin parámetros

&nbsp;

#### Total de ventas realizadas en un rango de fechas
http://localhost:3000/ecommerce/ordenes/ventas_fecha

Parámetros - Body:

fecha_uno

fecha_dos

&nbsp;

#### Nombre e email de clientes con ordenes en envío
http://localhost:3000/ecommerce/ordenes/envios

Sin parámetros

&nbsp;

#### Los productos en un carrito
http://localhost:3000/ecommerce/ordenes/productos_en_carrito/id_orden

Parámetros - URI:

id_orden

&nbsp;

#### Stock disponible de un producto por su nombre
http://localhost:3000/ecommerce/logistica/stock/nombre

Parámetros - URI:

nombre

&nbsp;

#### Cual es el producto más caro
http://localhost:3000/ecommerce/logistica/producto_mas_costoso

Sin parámetros

&nbsp;

#### Cual es el producto más barato
http://localhost:3000/ecommerce/logistica/producto_mas_barato

Sin parámetros

&nbsp;

#### Datos de orden para el repartidor
http://localhost:3000/ecommerce/logistica/repartidor/id_orden

Parámetros - URI:

id_orden

&nbsp;

#### Filtro de productos por nombre de categoria
http://localhost:3000/ecommerce/busqueda/categoria/nombre

Parámetros - URI:

nombre

&nbsp;

#### Filtro de productos por rango de precio y en orden del mismo
http://localhost:3000/ecommerce/busqueda/precio

Parámetros - Body:

precio_uno

precio_dos


&nbsp;
&nbsp;


## CRUD

#### Creación de cuenta de un cliente
POST

http://localhost:3000/ecommerce/clientes/registro

Parámetros - Body:

nombre

email

password

direccion

telefono

&nbsp;

#### Actualizamos el stock disponible de un producto
PUT

http://localhost:3000/ecommerce/logistica/actualizar_stock

Parámetros - Body:

stock

id_producto

&nbsp;

#### Eliminamos un producto siempre que no se encuentre referenciado en orden_detalles por integridad
DELETE

http://localhost:3000/ecommerce/logistica/eliminar_producto

Parámetros - Body:

id_producto


&nbsp;
&nbsp;


## Operaciones

#### Inicio de sesión de un cliente
http://localhost:3000/ecommerce/clientes/login?email=email&password=password

Parámetros - URI:

email

password

&nbsp;

#### Cierre de sesión de un cliente
http://localhost:3000/ecommerce/clientes/logout/id_cliente

Parámetros - URI:

id_cliente

&nbsp;

#### Pasar cuenta de cliente a inactivo (cerrar cuenta)
http://localhost:3000/ecommerce/clientes/cerrar_cuenta/id_cliente

Parámetros - URI:

id_cliente

&nbsp;

#### Breve historial de ordenes del cliente con su respectivo valor
http://localhost:3000/ecommerce/clientes/historial/id_cliente

Parámetros - URI:

id_cliente

&nbsp;

#### Todas las ordenes de un cliente
http://localhost:3000/ecommerce/ordenes/qorder/id_orden

Parámetros - URI:

id_orden

&nbsp;

#### Crear carrito

##### Crear carrito I
Validamos si el usuario ya cuenta con un carrito

http://localhost:3000/ecommerce/ordenes/crear_carrito_uno/id_cliente

Parámetros - URI:

id_cliente

##### Crear carrito II
Creamos el carrito (hacer solo en caso de crear_carrito_uno permitirlo primero)

http://localhost:3000/ecommerce/ordenes/crear_carrito_dos/id_cliente

Parámetros - URI:

id_cliente

&nbsp;

#### Agregamos un producto al carrito creado
http://localhost:3000/ecommerce/ordenes/agregar_producto_carrito

Parámetros - Body:

cantidad

id_producto

id_orden

&nbsp;

#### Modificamos la cantidad de algún producto en el carrito
http://localhost:3000/ecommerce/ordenes/modificar_cantidad_producto

Parámetros - Body:

cantidad

id_producto

id_orden

&nbsp;

#### Borramos algún producto del carrito
http://localhost:3000/ecommerce/ordenes/borrar_producto_carrito/id_producto/id_orden

Parámetros - URI:

id_producto

id_orden

&nbsp;

#### Realizar la compra

##### Realizar compra I
Calculamos el total de la compra

http://localhost:3000/ecommerce/ordenes/compra_uno/id_orden

Parámetros - URI:

id_orden

##### Realizar compra II
Se efectúa la compra. Actualizamos el total con el calculado en compra_uno (ingresar manual), direccion_entrega y el estado pasa de 'carrito' a 'envio'

http://localhost:3000/ecommerce/ordenes/compra_dos

Parámetros - Body:

total

direccion_entrega

id_orden

##### Realizar compra III
Actualizamos la orden de 'envio' a 'entregado' cuando se haya completado la entrega

http://localhost:3000/ecommerce/ordenes/compra_tres/id_orden

Parámetros - URI:

id_orden

&nbsp;

#### Vaciamos el carrito
http://localhost:3000/ecommerce/ordenes/vaciar_carrito/id_orden

Parámetros - URI:

id_orden