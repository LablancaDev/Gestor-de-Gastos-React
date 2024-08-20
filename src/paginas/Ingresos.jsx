import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Context from '../contexto/Context'

function Ingresos() {
  // Usa useContext para acceder al contexto, obteniendo balanceGastosIngresos y handleAddIngreso del mismo
  const { balanceGastosIngresos, handleAddIngreso } = useContext(Context);

  // Obtiene el total de los ingresos desde balanceGastosIngresos
  const ingresosTotales = balanceGastosIngresos.ingresos.total;

  const [nuevoIngreso, setNuevoIngreso] = useState('') // Estado para almacenar el valor del nuevo ingreso
  const [tipoIngreso, setTipoIngreso] = useState('') // Estado para almacenar el tipo de ingreso seleccionado

  // Función para manejar el cambio en el input del nuevo ingreso
  const handleInputChange = (e) => {
    setNuevoIngreso(e.target.value)
    console.log(e.target.value) // Muestra el valor actualizado
  }

  // Función para manejar el cambio en el select del tipo de ingreso
  const handleSelectChange = (e) => {
    setTipoIngreso(e.target.value)
    console.log(e.target.value) // Muestra el valor actualizado
  }

  // Función para manejar el clic en el botón "Guardar"
  const handleGuardarIngreso = () => {
    if (tipoIngreso && nuevoIngreso) {
      handleAddIngreso(tipoIngreso, parseFloat(nuevoIngreso)); //llamo a la función handleAddIngreso pasándole los datos
      setNuevoIngreso(''); // Resetea el valor del nuevo ingreso
      setTipoIngreso(''); // Resetea el tipo de ingreso
    }
  }

  return (
    <>
      <div className='container-fluid contenedor_ingresos mt-5'>
        <Link to={"/"}>
          <button className='btn btn-primary mt-5'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
            </svg>
            Volver
          </button>
        </Link>
        <h3 className='title text-center mt-5'>Mis Ingresos</h3>
        <div className='capital_total'>
          <h3 className='text-warning bg-secondary p-2 rounded'>{ingresosTotales} €</h3>
        </div>
        <div className='container d-flex justify-content-center align-items-center' style={{ height: '40vh' }}>
          <div className='row w-100'>
            <div className='col d-flex justify-content-center'>
              <div className='circle d-flex flex-column align-items-center'>
                <div className='text'>
                  <h5>Nómina</h5>
                </div>
                <div className='imgs'>
                  <img className='img-fluid' src="../../public/imgs/nomina.png" alt="nomina" />
                </div>
                <p>{balanceGastosIngresos.ingresos.nomina} €</p>
              </div>
            </div>
            <div className='col d-flex justify-content-center'>
              <div className='circle d-flex flex-column align-items-center'>
                <div className='text'>
                  <h5>Extra</h5>
                </div>
                <div className='imgs'>
                  <img className='img-fluid' src="../../public/imgs/extra.png" alt="extra" />
                </div>
                <p>{balanceGastosIngresos.ingresos.extra} €</p>
              </div>
            </div>
            <div className='col d-flex justify-content-center'>
              <div className='circle d-flex flex-column align-items-center'>
                <div className='text'>
                  <h5>Ventas</h5>
                </div>
                <div className='imgs'>
                  <img className='img-fluid' src="../../public/imgs/ventas.png" alt="ventas" />
                </div>
                <p>{balanceGastosIngresos.ingresos.ventas} €</p>
              </div>
            </div>
            <div className='col d-flex justify-content-center'>
              <div className='circle d-flex flex-column align-items-center'>
                <div className='text'>
                  <h5>Otros</h5>
                </div>
                <div className='imgs'>
                  <img className='img-fluid' src="../../public/imgs/otros.png" alt="otros" />
                </div>
                <p>{balanceGastosIngresos.ingresos.otros} €</p>
              </div>
            </div>
          </div>
        </div>
        <div className='container-ingresos d-flex justify-content-center align-items-center '>
          <div className='container-form text-center'>
            <label className='form-label fs-4' htmlFor="nuevo-ingreso">Añadir Ingreso: </label>
            <input
              type="number"
              id='nuevo-ingreso'
              className='form-control'
              value={nuevoIngreso}
              onChange={handleInputChange}
            />
            <select className='form-select mt-2' value={tipoIngreso} onChange={handleSelectChange}>
              <option value="">Selecciona el tipo de ingreso</option>
              <option value="nomina">Nomina</option>
              <option value="extra">Extra</option>
              <option value="ventas">Ventas</option>
              <option value="otros">Otros</option>
            </select>

            <button className='btn btn-success ms-2 mt-4' onClick={handleGuardarIngreso}>Guardar</button>

          </div>
        </div>
      </div>
    </>
  )
}

export default Ingresos



