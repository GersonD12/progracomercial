import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Cookies from 'js-cookie';
import DashCard from '../dashboardCards/DashCard';
import { GeneralProductosCarrera } from '../../../functions/conexionesGraficas';

const SalesMonth = () => {
  const [carrerasData, setCarrerasData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Llamar a la función que obtiene los datos de las 3 carreras con la mayor cantidad de productos
      const authToken = Cookies.get('authToken');
      const nombreUsuario = Cookies.get('username');
      const idUser = parseInt(Cookies.get('userId'), 10);
      const dataFields = {
        token: authToken,
        nombre_usuario: nombreUsuario,
        id_User: idUser,
      };
      const response = await GeneralProductosCarrera(dataFields);
      setCarrerasData(response.data);
    };
    fetchData();
  }, []);

  // Lista de colores para las carreras
  const carreraColors = [
    '#ff5733',
    '#5a9af0',
    '#99cc33',
    '#ffcc00',
    '#cc66cc',
    '#33cc33',
    '#3399cc',
    '#cc3366',
    '#ff9900',
    '#996633',
    '#99ccff',
    '#ff33cc',
    '#33cc99',
    '#9966ff',
    '#cc9933',
  ];  

  // Preparar los datos para la gráfica de dona
  const seriesSales = carrerasData.map((carrera, index) => {
    return {
      name: carrera[0],
      data: carrera[1],
      color: carreraColors[index],
    };
  });

  const optionsSales = {
    chart: {
      id: 'donut-chart',
      fontFamily: "'Rubik', sans-serif",
    },
    dataLabels: {
      enabled: false, // Habilitar etiquetas de datos en tooltips
      formatter(val) {
        return val;
      },
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90px',
        },
      },
    },
    stroke: {
      width: 2,
      colors: 'transparent',
    },
    legend: {
      show: false,
      labels: {
        colors: 'red',
      },
    },
    colors: seriesSales.map((carrera) => carrera.color),
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter(val, { seriesIndex }) {
          return `${seriesSales[seriesIndex].name}: ${val}`;
        },
      },
    },
  };

  return (
    <DashCard title="Cantidad de productos por carrera">
      <div className="mt-3 position-relative" style={{ height: '300px', position: 'relative' }}>
        <Chart options={optionsSales} series={seriesSales.map((carrera) => carrera.data)} type="donut" height="290" />
        <div className="round-overlap sales" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <i className="bi bi-bag-dash-fill text-muted" style={{ fontSize: '2rem', color: 'white' }}> </i>
        </div>
      </div>
      <div className="hstack gap-2 mt-2 pt-1 justify-content-center">        
      </div>
    </DashCard>
  );
};

export default SalesMonth;
