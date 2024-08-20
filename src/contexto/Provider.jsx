import React, { useReducer, useState } from 'react'
import Context from './Context'
import types from './types';
import miReducer from './miReducer';

const Provider = ({ children }) => {

    // Almacena los ingresos totales
    const [ingresosTotales, setIngresosTotales] = useState(0);

    // Almacena los gastos totales
    const [gastosTotales, setGastosTotales] = useState(0);

    // Almacena la media entre los gastos e ingresos totales  
    const [balanceFinal, setBalanceFinal] = useState(0);

    // Valor Inicial
    const valorInicial = {
        ingresos: {
            nomina: 0,
            extra: 0,
            ventas: 0,
            otros: 0,
            total: 0
        },
        gastos: {
            hipoteca: 0,
            luz: 0,
            agua: 0,
            coche: 0,
            salud: 0,
            caprichos: 0,
            ocio: 0,
            viajar: 0,
            total: 0
        },
        balance: 0
    };
    /* USEREDUCER:
    -Ejemplo de useReducer para Ingresos y Gastos
    Vamos a definir un reducer para manejar tanto los ingresos como los gastos en lugar de usar múltiples useState.
    
    useReducer que gestiona el estado de los ingresos y gastos
    */
    const [balanceGastosIngresos, dispatch] = useReducer(miReducer, valorInicial);


    // Funciones que despacharán las acciones necesarias pasando el tipo de acción y el tipo de gasto junto a el valor en un objeto, cuando el usuario haga click
    const handleAddGasto = (tipo, valor) => {
        // Construir la action Ej:
        // const action = { y al final despachar la accion, dispatch(action)}
        //Puedo construir la acción o directamente pasarla al dispatch como en este ejemplo
        dispatch( //llamo al dispatch y le paso el action con los datos
            {
                type: types.gasto,
                payload: { tipo, valor: parseFloat(valor) }//con el payload enviamos la información del tipo de gasto y el valor convertido a decimal
            }
        )
    }

    const handleAddIngreso = (tipo, valor) => {
        dispatch({
            type: types.ingreso,
            payload: { tipo, valor: parseFloat(valor) }
        });
    }



    return (
        <Context.Provider value={{
            ingresosTotales, setIngresosTotales, gastosTotales, setGastosTotales, balanceFinal, setBalanceFinal,
            handleAddGasto, handleAddIngreso, balanceGastosIngresos
        }}>
            {children}
        </Context.Provider>
    )
}

export default Provider

/*FLUJO DE EJECUCIÓN DEL CÓDIGO EN EL PROYECTO:

(1). Usuario Introduce Datos y Hace Clic en "Guardar"
Archivo: Gastos.jsx

Paso 1: El usuario selecciona un tipo de gasto en el <select> y escribe una cantidad en el <input>. 
Estos valores se almacenan en el estado local del componente usando useState.

const [tipoGasto, setTipoGasto] = useState("");
const [valorGasto, setValorGasto] = useState(0);

Paso 2: Cuando el usuario cambia el valor en el <input>, el evento onChange dispara 
la función handleInputChange, que actualiza el estado valorGasto.

const handleInputChange = (e) => {
  setValorGasto(e.target.value);
};

Paso 3: Cuando el usuario selecciona un tipo de gasto en el <select>, el evento onChange dispara 
la función handleSelectChange, que actualiza el estado tipoGasto.

const handleSelectChange = (e) => {
  setTipoGasto(e.target.value);
};

Paso 4: Al hacer clic en el botón "Guardar", se llama a la función handleAddGasto, pasando el 
tipoGasto y valorGasto como parámetros

<button onClick={() => handleAddGasto(tipoGasto, parseFloat(valorGasto))} className='btn btn-success'>Guardar</button>

(2). Propagación de Datos a través del Contexto
Archivo: Provider.jsx

Paso 5: La función handleAddGasto está definida en el proveedor del contexto. Esta función despacha una 
acción a través del dispatch del useReducer.

Paso 5: La función handleAddGasto está definida en el proveedor del contexto. Esta función despacha 
una acción a través del dispatch del useReducer:

const handleAddGasto = (tipo, valor) => {
  dispatch({
    type: types.gasto,
    payload: { tipo, valor: parseFloat(valor) }
  });
};

Paso 6: El dispatch envía una acción al reducer con el tipo de acción (types.gasto) y los 
datos asociados (tipo y valor).

(3). Manejo de la Acción en el Reducer
Archivo: miReducer.jsx

Paso 7: El reducer recibe la acción y evalúa el tipo de acción en el switch. En este caso, 
el tipo de acción es types.gasto.

case types.gasto:

Paso 8: Se crea un nuevo objeto updatedGastos que incluye el estado actual de los gastos 
(...state.gastos) y actualiza el tipo de gasto específico y el total:

const updatedGastos = {
  ...state.gastos,
  [action.payload.tipo]: state.gastos[action.payload.tipo] + action.payload.valor,
  total: state.gastos.total + action.payload.valor
};
Explicación:
    ...state.gastos, accede a la parte del estado que contiene información sobre los gastos.(gastos= estadoInicial del reducer)
    [action.payload.tipo] es una cadena que indica el tipo de gasto 
    tate.gastos[action.payload.tipo] accede al valor actual del tipo de gasto específico.
    state.gastos[action.payload.tipo] + action.payload.valor suma el valor del nuevo gasto al valor actual.

Paso 9: El reducer retorna el nuevo estado, actualizando los gastos y el balance global.
    return {
    ...state,
    gastos: updatedGastos,
    balance: state.ingresos.total - updatedGastos.total
    };

(4). Actualización del Estado y Renderizado
Archivo: Provider.jsx

Paso 10: El nuevo estado retornado por el reducer se utiliza para actualizar el contexto (balanceGastosIngresos).

Paso 11: El contexto actualizado se propaga a los componentes hijos, incluido Gastos. Estos componentes 
se vuelven a renderizar con los nuevos datos del estado.

Archivo: Gastos.jsx

Paso 12: El componente Gastos se vuelve a renderizar con el nuevo estado. La cantidad total de 
los gastos se actualiza en la interfaz.

const gastosTotales = balanceGastosIngresos.gastos.total;

Paso 13: Los cambios en el estado se reflejan en la interfaz, mostrando los nuevos valores 
y actualizando cualquier otra información relacionada.

Resumen del Flujo
    Entrada del Usuario: El usuario introduce un valor y selecciona un tipo de gasto.
    Manejo de Eventos: Las funciones de manejo de eventos actualizan el estado local del componente Gastos.
    Despacho de Acción: La función handleAddGasto en el contexto despacha una acción al reducer.
    Reducer: El reducer procesa la acción, actualiza el estado global y calcula el nuevo balance.
    Actualización del Contexto: El estado global se actualiza en el contexto.
    Renderizado: El componente Gastos se renderiza nuevamente con los datos actualizados del contexto.
    Este flujo garantiza que la actualización del estado sea coherente y que la interfaz del usuario refleje los cambios en el estado global.
*/ 