const Estudiante = ({ estudiante, borrar, setEstudiante }) => {
    const { id, Ine, nombre, apellido, correo, telefono } = estudiante;
  
    return (
      <tr>
        <th scope="row">{Ine}</th>
        <td>{nombre}</td>
        <td>{apellido}</td>
        <td>{correo}</td>
        <td>{telefono}</td>
        <td>
          <button onClick={() => setEstudiante(estudiante)} className="btn btn-sm btn-primary">Editar</button>
          <button onClick={() => borrar(id)} className="btn btn-sm btn-danger mx-1">Eliminar</button>
        </td>
      </tr>
    );
  };
  
  export default Estudiante;
  