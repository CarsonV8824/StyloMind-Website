import { useEffect, useState } from "react";
import { useSignalEffect } from "@preact/signals-react/runtime";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import TextSignal from "../signals/StatsButtonSignal";
import "./global_componets.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const STORAGE_KEY = "analysisResult";

type PovSeries = {
  ["1st"]: number[];
  ["2nd"]: number[];
  ["3rd"]: number[];
};

type AnalysisData = {
  lexicalDiversity: number[];
  povOverTime: PovSeries;
  passiveSentences: string[];
  contractionSentences: string[];
  firstSecondPersonSentences: string[];
};

type StoredPayload = {
  user_text?: {
    content?: string;
    analysis?: string;
    ai_test?: string;
  };
};

function parseStoredValue<T>(value: string | undefined, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    try {
      // Backend currently stores Python-style repr strings. For app-generated
      // local data, evaluating them as JS literals is the most direct fallback.
      return Function(`"use strict"; return (${value});`)() as T;
    } catch {
      return fallback;
    }
  }
}

function loadAnalysisFromStorage(): {
  analysis: AnalysisData | null;
  aiScores: Record<string, number>;
} {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { analysis: null, aiScores: {} };
  }

  const payload = parseStoredValue<StoredPayload | null>(raw, null);
  const analysisValue = payload?.user_text?.analysis;
  const aiTestValue = payload?.user_text?.ai_test;

  const parsedAnalysis = parseStoredValue<unknown[]>(analysisValue, []);
  const analysis: AnalysisData | null =
    Array.isArray(parsedAnalysis) && parsedAnalysis.length >= 5
      ? {
          lexicalDiversity: Array.isArray(parsedAnalysis[0]) ? parsedAnalysis[0] as number[] : [],
          povOverTime: (parsedAnalysis[1] as PovSeries) ?? { "1st": [], "2nd": [], "3rd": [] },
          passiveSentences: Array.isArray(parsedAnalysis[2]) ? parsedAnalysis[2] as string[] : [],
          contractionSentences: Array.isArray(parsedAnalysis[3]) ? parsedAnalysis[3] as string[] : [],
          firstSecondPersonSentences: Array.isArray(parsedAnalysis[4]) ? parsedAnalysis[4] as string[] : [],
        }
      : null;

  const aiScores = parseStoredValue<Record<string, number>>(aiTestValue, {});

  return { analysis, aiScores };
}

function sentenceLabel(prefix: string, count: number) {
  return Array.from({ length: count }, (_, index) => `${prefix} ${index + 1}`);
}

function Graph() {
  const [storedData, setStoredData] = useState(() => loadAnalysisFromStorage());

  useEffect(() => {
    const handleStorage = () => setStoredData(loadAnalysisFromStorage());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useSignalEffect(() => {
    TextSignal.value;
    setStoredData(loadAnalysisFromStorage());
  });

  const analysis = storedData.analysis;
  const aiScores = storedData.aiScores;

  if (!analysis) {
    return (
      <div className="statsPanel">
        <p className="text">No saved stats found in local storage yet.</p>
      </div>
    );
  }

  const lexicalData = {
    labels: sentenceLabel("Chunk", analysis.lexicalDiversity.length),
    datasets: [
      {
        label: "Lexical Diversity",
        data: analysis.lexicalDiversity,
        borderColor: "#127bbf",
        backgroundColor: "rgba(18, 123, 191, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const povData = {
    labels: sentenceLabel("Chunk", analysis.povOverTime["1st"]?.length ?? 0),
    datasets: [
      {
        label: "1st Person",
        data: analysis.povOverTime["1st"] ?? [],
        borderColor: "#127bbf",
        tension: 0.3,
      },
      {
        label: "2nd Person",
        data: analysis.povOverTime["2nd"] ?? [],
        borderColor: "#1fa971",
        tension: 0.3,
      },
      {
        label: "3rd Person",
        data: analysis.povOverTime["3rd"] ?? [],
        borderColor: "#f28c28",
        tension: 0.3,
      },
    ],
  };

  const aiValues = Object.values(aiScores);
  const aiSentenceCount = aiValues.filter((value) => value >= 1).length;
  const humanSentenceCount = aiValues.filter((value) => value < 1).length;

  return (
    <div className="statsPanel">
      <div className="statsGrid">
        <div className="statsCard">
          <h3 className="statsCardTitle">Sentence Flags</h3>
          <p className="statsMetric">Passive: {analysis.passiveSentences.length}</p>
          <p className="statsMetric">Contractions: {analysis.contractionSentences.length}</p>
          <p className="statsMetric">
            1st/2nd person: {analysis.firstSecondPersonSentences.length}
          </p>
        </div>
        <div className="statsCard">
          <h3 className="statsCardTitle">AI Check</h3>
          <p className="statsMetric">AI-flagged sentences: {aiSentenceCount}</p>
          <p className="statsMetric">Human-flagged sentences: {humanSentenceCount}</p>
          <p className="statsMetric">Total scored sentences: {aiValues.length}</p>
        </div>
      </div>

      <div className="statsCard chartCard">
        <h3 className="statsCardTitle">Lexical Diversity</h3>
        <Line data={lexicalData} />
      </div>

      <div className="statsCard chartCard">
        <h3 className="statsCardTitle">Point of View Over Time</h3>
        <Line data={povData} />
      </div>

      <div className="statsGrid">
        <div className="statsCard">
          <h3 className="statsCardTitle">Passive Sentences</h3>
          {analysis.passiveSentences.length > 0 ? (
            <ul className="statsList">
              {analysis.passiveSentences.map((sentence, index) => (
                <li key={`${sentence}-${index}`}>{sentence}</li>
              ))}
            </ul>
          ) : (
            <p className="statsMetric">None found.</p>
          )}
        </div>
        <div className="statsCard">
          <h3 className="statsCardTitle">Contractions</h3>
          {analysis.contractionSentences.length > 0 ? (
            <ul className="statsList">
              {analysis.contractionSentences.map((sentence, index) => (
                <li key={`${sentence}-${index}`}>{sentence}</li>
              ))}
            </ul>
          ) : (
            <p className="statsMetric">None found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Graph;
