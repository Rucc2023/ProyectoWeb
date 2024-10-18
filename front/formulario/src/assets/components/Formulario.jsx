import { useEffect, useState } from 'react';
import Error from './Error';

const Formulario = ({setEstudiantes, estudiantes, estudiante, setEstudiante}) => {
  const [documento, setDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState(false);

  const enviarFormulario = async(e) => {
    e.preventDefault();

    if([documento, nombre, apellido, telefono, correo].includes("")){
      setError(true);
      return;
    }else{
      setError(false);
    }

    const obj = {documento, nombre, apellido, telefono, correo};
    if(estudiante.id){
      obj.id = estudiante.id;
      const otros = estudiantes.map(est => est.id === estudiante.id ? obj : est);
      setEstudiantes(otros);

      const res = await fetch("http://localhost:3001/actualizarDatos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })
      console.log(estudiante.id);

      if(res.status === 201)alert(res.message);

    }else{
      obj.id = getId();
      setEstudiantes([...estudiantes, obj]);

      const res = await fetch("http://localhost:3001/enviarDatos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })

      if(res.status === 201) alert(res.message);

      limpiarCampos();
    }
  }
  

  const getId = () => {
    let id = (Math.random().toString(36).substr(2) + Math.random().toString(36).substring(2) + Date.now().toString(36));
    return id;
  }

  const limpiarCampos = () => {
    setDocumento(""); //ver esto, no jalaba esto ;(
    setNombre("");
    setApellido("");
    setTelefono("");
    setCorreo("");
    setEstudiante({});
  }

  useEffect(() => {
    if(estudiante.id && estudiante.id !== ""){
      setDocumento(estudiante.documento);
      setNombre(estudiante.nombre);
      setApellido(estudiante.apellido);
      setTelefono(estudiante.telefono);
      setCorreo(estudiante.correo);
    }
  }, [estudiante]);

    return (
      <div className='col-md-5 mt-2'>
        <form onSubmit={enviarFormulario}>
          <div className='card' style={{backgroundColor: "#a41212"}}>
            <div className='card-header' style={{color: "white"}}>Formulario</div>
            { error && <Error otra="mas props" mensaje="Los campos son obligatorios"/> }
            <div className='card-body'>
              <div className='input-group mb-3'>
                <span className='input-group-text' id='basic-addon1'>
                  Documento:
                </span>
                <input
                  type='number'
                  className='form-control'
                  value={documento}
                  required
                  onChange={(e) => setDocumento(e.target.value)}
                  style={{backgroundColor: "#1a1515", color: "white"}}
                />
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text' id='basic-addon1'>
                  Nombre:
                </span>
                <input
                  type='text'
                  className='form-control'
                  value={nombre}
                  required
                  onChange={(e) => setNombre(e.target.value)}
                  style={{backgroundColor: "#1a1515", color: "white"}}
                />
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text' id='basic-addon1'>
                  Apellido:
                </span>
                <input
                  type='text'
                  className='form-control'
                  value={apellido}
                  required
                  onChange={(e) => setApellido(e.target.value)}
                  style={{backgroundColor: "#1a1515", color: "white"}}
                />
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text' id='basic-addon1'>
                  Teléfono:
                </span>
                <input
                  type='number'
                  className='form-control'
                  value={telefono}
                  required
                  onChange={(e) => setTelefono(e.target.value)}
                  style={{backgroundColor: "#1a1515", color: "white"}}
                />
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text' id='basic-addon1'>
                  Correo:
                </span>
                <input
                  type='email'
                  className='form-control'
                  value={correo}
                  required
                  onChange={(e) => setCorreo(e.target.value)}
                  style={{backgroundColor: "#1a1515", color: "white"}}
                />
              </div>
              <div className='d-grid'>
                <button type='submit' className='btn btn-success'>
                  {estudiante.id ? "Editar" : "Registrar"}
                </button>
                <input 
                  type='button' 
                  className='btn btn-warning my-2' 
                  value='Cancelar' 
                  onClick={limpiarCampos}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

export default Formulario;