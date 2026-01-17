import { Stage, Layer, Text, Group } from "react-konva";
import { toScreenCoordinates, CANVAS_SIZE_PX } from "../utils/coordinates";
import MapBackground from "./MapBackground";
import useApi from "../hooks/useApi";
import type { PoistionsType } from "../types";
import { renderObjectShape } from "../hooks/useShapeDraw";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useRef, useState } from "react";
import Konva from "konva";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Typography } from "@mui/material";
const END_POINT = "/positions"; // Had to move this out to prevent it from re-render
const ZOOM_THRESHOLD = 1.5;
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
  } = useApi<PoistionsType[]>(END_POINT);

  const stageRef = useRef<Konva.Stage>(null);
  const [showLabels, setShowLabels] = useState(false);

  const handleOnScroll = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const scaleBy = 1.1;
    const stage = e.target.getStage();
    if (!stage) return;
    const oldScale = stage?.scaleX() || 1;
    const pointer = stage?.getPointerPosition();
    if (!pointer) return;
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
    stage.scale({ x: newScale, y: newScale });
    stage.position({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });
    const shouldShowLabels = newScale > ZOOM_THRESHOLD;

    if (shouldShowLabels !== showLabels) {
      setShowLabels(shouldShowLabels);
    }
  };

  const handleOnResetClicked = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.to({
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      duration: 0.3,
      easing: Konva.Easings.EaseInOut,
    });
    setShowLabels(false);
  };

  return (
    <Box style={{ border: "2px solid #333", display: "inline-block" }}>
      {isLoading && <CircularProgress color="secondary" />}
      {!isLoading && error && (
        <Typography variant="h4">
          Error while fetching data. Reason : {error.message}{" "}
        </Typography>
      )}
      {!isLoading && (
        <Button
          variant="contained"
          size="small"
          startIcon={<RestartAltIcon />}
          onClick={handleOnResetClicked}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            color: "#333",
            "&:hover": { backgroundColor: "#fff" },
          }}
        >
          Reset View
        </Button>
      )}
      {!isLoading && (
        <Stage
          width={CANVAS_SIZE_PX}
          height={CANVAS_SIZE_PX}
          draggable
          ref={stageRef}
          onWheel={handleOnScroll}
        >
          <MapBackground />
          <Layer>
            {poistionsData?.map((obj) => {
              const { x, y } = toScreenCoordinates(obj.x, obj.y);
              return (
                <Group key={obj.object_id} x={x} y={y}>
                  {renderObjectShape(obj.tag_id, 3)}

                  {showLabels && (
                    <Text text={obj.tag_id} fontSize={14} y={-20} x={-20} />
                  )}
                </Group>
              );
            })}
          </Layer>
        </Stage>
      )}
    </Box>
  );
};

export default MapCanvas;
