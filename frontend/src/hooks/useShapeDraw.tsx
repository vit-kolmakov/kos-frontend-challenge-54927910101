import { Line, Path } from "react-konva";
import { HAMMER_PATH } from "../utils/constants";
import type Konva from "konva";

export const renderObjectShape = (
  label: string,
  scale: number,
  isSelected: boolean,
) => {
  const size = 25 / scale;

  const type = label?.toLowerCase() || "";

  const selectionStyle: Konva.ShapeConfig = isSelected
    ? {
        stroke: "#00a7e3",
        strokeWidth: 3 / scale,
        shadowColor: "#00a7e3",
        shadowBlur: 10 / scale,
        shadowOpacity: 0.8,
        lineJoin: "round", // TypeScript now knows this is the specific 'round' type
      }
    : {};

  if (type.includes("tool")) {
    return (
      // AI's help to create a hammer
      <Path
        data={HAMMER_PATH}
        fill="#b6561a"
        scaleX={3 / scale}
        scaleY={3 / scale}
        offsetX={12}
        offsetY={12}
        shadowBlur={2}
        {...selectionStyle}
      />
    );
  }
  if (type.includes("container")) {
    return (
      <Path
        data={`M 0,-${size} L ${size / 1.5},0 L ${size / 1.5},${size / 1.5} L -${size / 1.5},${size / 1.5} L -${size / 1.5},0 Z`}
        fill="#4caf50"
        stroke={isSelected ? "#00a7e3" : "#1b5e20"}
        strokeWidth={isSelected ? 2 / scale : 1 / scale}
        {...selectionStyle}
      />
    );
  }

  return (
    <Line
      points={[0, -size, -size / 1.5, size / 1.5, size / 1.5, size / 1.5]}
      closed
      fill="#9c41eb"
      {...selectionStyle}
      stroke={isSelected ? "#00a7e3" : "#9b207e"}
      strokeWidth={isSelected ? 2 / scale : 1 / scale}
    />
  );
};
