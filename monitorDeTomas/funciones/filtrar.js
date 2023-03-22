// Este código exporta dos funciones

/* El parámetro event representa el evento que se produce cuando se introduce texto en un campo 
de búsqueda y data es un arreglo de objetos que contiene los datos que se van a filtrar.
La función utiliza el método filter para crear un nuevo arreglo que contiene sólo los objetos
cuya propiedad NombrePaciente incluye el texto ingresado en el campo de búsqueda
(sin importar si está en mayúsculas o minúsculas). La función devuelve el nuevo arreglo */
export const filterData = (event, data) => {
  const newData = data.filter((row) => {
    return row.NombrePaciente.toLowerCase().includes(event.target.value.toLowerCase());
  });
  return newData;
};

/* El parámetro selected representa la opción seleccionada en un menú desplegable de sucursales
y data es un arreglo de objetos que contiene los datos que se van a filtrar. La función utiliza
el método filter para crea un nuevo arreglo que contiene sólo los objetos cuya propiedad SucuNombre
incluye la opción seleccionada (sin importar si está en mayúsculas o minúsculas). 
La función devuelve el nuevo arreglo */
export const filterSucursal = (selected, data) => {
  const newData = data.filter((row) => {
    return row.SucuNombre.toLowerCase().includes(selected.toLowerCase());
  });
  
  return newData;
};
