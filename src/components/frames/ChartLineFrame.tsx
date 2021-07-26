import { Line } from "react-chartjs-2";

const data = {
  labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 12, 23, 20, 17, 22],
      borderColor: "LightSkyBlue",
      backgroundColor: "LightSkyBlue",
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

export default function ChartLineFrame() {
  return (
    <Line
      type={"line"}
      data={data}
      options={options}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
