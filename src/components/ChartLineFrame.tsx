import { Line } from "react-chartjs-2";

const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };
const labels = ["1", "2"];
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 12, 23],
      borderColor: "red",
      backgroundColor: "red",
    },
    {
      label: "Dataset 2",
      data: [10, 12, 23],
      borderColor: "blue",
      backgroundColor: "blue",
    },
  ],
};

const options = {
  plugins: {
    maintainAspectRatio: false,
    legend: {
      display: false,
      position: "top",
    },
  },
};

function ChartLineFrame() {
  return <Line type={"line"} data={data} options={options} />;
}

export default ChartLineFrame;
