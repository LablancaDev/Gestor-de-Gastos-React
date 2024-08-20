import React, { useContext, useState } from 'react'; // Importa React, useContext y useState desde React
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom para la navegación
import Context from '../contexto/Context'; // Importa el contexto personalizado

function Gastos() {
  // Usa useContext para acceder al contexto, obteniendo balanceGastosIngresos y handleAddGasto del mismo
  const { balanceGastosIngresos, handleAddGasto } = useContext(Context);
  
  // Obtiene el total de los gastos desde balanceGastosIngresos
  const gastosTotales = balanceGastosIngresos.gastos.total;

  // Estado para almacenar el tipo de gasto seleccionado en el select
  const [tipoGasto, setTipoGasto] = useState("");

  // Estado para almacenar el valor del input introducido por el usuario
  const [valorGasto, setValorGasto] = useState(0);

  // Maneja los cambios en el input de número, actualizando el estado valorGasto
  const handleInputChange = (e) => {
    setValorGasto(e.target.value);
  };

  // Maneja los cambios en el select, actualizando el estado tipoGasto
  const handleSelectChange = (e) => {
    setTipoGasto(e.target.value);
  };

  return (
    <div className='container-fluid contenedor-gastos mt-5'>
      {/* Link para volver a la página anterior */}
      <Link to={"/"}>
        <button className='btn btn-primary mt-5'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
          </svg>
          Volver
        </button>
      </Link>
      <h3 className='title text-center mt-5'>Mis Gastos</h3>
      <div className='capital_total'>
        {/* Muestra el total de los gastos */}
        <h3 className='text-warning bg-secondary p-2 rounded'>{gastosTotales} €</h3>
      </div>
      <div className='container gastos d-flex justify-content-center align-items-center' style={{ height: '40vh' }}>
        <div className='row w-100'>
          {/* Itera sobre los tipos de gastos (excluyendo el total) y los muestra dinámicamente */}
          {Object.keys(balanceGastosIngresos.gastos).filter(key => key !== 'total').map((tipo) => (
            <div className='col d-flex justify-content-center' key={tipo}>
              <div className='circle2 d-flex flex-column align-items-center'>
                <div className='text'>
                  {/* Capitaliza la primera letra del tipo de gasto y lo muestra */}
                  <h5>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h5>
                </div>
                <div className='imgs'>
                  {/* Muestra la imagen correspondiente al tipo de gasto */}
                  <img className='img-fluid' src={`../../public/imgs/${tipo}.png`} alt={tipo} />
                </div>
                {/* Muestra el valor del gasto correspondiente */}
                <p>{balanceGastosIngresos.gastos[tipo]} €</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='container-form text-center'>
        <label className='form-label fs-4' htmlFor="nuevo-gasto">Añadir gasto:</label>
        {/* Input para introducir el valor del nuevo gasto */}
        <input
          type="number"
          id='nuevo-gasto'
          className='form-control'
          onChange={handleInputChange}
          value={valorGasto}
        />
        {/* Select para elegir el tipo de gasto */}
        <select
          className='form-select mb-3 mt-2'
          onChange={handleSelectChange}
          value={tipoGasto}
        >
          <option value="">Selecciona el tipo de gasto</option>
          {/* Itera sobre los tipos de gastos (excluyendo el total) para crear opciones en el select */}
          {Object.keys(balanceGastosIngresos.gastos).filter(key => key !== 'total').map((tipo) => (
            <option key={tipo} value={tipo}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>
          ))}
        </select>
        {/* Botón para guardar el nuevo gasto */}
        <button onClick={() => handleAddGasto(tipoGasto, parseFloat(valorGasto))} className='btn btn-success'>Guardar</button>
      </div>
    </div>
  );
}

export default Gastos;
