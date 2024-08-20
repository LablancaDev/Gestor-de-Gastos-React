// Define el Reducer: Un reducer es una función que toma el estado actual y una acción, y retorna el nuevo estado.

import types from "./types";

/* Cuando el usuario hace click en Guardar en la página Gastos.jsx llama a la function handleAddGasto() 
    definida en el Provider, enviándole los datos recuperados del input y select (tipoGasto, valorGasto)
    esta function recoge esos valores para construir y despachar una nueva acción*/
const miReducer = (state, action) => {
    // Evaluamos el tipo de acción usando switch
    switch (action.type) {
        // Caso para el tipo de acción "gasto"
        case types.gasto:
            // Creamos un objeto actualizado para los gastos
            const updatedGastos = {
                // Mantenemos los valores actuales de los gastos
                // state.gastos accede a la parte del estado que contiene información sobre los gastos.
                //  operador spread (...state.gastos) se utiliza para copiar todas las propiedades del objeto state.gastos en un nuevo objeto.(sin modificar el original)
                ...state.gastos, //state representa el estado global del reducer, que incluye varias propiedades. Una de estas propiedades es gastos(mirar el estadoInicial).
                // Actualizamos el valor del tipo de gasto específico sumándole el nuevo valor

                // [action.payload.tipo] es una cadena que indica el tipo de gasto 
                // state.gastos[action.payload.tipo] accede al valor actual del tipo de gasto específico.
                // state.gastos[action.payload.tipo] + action.payload.valor suma el valor del nuevo gasto al valor actual.
                [action.payload.tipo]: state.gastos[action.payload.tipo] + action.payload.valor,
                // Actualizamos el total de gastos sumándole el nuevo valor
                // Esto actualiza la propiedad total en el objeto gastos, sumando el valor del nuevo gasto al total actual.
                total: state.gastos.total + action.payload.valor
            };
            // Retornamos el nuevo estado
            return {
                // Mantenemos los valores actuales del estado
                ...state,
                // Actualizamos los gastos con el nuevo objeto de gastos
                gastos: updatedGastos,
                // Calculamos y actualizamos el balance como la diferencia entre ingresos y gastos
                balance: state.ingresos.total - updatedGastos.total
            };
        // Caso para el tipo de acción "ingreso"
        case types.ingreso:
            // Creamos un objeto actualizado para los ingresos
            const updatedIngresos = {
                // Mantenemos los valores actuales de los ingresos
                ...state.ingresos,
                // Actualizamos el valor del tipo de ingreso específico sumándole el nuevo valor
                [action.payload.tipo]: state.ingresos[action.payload.tipo] + action.payload.valor,
                // Actualizamos el total de ingresos sumándole el nuevo valor
                total: state.ingresos.total + action.payload.valor
            };
            // Retornamos el nuevo estado
            return {
                // Mantenemos los valores actuales del estado
                ...state,
                // Actualizamos los ingresos con el nuevo objeto de ingresos
                ingresos: updatedIngresos,
                // Calculamos y actualizamos el balance como la diferencia entre ingresos y gastos
                balance: updatedIngresos.total - state.gastos.total
            };
        // Caso por defecto, si la acción no coincide con ninguno de los tipos especificados
        default:
            // Retornamos el estado actual sin cambios
            return state;
    }
}

// Exportamos el reducer para usarlo en otros componentes
export default miReducer;