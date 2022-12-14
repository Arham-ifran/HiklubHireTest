import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import { Typography } from "@mui/material";

/** ToDo:
 *
 * Sistema de Transformación de las puntuaciones por posiciones
 * Pasos:
 *  0.- Recibimos un array de de 15 posiciones con valores comprendidos entre 1 y 4
 *  1.- El array se debe dividir en 5 sub-arrays de tamaño 3
 *  2.- las posiciones de cada uno de los sub-arrays se transforman:
 *
 * Ejemplo:
 * [3,3,2,1,4,4,1,4,4,1,1,3,3,2,4]
 *
 * sub-arrays 1,2,3 y 5 se transforman asi:
 *
 *                        puntuacion
 *                         1 2 3 4
 *
 * posicion          1     4 4 2 1
 *                   2     1 2 3 4
 *                   3     1 2 3 4
 *
 * sub array 4:
 *                        puntuacion
 *                         1 2 3 4
 *
 * posicion          1     1 2 3 4
 *                   2     1 2 3 4
 *                   3     4 3 2 1
 *
 *
 * Resultados del ejemplo:
 * subarray 1: 2 3 2
 * subarray 2: 4 4 4
 * subarray 3: 4 4 4
 * subarray 4: 1 1 2
 * subarray 5: 2 2 4
 *
 * 3.- Sumar el resultado de los subarrays
 *
 * 4.- Transformar a % porcentaje:
 *  Hacer regla de tres para que 12 sea el 100%, y que el 3 sea el 0%.
 *
 * 5.- pintar el chart radar
 *
 * 6.- Las etiquetas deben mostrar el valor + "%""
 */
export default function Radar({ arrayReceived }) {
  const [array, setArray] = useState(arrayReceived);
  const [radar, setRadar] = useState();
  const [isRadar, setIsRadar] = useState(false);

  const options = {
    responsive: true,
    aspectRatio: 1,
    //maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            size: 18,
          },
          color: "#93C01F",
        },
      },
    },
    scales: {
      r: {
        grid: {
          display: true,
        },
        angleLines: {
          display: false,
        },
        suggestedMin: 0, // equivale a 3 en la suma
        suggestedMax: 100, // equivale a 12 en la suma
        ticks: {
          stepSize: 2,
          color: "#93C01F",
          font: {
            size: 14,
          },
        },
        pointLabels: {
          padding: 2,
          color: "#93C01F",
          font: {
            family: "ASAP",
            size: 14,
          },
        },
      },
    },
  };

  const data = {
    labels: ["RE", "A", "AM", "EX", "EM"],
    datasets: [
      {
        label: "Pon tu nombre aqui",
        data: radar,
        backgroundColor: "rgba(147, 192, 31, 0.6)",
        borderColor: "#93C01F",
        borderWidth: 1,
      },
    ],
  };

  return isRadar ? (
    <Radar data={data} options={options} />
  ) : (
    <Typography variant="h6">Sin datos</Typography>
  );
}
