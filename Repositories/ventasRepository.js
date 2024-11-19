
const db= require('../database/conexion');


class ventaRepository{
    constructor(db){
        this.db=db;
    }

    obtenerVentas(limit, offset){
        return new Promise((resolve, rejects)=>{
            this.db.query('SELECT * FROM ventas LIMIT ? OFFSET ?',[limit, offset], (err, results)=>{
                if(err){
                    console.error('Error al obtener las ventas: ', err)
                    return rejects(err)
                }
                resolve(results)
                
            });
        });
    }

    obtenerVentaPorId(Id){
        return new Promise((resolve, rejects)=>{
            this.db.query('SELECT * FROM ventas WHERE id= ?',[Id] , (err, results)=>{
                if(err){
                    console.error('Error en la busqueda de la venta: ', err)
                    return rejects(err)
                }
                resolve(results)
            });
        });
    }

    crearVenta(nuevaVenta){
        return new Promise ((resolve, rejects)=>{
            this.db.query('INSERT INTO ventas SET ?', nuevaVenta, (err, results)=>{
                if(err){
                    console.error('Error al crear una venta: ', err)
                    return rejects(err)
                }
                resolve(results)
            })
        })
    }

    actualizarVenta(Id, datosActualizados){
        return new Promise ((resolve, rejects) => {
            this.db.query('UPDATE ventas SET ? WHERE id= ?', [datosActualizados, Id], (err,results)=>{
                if(err){
                    console.error('Error al actualizar la venta:  ', err);
                    return rejects(err)
                }
                resolve(results.affectedRows > 0 ? {Id, ...datosActualizados} : null)
            });
        });
    }

    eliminarVenta(Id){
        return new Promise((resolve, rejects)=>{
            this.db.query('DELETE FROM ventas WHERE id= ?', [Id], (err,results)=>{
                if(err){
                    console.error('Error al Eliminar las: ventas ', err);
                    return rejects(err)
                }
                resolve(results.affectedRows > 0);
            })
        })
    }
}



module.exports= ventaRepository;