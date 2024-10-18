const Error = (props) => {
    return (
        <div class="alert alert-danger" role="alert">
            <strong>Error:</strong> 
            {props.mensaje}
        </div>
    );
};

export default Error;