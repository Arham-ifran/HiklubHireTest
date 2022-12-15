import React, { useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Typography } from "@mui/material";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

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
export default function RadarComponent(props) {

  const [lightOptions] = useState({
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    },
    scales: {
        r: {
            pointLabels: {
                color: '#495057',
            },
            grid: {
                color: '#ebedef',
            },
            angleLines: {
                color: '#ebedef'
            }
        }
    }
});

  return <Radar data={props.data} options={lightOptions} style={{ position: 'relative', display:"flex", marginLeft:"auto", marginRight:"auto", width: '40%' }}  />;
}
