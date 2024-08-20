import React from 'react'
import { Link } from 'react-router-dom'

const MenuPrincipal = () => {
    return (
        <>
            <div className="container-fluid contenedor_menu p-2">
                <h2 className='mb-5 text-success text-center'>Gestor de gastos:</h2>
                <div className="row">
                    <div className="col">
                        <Link to={"/dashboard"} className='no_underline'>
                            <div className='caja d-flex flex-column justify-content-center align-items-center'>
                                <div className='text'>
                                    <h4>Dashboard</h4>
                                </div>
                                <div className='img'>
                                    <img src="../../public/imgs/grafica.png" alt="grafica" />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to={"/ingresos"} className='no_underline'>
                            <div className='caja d-flex flex-column justify-content-center align-items-center'>
                                <div className='text'>
                                    <h4>Ingresos</h4>
                                </div>
                                <div className='img'>
                                    <img className='' src="../../public/imgs/ingreso.png" alt="ingreso" />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to={"/gastos"} className='no_underline'>
                            <div className='caja d-flex flex-column justify-content-center align-items-center'>
                                <div className='text'>
                                    <h4>Gastos</h4>
                                </div>
                                <div className='img'>
                                    <img src="../../public/imgs/gastos.png" alt="gastos" />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col">
                        <Link to={"/categorias"} className='no_underline'>
                            <div className='caja d-flex flex-column justify-content-center align-items-center'>
                                <div className='text'>
                                    <h4>Categorías</h4>
                                </div>
                                <div className='img'>
                                    <img src="../../public/imgs/grafica.png" alt="grafica" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuPrincipal