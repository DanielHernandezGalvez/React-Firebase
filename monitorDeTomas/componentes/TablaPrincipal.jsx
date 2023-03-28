import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import BuscadorHeader from './BuscadorHeader';
import { TABLA_PRINCIPAL_COLUMNS } from './funciones/columns';

export default function TablaPrincipal() {
    const [recipientes, setRecipientes] = useState([]);

    useEffect(() => {
      const fetchRecipientes = async () => {
        let url = "http://localhost:8081/sian2/ms/monitor/GetRecipientesByFolio?f=3FE0310130"
        const response = await fetch(url);
        const data = await response.json();
        setRecipientes(data.data);
      };
  
      fetchRecipientes();
    }, []);

    return (
        <>
        <BuscadorHeader />
            <DataTable 
            columns={TABLA_PRINCIPAL_COLUMNS} 
            data={recipientes}
            pagination
            highlightOnHover
            striped
            responsive
            fixedHeader
            className='mt-5'
            />
        </>
    );
  };
    






