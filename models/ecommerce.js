const conexion = require("../conexion");

module.exports = {
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
    }
}