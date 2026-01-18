import { Stage, Layer, Text, Group } from "react-konva";
import { toScreenCoordinates, CANVAS_SIZE_PX } from "../utils/coordinates";
import MapBackground from "./MapBackground";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useRef, useState } from "react";
import Konva from "konva";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Typography } from "@mui/material";
import useMergeData from "../hooks/useMergeData";
import MapItem from "./MapItem";

const MapCanvas = () => {
  const { mergedData, isLoading, error } = useMergeData();

  //   const stageRef = useRef<Konva.Stage>(null);
  const objectLayerRef = useRef<Konva.Layer>(null);
  const [showLabels, setShowLabels] = useState(false);

  const handleOnScroll = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const layer = objectLayerRef.current;
    const stage = e.target.getStage();
    if (!layer || !stage) return;

    const scaleBy = 1.1;
    const oldScale = layer.scaleX();

    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - layer.x()) / oldScale,
      y: (pointer.y - layer.y()) / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    layer.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    layer.position(newPos);
    stage.batchDraw();

    if (newScale > 1.5 !== showLabels) {
      setShowLabels(newScale > 1.5);
    }
  };

  const handleOnResetClicked = () => {
    const objectlayer = objectLayerRef.current;
    if (!objectlayer) return;
    objectlayer.to({
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
          onWheel={handleOnScroll}
        >
          <Layer ref={objectLayerRef} draggable>
            <MapBackground />
            {mergedData?.map((obj) => {
              const { x, y } = toScreenCoordinates(obj.x, obj.y);
              return (
                <Group key={obj.id} x={x} y={y}>
                  <MapItem obj={obj} />
                  {showLabels && (
                    <Text
                      text={obj.name}
                      fontSize={11}
                      y={-20}
                      x={-20}
                      fill="#4c4545"
                      listening={false}
                    />
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
