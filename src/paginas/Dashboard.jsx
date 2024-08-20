// Utilizaremos React Recharts, es una librería de gráficos de código abierto hecha por el equipo de tanStack Query
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import React, { useContext } from 'react';
import Context from '../contexto/Context';
import { Link } from 'react-router-dom';


const Dashboard = () => {

  /* Calcular el balance final solo cuando cambian ingresosTotales o gastosTotales
  useEffect: Utilizo useEffect para calcular y actualizar balanceFinal solo cuando ingresosTotales o 
  gastosTotales cambian. Esto evita un bucle infinito de renderizado. */

  const { balanceGastosIngresos } = useContext(Context);

  const { ingresos, gastos, balance } = balanceGastosIngresos;

  {/* El cálculo ya se realiza en el propio mi Reducer, no es necesario hacerlo aquí otra vez */ }
  // Calcular el balance final
  const balanceFinal = ingresos.total - gastos.total;


  const data = [
    { name: 'Ingresos', value: ingresos.total },
    { name: 'Gastos', value: gastos.total },
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <>
      <div className="container-fluid contenedor_balance mt-5">
        <Link to={"/"}>
          <button className='btn btn-primary mt-5'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
            </svg>
            Volver
          </button>
        </Link>
        <div className='capital_total'>
          <h3 className='title text-center mt-5'>Balance</h3>
          {/* El cálculo ya se realiza en el propio mi Reducerm, no es necesario hacerlo arriba otra vez */}
          <h3 className='text-warning bg-secondary p-2 rounded mt-2'>{balanceFinal} €</h3>
          <h3 className='text-warning bg-secondary p-2 rounded mt-2'>{balance} €</h3> {/*Bueno*/}
        </div>


        <div className='container_graphics d-flex justify-content-between gap-5'>
          <div className='mt-5'>
            <h4>Ingresos y Gastos</h4>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </div>

          <div className='mt-5'>
            <h4>Comparación de Ingresos y Gastos</h4>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>

          <div className='mt-5'>
            <h4>Proporción de Ingresos y Gastos</h4>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
