import { Line, Path } from "react-konva";
import { HAMMER_PATH } from "../utils/constants";

export const renderObjectShape = (label: string, scale: number) => {
  const size = 25 / scale;

  const type = label?.toLowerCase() || "";

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
      />
    );
  }
  if (type.includes("container")) {
    return (
      <Path
        data={`M 0,-${size} L ${size / 1.5},0 L ${size / 1.5},${size / 1.5} L -${size / 1.5},${size / 1.5} L -${size / 1.5},0 Z`}
        fill="#4caf50"
        stroke="#1b5e20"
        strokeWidth={1}
      />
    );
  }

  return (
    <Line
      points={[0, -size, -size / 1.5, size / 1.5, size / 1.5, size / 1.5]}
      closed
      fill="#9c41eb"
      stroke="#9b207e"
      strokeWidth={1}
    />
  );
};
