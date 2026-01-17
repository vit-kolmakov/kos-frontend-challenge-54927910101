import { Stage, Layer, Circle, Text, Group } from "react-konva";
import { toScreenCoordinates, CANVAS_SIZE_PX } from "../utils/coordinates";
import MapBackground from "./MapBackground";
import useApi from "../hooks/useApi";
import type { PoistionsType } from "../types";

const MapCanvas = () => {
  //   const {
  //     isLoading,
  //     error,
  //     data: objectsData,
  //   } = useApi<ObjectType[]>("/objects");

  const {
    isLoading,
    error,
    data: poistionsData,
  } = useApi<PoistionsType[]>("/positions");

  const getColorByLabels = (label: string) => {
    if (label.includes("tool")) {
      return "red";
    } else if (label.includes("container")) {
      return "blue";
    }
    if (label.includes("order")) {
      return "green";
    }
  };

  return (
    <div style={{ border: "2px solid #333", display: "inline-block" }}>
      <Stage width={CANVAS_SIZE_PX} height={CANVAS_SIZE_PX}>
        <MapBackground />
        <Layer>
          {poistionsData?.map((obj) => {
            const { x, y } = toScreenCoordinates(obj.x, obj.y);

            return (
              <Group key={obj.object_id} x={x} y={y}>
                <Circle
                  radius={10}
                  fill={getColorByLabels(obj.tag_id)} // TODO: change this later after merging the data
                  shadowBlur={5}
                />
                <Text text={obj.tag_id} fontSize={14} y={-20} x={-20} />
              </Group>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default MapCanvas;
