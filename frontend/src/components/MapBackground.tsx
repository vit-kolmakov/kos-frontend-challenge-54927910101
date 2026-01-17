import { useMemo } from "react";
import { Group, Line, Text, Rect } from "react-konva";
import { CANVAS_SIZE_PX } from "../utils/coordinates";
// AI genereated this as this is just a background layer
const GRID_SIZE_METERS = 10;
const MAP_SIZE_METERS = 100;
const SCALE = CANVAS_SIZE_PX / MAP_SIZE_METERS;

const MapBackground = () => {
  const gridLines = useMemo(() => {
    const lines = [];

    for (let i = 0; i <= MAP_SIZE_METERS; i += GRID_SIZE_METERS) {
      const pos = i * SCALE;

      lines.push(
        <Line
          key={`v-${i}`}
          points={[pos, 0, pos, CANVAS_SIZE_PX]}
          stroke="#e0e0e0"
          strokeWidth={1}
        />,
      );

      lines.push(
        <Text
          key={`vl-${i}`}
          text={`${i}m`}
          x={pos + 2}
          y={CANVAS_SIZE_PX - 15}
          fontSize={10}
          fill="#999"
        />,
      );

      const yPos = CANVAS_SIZE_PX - pos;

      lines.push(
        <Line
          key={`h-${i}`}
          points={[0, yPos, CANVAS_SIZE_PX, yPos]}
          stroke="#e0e0e0"
          strokeWidth={1}
        />,
      );

      if (i > 0) {
        lines.push(
          <Text
            key={`hl-${i}`}
            text={`${i}m`}
            x={5}
            y={yPos - 12}
            fontSize={10}
            fill="#999"
          />,
        );
      }
    }
    return lines;
  }, []);

  return (
    <Group>
      <Rect
        x={0}
        y={0}
        width={CANVAS_SIZE_PX}
        height={CANVAS_SIZE_PX}
        fill="#fcfcfc"
      />

      {gridLines}

      <Rect
        x={0}
        y={0}
        width={CANVAS_SIZE_PX}
        height={CANVAS_SIZE_PX}
        stroke="#333"
        strokeWidth={2}
      />
    </Group>
  );
};

export default MapBackground;
