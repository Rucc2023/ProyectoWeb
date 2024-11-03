import { useState, useEffect } from "react";
import Formulario from "./assets/components/Formulario";
import ListaEstudiantes from "./assets/components/ListaEstudiantes";

const App = () => {

  const [estudiantes, setEstudiantes] = useState([]);
  const [estudiante, setEstudiante] = useState([]);

  useEffect(() => {
    const obtenerDatos = async() => {
      const res = await fetch("http://localhost:3001/obtenerDatos");
      const data = await res.json();
      setEstudiantes(data.data);
    }
    obtenerDatos();
  }, []);

  const borrar = async(id) => {
    if(confirm("Desea eliminarlo?")){
      const nuevo = estudiantes.filter(est => est.id !== id);
      setEstudiantes(nuevo);

      const res = await fetch("http://localhost:3001/eliminarAlumno", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id})
      });

      if(res.status === 201) alert(res.message);
    }
  }
  return (
    <div className="container text-center" style={{width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div className="row mt-3">
        <Formulario setEstudiante={setEstudiante} estudiante={estudiante} setEstudiantes={setEstudiantes} estudiantes={estudiantes}/>
        <ListaEstudiantes setEstudiante={setEstudiante} borrar={borrar} estudiantes={estudiantes} estudiante={estudiante}/>
      </div>
    </div>
  );
};

export default App;