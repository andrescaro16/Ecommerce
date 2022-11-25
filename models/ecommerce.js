const conexion = require("../conexion");

module.exports = {
    
    //  - - - - - - - - - - - - - - - - - - - CONSULTAS - - - - - - - - - - - - - - - - - - - 

    //CLIENTES
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
    mayor_compra() {
        return new Promise((resolve, reject) => {
            conexion.query("SELECT id_cliente, id_orden, total FROM ordenes WHERE total IN(SELECT MAX(total) FROM ordenes)",
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results[0]);
                });
        });
    },

    //ORDENES
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
    crear_carrito(id_cliente) {
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
    envios() {
        return new Promise((resolve, reject) => {
            conexion.query('SELECT c.nombre AS Cliente, c.email AS Email, o.id_orden FROM ordenes AS o INNER JOIN clientes AS c ON(o.id_cliente = c.id_cliente) WHERE o.estado = "envio"',
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });
    },

    //LOGISTICA
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

    //BUSQUEDA
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


    // - - - - - - - - - - - - - - - - - - - CRUD - - - - - - - - - - - - - - - - - - -

    //Clientes - post
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
    }
}