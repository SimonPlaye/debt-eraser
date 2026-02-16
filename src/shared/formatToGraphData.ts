export const formatToGraphData = ({
  debtToGdpRatios,
  deficitToGdpRatios,
}: {
  debtToGdpRatios: number[];
  deficitToGdpRatios: number[];
}) => {
  return [
    {
      name: "Debt to GDP Ratio",
      data: debtToGdpRatios,
      color: "#1a4d8f",
    },
    {
      name: "Deficit to GDP Ratio",
      data: deficitToGdpRatios,
      color: "#ed2939",
    },
  ];
};
