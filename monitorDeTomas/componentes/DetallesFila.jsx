import { Accordion, Card } from "react-bootstrap";
import { useEffect, useState } from "react";


const  DetalleFila = ({ data }) => {
  const [detale, setDetalle] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/sian2/ms/monitor/GetAllOrdenesTrabajo?Id=8421625")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDetalle(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Accordion className='border' defaultActiveKey='0'>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey='0'>
          Detalles
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            <tr>
              <td>Estudio</td>
              <td>{data.Estudio}</td>
            </tr>
            <tr>
              <td>Muestra</td>
              <td>{data.Muestra}</td>
            </tr>
            <tr>
              <td>Contenedor</td>
              <td>{data.Contenedor}</td>
            </tr>
            <tr>
              <td>Etiquetas</td>
              <td>{data.CantidadEtiquetas}</td>
            </tr>
            <tr>
              <td>Tiempo Estimado</td>
              <td>{data.TiempoEstimado}</td>
            </tr>
            <tr>
              <td>Fecha Estimada</td>
              <td>{data.FechaEstimada}</td>
            </tr>
            <tr>
              <td>Urgencia</td>
              <td>{data.Urgente}</td>
            </tr>
            <tr>
              <td>Área</td>
              <td>{data.Área}</td>
            </tr>
            <tr>
              <td>Observaciones</td>
              <td>{data.Observaciones.String}</td>
            </tr>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default DetalleFila
