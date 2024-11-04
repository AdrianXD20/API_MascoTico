const { resolve } = require('path');
const db= require('../database/conexion');
const { rejects } = require('assert');

class extraRepository{
    constructor(db){
        this.db=db;
    }

    obtenerExtra(){
        return new Promise((resolve, rejects)=>{
            this.db.query('SELECT * FROM caracteristcas_extras', (err, results)=>{
                if(err){
                    console.error('Error al obtener las caracteristicas Extra: ', err)
                    return rejects(err)
                }
                resolve(results)
                
            });
        });
    }

    obtenerExtraPorId(Id){
        return new Promise((resolve, rejects)=>{
            this.db.query('SELECT * FROM caracteristicas_extras WHERE id= ?',[id] , (err, results)=>{
                if(err){
                    console.error('Error en la busqueda de la caracteritica Extra: ', err)
                    return rejects(err)
                }
                resolve(results)
            });
        });
    }

    crearExtra(nuevoExtra){
        return new Promise ((resolve, rejects)=>{
            this.db.query('INSERT INTO caracteristicas_extras SET ?', nuevoExtra, (err, results)=>{
                if(err){
                    console.error('Error al crear una caracteristica extra: ', err)
                    return rejects(err)
                }
                resolve(results)
            })
        })
    }

    actualizarExtra(Id, datosActualizados){
        return new Promise ((resolve, rejects) => {
            this.db.query('UPDTAE caracteristicas_extras SET ? WHERE id= ?', [datosActualizados, Id], (err,results)=>{
                if(err){
                    console.error('Error al actualizar los datos: ', err);
                    return rejects(err)
                }
                resolve(results)
            });
        });
    }

    eliminarExtra(Id){
        return new Promise((resolve, rejects)=>{
            this.db.query('DELETE FROM caracteristicas_extras WHERE id= ?', [Id], (err,results)=>{
                if(err){
                    console.error('Error al Eliminar los datos: ', err);
                    return rejects(err)
                }
                resolve(results)
            })
        })
    }
}



module.exports= extraRepository;