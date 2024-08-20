import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import Dashboard from '../paginas/Dashboard'
import Ingresos from '../paginas/Ingresos'
import Gastos from '../paginas/Gastos'
import Categorias from '../paginas/Categorias'
import MenuPrincipal from '../paginas/MenuPrincipal'
import Login from '../paginas/Login'

const Router = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<MenuPrincipal />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/ingresos" element={<Ingresos />} />
                <Route path="/gastos" element={<Gastos />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}

export default Router