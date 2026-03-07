import { Line } from "react-chartjs-2";
import { useSignalEffect } from "@preact/signals-react/runtime";
import { useState } from "react";
import TextSignal from "../signals/StatsButtonSignal";

function Graph() {
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  useSignalEffect(() => {
    const signalValue = TextSignal.value;

    const stored = localStorage.getItem("graphData");

    if (stored) {
      const parsed: number[] = JSON.parse(stored);

      setDataPoints(prev => [...prev, ...parsed]);
    }

    console.log("Signal changed:", signalValue);
  });

  const data = {
    labels: dataPoints.map((_, i) => i + 1),
    datasets: [
      {
        label: "Stored Data",
        data: dataPoints,
        borderColor: "blue",
        tension: 0.3
      }
    ]
  };

  return <Line data={data} />;
}

export default Graph;