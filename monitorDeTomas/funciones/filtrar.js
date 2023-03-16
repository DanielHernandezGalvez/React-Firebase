export const filterData = (event, data) => {
  const newData = data.filter((row) => {
    return row.nombre.toLowerCase().includes(event.target.value.toLowerCase());
  });
  return newData;
}
