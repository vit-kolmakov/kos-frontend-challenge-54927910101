import { Circle, Path, Star } from "react-konva";
import { HAMMER_PATH } from "../utils/constants";

export const renderObjectShape = (label: string, scale: number) => {
  const size = 12 / scale;

  const type = label?.toLowerCase() || "";

  if (type.includes("tool")) {
    return (
      // AI's help to create a hammer
      <Path
        data={HAMMER_PATH}
        fill="red"
        scaleX={0.7 / scale}
        scaleY={0.7 / scale}
        offsetX={12}
        offsetY={12}
        shadowBlur={2}
      />
    );
  }
  if (type.includes("container")) {
    return (
      <Circle
        radius={size}
        fill="blue"
        shadowBlur={2}
        stroke="white"
        strokeWidth={2 / scale}
      />
    );
  }

  return (
    <Star
      numPoints={5}
      innerRadius={size * 0.5}
      outerRadius={size}
      fill="orange"
      shadowBlur={2}
      rotation={180}
    />
  );
};
