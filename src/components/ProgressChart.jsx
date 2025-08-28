import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function ProgressChart({ habits }) {
  const today = new Date();
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i)); // last 7 days
    return d.toISOString().split("T")[0]; // yyyy-mm-dd
  });

  // Count completions per day
  const completions = last7Days.map((day) => {
    let count = 0;
    habits.forEach((h) => {
      if (h.completedDates && h.completedDates.includes(day)) {
        count++;
      }
    });
    return count;
  });

  const data = {
    labels: last7Days.map((d) =>
      new Date(d).toLocaleDateString("en-US", { weekday: "short" })
    ),
    datasets: [
      {
        label: "Habits Completed",
        data: completions,
        backgroundColor: "#6366F1", // Indigo
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1,
        ticks: { precision: 0 }, // avoid decimals
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}
