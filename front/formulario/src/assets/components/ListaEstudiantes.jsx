import Estudiante from "./Estudiante.jsx";

const ListaEstudiantes = ({ estudiantes, borrar, setEstudiante }) => {
  return (
    <div className="col-md-7 mt-2">
      <div className="card">
        <div className="card-header">Lista de estudiantes</div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Documento</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Correo</th>
                <th scope="col">Teléfono</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.length > 0 ? (
                estudiantes.map((est) => (
                  <Estudiante
                    key={est.id}
                    setEstudiante={setEstudiante}
                    borrar={borrar}
                    estudiante={est}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} scope="row">No hay estudiantes</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListaEstudiantes;
