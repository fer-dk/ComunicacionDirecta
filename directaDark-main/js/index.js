document.addEventListener("DOMContentLoaded", function () {
  const periodicidadSelect = document.getElementById("comunicacion-select");
  const chartIframe = document.querySelector(
    "#chart2 .chart-container__iframe"
  );
  const chartUrls = {
    asignaciones:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTo0Ygg87eW3QuRh0dXy5Z3v_AmGJreCeXnvV_1fIa5SSAmbY44jlIzBWVVKv3NU26JHsPDQaL1LHXC/pubchart?oid=1411195835&format=interactive",
    previsional:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTo0Ygg87eW3QuRh0dXy5Z3v_AmGJreCeXnvV_1fIa5SSAmbY44jlIzBWVVKv3NU26JHsPDQaL1LHXC/pubchart?oid=1999240229&format=interactive",
    tramitesYservicios:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTo0Ygg87eW3QuRh0dXy5Z3v_AmGJreCeXnvV_1fIa5SSAmbY44jlIzBWVVKv3NU26JHsPDQaL1LHXC/pubchart?oid=744059156&format=interactive",
    programas:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTo0Ygg87eW3QuRh0dXy5Z3v_AmGJreCeXnvV_1fIa5SSAmbY44jlIzBWVVKv3NU26JHsPDQaL1LHXC/pubchart?oid=744059156&format=interactive",
    organismoExternos:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTo0Ygg87eW3QuRh0dXy5Z3v_AmGJreCeXnvV_1fIa5SSAmbY44jlIzBWVVKv3NU26JHsPDQaL1LHXC/pubchart?oid=744059156&format=interactive",
  };
  // Agregar un event listener al dropdown para detectar cambios
  periodicidadSelect.addEventListener("change", function () {
    // Obtener el valor seleccionado del dropdown
    const selectedOption = periodicidadSelect.value;
    // Actualizar el src del iframe con la URL correspondiente
    chartIframe.src = chartUrls[selectedOption];
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const periodicidadSelect = document.getElementById("periodicidad-select");
  const chartIframe = document.querySelector(
    "#chart4 .chart-container__iframe"
  );
  const chartUrls = {
    aDemanda:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTo0Ygg87eW3QuRh0dXy5Z3v_AmGJreCeXnvV_1fIa5SSAmbY44jlIzBWVVKv3NU26JHsPDQaL1LHXC/pubchart?oid=744059156&format=interactive",
    diaria:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTo0Ygg87eW3QuRh0dXy5Z3v_AmGJreCeXnvV_1fIa5SSAmbY44jlIzBWVVKv3NU26JHsPDQaL1LHXC/pubchart?oid=1418436833&format=interactive",
    eventual:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTo0Ygg87eW3QuRh0dXy5Z3v_AmGJreCeXnvV_1fIa5SSAmbY44jlIzBWVVKv3NU26JHsPDQaL1LHXC/pubchart?oid=1363399549&format=interactive",
    mensual:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTo0Ygg87eW3QuRh0dXy5Z3v_AmGJreCeXnvV_1fIa5SSAmbY44jlIzBWVVKv3NU26JHsPDQaL1LHXC/pubchart?oid=881729646&format=interactive",
  };
  // Agregar un event listener al dropdown para detectar cambios
  periodicidadSelect.addEventListener("change", function () {
    // Obtener el valor seleccionado del dropdown
    const selectedOption = periodicidadSelect.value;
    // Actualizar el src del iframe con la URL correspondiente
    chartIframe.src = chartUrls[selectedOption];
  });
});

const sheetId = "1FdJvovQ4eRm1gCTloREvtR6PCFRPBfCvF9wpdL0GhfA";
const range = "19_08!H2:J";
const apiKey = "AIzaSyCj0UiXehWoiDjv06RErEB17wJ8Milb9EE";

/* fetch(
  `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
)
  .then((response) => response.json())
  .then((data) => {
    const formattedData = data.values.map((row) => ({ // respuesta JSON
      time: new Date (row[2]), // Columna J "Dia" en formato fecha.
      value: parseFloat(row[0], 10), // Columna H "Envíos válidos" en formato numero
    }));
    lineSeries.setData(formattedData);
  })
  .catch((error) => console.error("Error fetching data:", error)); */

  fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const formattedData = data.values.map((row) => {
        // Extraer la fecha en formato 'DD/MM/YYYY'
        const dateParts = row[2].split('/'); // Suponiendo que row[2] es '08/01/2024'
        const day = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];
  
        // Convertir la fecha a formato 'YYYY-MM-DD'
        const formattedDate = `${year}-${month}-${day}`;
  
        return {
          time: formattedDate, // Fecha en formato 'YYYY-MM-DD'
          value: parseFloat(row[0], 10 ) // Valor en la columna H
        };
      });
  
      console.log(formattedData); // Verifica el formato en la consola
  
      // Configurar el gráfico
      lineSeries.setData(formattedData);
    })
    .catch((error) => console.error("Error fetching data:", error));
  

// Crear el gráfico
const chart = LightweightCharts.createChart(document.getElementById("chartLight"), {
  width: 640, // Ajusta el tamaño según el resto de tus gráficos
  height: 270, // Asegúrate de que sea consistente
  timeScale: {
      timeVisible: true,
      secondsVisible: false,
  },
  layout: {
      backgroundColor: '#f4f4f4', // Para que coincida con el fondo de tu página
      textColor: 'black',
  },
  grid: {
      vertLines: {
          color: 'rgba(197, 203, 206, 0.5)', // 
      },
      horzLines: {
          color: 'rgba(197, 203, 206, 0.5)',
      },
  },
});
// Agregar una serie de líneas (line chart)
const lineSeries = chart.addLineSeries({
  color: "orange", // Puedes cambiar el color de la línea según tus preferencias
  lineWidth: 2,
});
