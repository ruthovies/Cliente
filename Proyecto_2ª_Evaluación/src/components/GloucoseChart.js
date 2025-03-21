import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrar los módulos necesarios para Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GlucoseChart = ({valorMinimo, valorMedio, valorMaximo}) => {
  const data = {
    labels: ["Valor Medio", "Valor Mínimo", "Valor Máximo"],
    datasets: [
      {
        label: "Niveles de Glucosa",
        data: [valorMedio, valorMinimo, valorMaximo], // Valores proporcionados
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800"], // Colores para cada barra
        borderColor: ["#388E3C", "#1976D2", "#F57C00"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default GlucoseChart;
