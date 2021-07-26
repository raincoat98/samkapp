import { Pie } from "react-chartjs-2";

const data = {
  labels: ["양품", "원인이 확인된 불량", "불량"],
  datasets: [
    {
      data: [100, 3, 2],
      backgroundColor: ["LightSkyBlue", "LightCoral", "red"],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
  },
};

export default function ChartPieFrame() {
  return <Pie type={"pie"} data={data} options={options} />;
}
