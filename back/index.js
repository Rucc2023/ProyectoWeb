const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

const database = "formu_bd"
const user = "root"
const host = "localhost"
const port = "3312"
const password = "12345"

const db = mysql.createConnection({
    host,
    user,
    password,
    port,
    database,
});

db.connect((erro) => {
    if (erro) throw erro;
    else console.log("Conexión exitosa");
})

const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());
app.listen(PORT, () => {
    console.log("Listening on 3001");
});

app.get('/obtenerDatos', (req, res) => {
    db.query("SELECT * FROM estudiante", (err, result) => {
        if (err){
            res.send({
                status: 400,
                message: err
            });
        }else{
            res.send({
                status: 200,
                message: "Datos obtenidos con éxito",
                data: result
            });
        }
    })
});


app.post('/enviarDatos', (req, res) => {
    const documento = req.body.documento;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    db.query(`INSERT INTO estudiante (documento, nombre, apellido, telefono, correo) VALUES(?, ?, ?, ?, ?);`, [documento, nombre, apellido, telefono, correo], (err, result) => {
        if (err) {
            res.send({
                status: 400, 
                message: err
            });
        } else {
            res.send({
                status: 201,
                message: "Estudiante añadido con éxito",
                data: result
            });
        }
    });
});

app.put('/actualizarDatos', (req, res) => {
    const id = req.body.id;
    const documento = req.body.documento;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    db.query(`UPDATE estudiante SET documento=?, nombre=?, apellido=?, telefono=?, correo=? WHERE id=?;`, [documento, nombre, apellido, telefono, correo, id], (err, result) => {
        if (err) {
            res.send({
                status: 400, 
                message: err
            });
        } else {
            res.send({
                status: 201,
                message: "Estudiante actualizado con éxito",
                data: result
            });
        }
    });
});

app.delete('/eliminarAlumno', (req, res) => {
    const id = req.body.id;

    db.query(`DELETE FROM estudiantes WHERE id=?`, [id], (err, result) => {
        if (err) {
            res.send({
                status: 400, 
                message: err
            });
        } else {
            res.send({
                status: 201,
                message: "Estudiante eliminado con éxito",
                data: result
            });
        }
    });
});
