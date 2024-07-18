"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { faker } from "@faker-js/faker";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ dataBar }) {
  const number = Array.from({ length: 6 }, () =>
    faker.number.int({ min: 100, max: 1000 })
  );

  const data = {
    labels: dataBar.map((item) => item.category.toUpperCase()),
    datasets: [
      {
        label: "Total",
        data: dataBar.map((item) => item.totalPayments),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total pesanan selesai berdasarkan kategori",
      },
    },
  };

  return <Pie data={data} options={options} />;
}
