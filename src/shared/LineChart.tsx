import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import type { GraphDataType } from "./types";

interface LineChartProps {
  series: GraphDataType[];
  title: string;
  yaxisLabel?: string;
}

export const LineChart = ({ series, title, yaxisLabel }: LineChartProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);

      const seriesOptions = series.map((s) => ({
        name: s.name,
        data: s.data,
        type: "line",
        smooth: true,
        lineStyle: { color: s.color || "#1a4d8f" },
        itemStyle: { color: s.color || "#1a4d8f" },
      }));

      chartInstance.current.setOption({
        title: {
          text: title,
          left: "center",
          textStyle: { color: "#1a4d8f" },
        },
        tooltip: {
          trigger: "axis",
          formatter: (params: any) => {
            return params
              .map(
                (p: any) =>
                  `${p.seriesName}: ${Math.round(p.value * 1000) / 10}%`,
              )
              .join("<br/>");
          },
        },
        grid: {
          left: 50,
          right: 50,
          top: 50,
          bottom: 80,
        },
        legend: {
          orient: "horizontal",
          bottom: 0,
          left: "center",
          textStyle: {
            color: "#1a4d8f",
            fontWeight: "bold",
            fontSize: 13,
            opacity: 0.9,
          },
          itemGap: 20,
          icon: "circle",
        },
        xAxis: {
          type: "category",
          data: Array.from({ length: 2050 - 2024 + 1 }, (_, i) =>
            (2024 + i).toString(),
          ),
        },
        yAxis: {
          type: "value",
          name: yaxisLabel,
          axisLabel: {
            formatter: (value: any) => `${value * 100}%`,
          },
        },
        series: seriesOptions,
      });
    }

    if (chartInstance.current) {
      chartInstance.current.setOption({
        series: series.map((s) => ({ data: s.data })),
      });
    }
  }, [series, title]);

  return <div ref={chartRef} style={{ width: "100%", height: "350px" }} />;
};
