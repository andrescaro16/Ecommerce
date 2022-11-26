const conexion = require("../conexion");

module.exports = {
    
    //  - - - - - - - - - - - - - - - - - - - CONSULTAS 1.1 - - - - - - - - - - - - - - - - - - - 

    //Clientes

    //Total de dinero invertido en compras por parte de un cliente
    dinero_total(id_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query("SELECT SUM(total) AS Total_Compras FROM ordenes WHERE id_cliente = ?",
                [id_cliente],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results[0]);
                });
        });
    },
    
    //Quien hizo la compra más alta en la historia de la tienda
    mayor_compra() {
        return new Promise((resolve, reject) => {
            conexion.query("SELECT id_cliente, id_orden, total FROM ordenes WHERE total IN(SELECT MAX(total) FROM ordenes)",
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results[0]);
                });
        });
    },


    //Ordenes

    //Total de ventas realizadas en un rango de fechas
    ventas_fecha(fecha_uno, fecha_dos) {
        return new Promise((resolve, reject) => {
            conexion.query("SELECT * FROM ordenes WHERE fecha BETWEEN ? AND ?",
                [fecha_uno, fecha_dos],
                (err, results) => {
                    if (err) {
                        console.log("err=",err) 
                        reject(err);
                    }
                    else resolve(results);
                });
        });
    },

    //Nombres e email de clientes con ordenes en envío
    envios() {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT c.nombre AS Cliente, c.email AS Email, o.id_orden FROM ordenes AS o INNER JOIN clientes AS c ON(o.id_cliente = c.id_cliente) WHERE o.estado = "envio"',
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },

    //Los productos en un carrito
    productos_en_carrito(id_orden) {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT p.nombre, od.cantidad FROM orden_detalles AS od INNER JOIN productos AS p ON(p.id_producto = od.id_producto) INNER JOIN ordenes AS o ON(od.id_orden = o.id_orden) WHERE od.id_orden = ? AND o.estado = "carrito"',
                [id_orden],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },


    //Logistica

    //Stock disponible de un producto por su nombre
    stock_producto(nombre) {
        return new Promise((resolve, reject) => {
            conexion.query("SELECT id_producto, nombre, stock FROM productos WHERE nombre = ?",
                [nombre],
                (err, results) => {
                    if (err) {
                        console.log("err=",err) 
                        reject(err);
                    }
                    else resolve(results);
                });
        });
    },

    //Cual es el producto más caro
    producto_mas_costoso() {
        return new Promise((resolve, reject) => {
            conexion.query("SELECT id_producto, nombre, precio FROM productos WHERE precio IN(SELECT MAX(precio) FROM productos)",
                (err, results) => {
                    if (err) {
                        console.log("err=",err) 
                        reject(err);
                    }
                    else resolve(results);
                });
        });
    },

    //Cual es el producto más barato
    producto_mas_barato() {
        return new Promise((resolve, reject) => {
            conexion.query("SELECT id_producto, nombre, precio FROM productos WHERE precio IN(SELECT MIN(precio) FROM productos)",
                (err, results) => {
                    if (err) {
                        console.log("err=",err) 
                        reject(err);
                    }
                    else resolve(results);
                });
        });
    },

    //Datos de orden para el repartidor
    repartidor(id_orden) {
        return new Promise((resolve, reject) => {
            conexion.query("SELECT o.id_orden, c.nombre, c.telefono, o.direccion_entrega, o.total FROM ordenes AS o INNER JOIN clientes AS c ON(o.id_cliente = c.id_cliente) WHERE o.id_orden = ?",
                [id_orden],
                (err, results) => {
                    if (err) {
                        console.log("err=",err) 
                        reject(err);
                    }
                    else resolve(results[0]);
                });
        });
    },


    //Busqueda
    
    //Filtro de productos por nombre de categoria
    categoria(nombre) {
        return new Promise((resolve, reject) => {
            conexion.query("SELECT * FROM productos AS p INNER JOIN categorias AS c ON(p.id_categoria = c.id_categoria) WHERE c.nombre = ?",
                [nombre],
                (err, results) => {
                    if (err) {
                        console.log("err=",err) 
                        reject(err);
                    }
                    else resolve(results);
                });
        });
    },

    //Filtro de productos por rango de precio y en orden del mismo
    precio(precio_uno, precio_dos) {
        return new Promise((resolve, reject) => {
            conexion.query("SELECT * FROM productos WHERE precio BETWEEN ? AND ? ORDER BY precio",
                [precio_uno, precio_dos],
                (err, results) => {
                    if (err) {
                        console.log("err=",err) 
                        reject(err);
                    }
                    else resolve(results);
                });
        });
    },



    // - - - - - - - - - - - - - - - - - - - CRUD 1.2 - - - - - - - - - - - - - - - - - - -


    //Clientes - post
    
    //Creación de cuenta de un cliente
    registro_cliente(nombre, email, password, direccion, telefono){
        return new Promise((resolve, reject) => {
            conexion.query("INSERT INTO clientes(nombre, email, password, direccion, telefono) VALUES(?, ?, ?, ?, ?)",
            [nombre, email, password, direccion, telefono],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else resolve(results);
                });
        });
    },


    //Logistica - put
    
    //Actualizamos el stock disponible de un producto
    actualizar_stock(stock, id_producto){
        return new Promise((resolve, reject) => {
            conexion.query("UPDATE productos SET stock = ? WHERE id_producto = ?",
            [stock, id_producto],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else resolve(results);
                });
        });
    },


    //Logistica - delete
    
    //Eliminamos un producto siempre que no se encuentre referenciado en orden_detalles por integridad
    eliminar_producto(id_producto){
        return new Promise((resolve, reject) => {
            conexion.query("DELETE FROM productos WHERE id_producto = ?",
            [id_producto],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else resolve(results);
                });
        });
    },



    //  - - - - - - - - - - - - - - - - - - - OPERACIONES 1.3 - - - - - - - - - - - - - - - - - - -


    //Clientes
    
    //Inicio de sesión de un cliente
    login(email,password) {
        return new Promise((resolve, reject) => {
            conexion.query("SELECT id_cliente FROM clientes WHERE email = ? AND password = ?",
                [email,password],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results[0]);
                });
        });
    },

    //Cierre de sesión de un cliente
    logout(id_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query("SELECT nombre FROM clientes WHERE id_cliente = ?",
                [id_cliente],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results[0]);
                });
        });
    },

    //Pasar cuenta de cliente a inactivo
    cerrar_cuenta(id_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query('UPDATE clientes SET activo = "inactivo" WHERE id_cliente = ?',
                [id_cliente],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },

    //Breve historial de ordenes del cliente con su respectivo valor
    historial(id_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT id_orden, estado, total FROM ordenes WHERE id_cliente = ?',
                [id_cliente],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },


    //Ordenes

    //Todas las ordenes de un cliente
    qorder(id_orden) {
        return new Promise((resolve, reject) => {
            conexion.query("SELECT * FROM ordenes WHERE id_orden = ?",
                [id_orden],
                (err, results) => {
                    if (err) {
                        console.log("err=",err) 
                        reject(err);
                    }
                    else resolve(results[0]);
                });
        });
    }, 

    //Validamos si el usuario ya cuenta con un carrito
    crear_carrito_uno(id_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM ordenes WHERE id_cliente = ? AND estado = "carrito";',
                [id_cliente],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    },

    //Creamos el carrito (hacer solo en caso de crear_carrito_uno permitirlo)
    crear_carrito_dos(id_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query('INSERT INTO ordenes(direccion_entrega, total, id_cliente) VALUES("[0, -0]", 0, ?)',
                [id_cliente],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    },

    //Agregamos un producto al carrito creado
    agregar_producto_carrito(cantidad, id_producto, id_orden) {
        return new Promise((resolve, reject) => {
            conexion.query('INSERT INTO orden_detalles(cantidad, id_producto, id_orden) VALUES(?, ?, ?)',
                [cantidad, id_producto, id_orden],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    },

    //Modificamos la cantidad de algún producto en el carrito
    modificar_cantidad_producto(cantidad, id_producto, id_orden) {
        return new Promise((resolve, reject) => {
            conexion.query('UPDATE orden_detalles SET cantidad = ? WHERE id_producto = ? AND id_orden = ?',
                [cantidad, id_producto, id_orden],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    },

    //Borramos algún producto del carrito
    borrar_producto_carrito(id_producto, id_orden) {
        return new Promise((resolve, reject) => {
            conexion.query('DELETE FROM orden_detalles WHERE id_orden = ? AND id_producto = ?',
                [id_orden, id_producto],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    },

    //Calculamos el total de la compra
    compra_uno(id_orden) {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT id_orden, SUM(precio * cantidad) as total FROM orden_detalles as od JOIN productos as p ON(p.id_producto=od.id_producto) WHERE id_orden = ?',
                [id_orden],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    },

    //Se efectúa la compra. Actualizamos el total con el calculado en compra_uno (ingresar manual), direccion_entrega y el estado pasa de 'carrito' a 'envio'
    compra_dos(total, direccion_entrega, id_orden) {
        return new Promise((resolve, reject) => {
            conexion.query('UPDATE ordenes SET total = ?, direccion_entrega = ?, estado = "envio" WHERE id_orden = ?',
                [total, direccion_entrega, id_orden],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    },

    //Actualizamos la orden de 'envio' a 'entregado'
    compra_tres(id_orden) {
        return new Promise((resolve, reject) => {
            conexion.query('UPDATE ordenes SET estado = "entregado" WHERE id_orden = ?',
                [id_orden],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    },

    //Vaciamos el carrito
    vaciar_carrito(id_orden) {
        return new Promise((resolve, reject) => {
            conexion.query('DELETE FROM orden_detalles WHERE id_orden = ?',
                [id_orden],
                (err, results) => {
                    if (err) {
                        console.log("err=",err)
                        reject(err);
                    }
                    else {
                        console.log("results=",results) 
                        resolve(results);
                    }
                });
        });
    }
}