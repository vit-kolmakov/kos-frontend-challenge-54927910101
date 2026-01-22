import { Stage, Layer, Text, Group } from "react-konva";
import { toScreenCoordinates, CANVAS_SIZE_PX } from "../utils/coordinates";
import MapBackground from "./MapBackground";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useMemo, useRef, useState } from "react";
import Konva from "konva";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Typography } from "@mui/material";
import MapItem from "./MapItem";
import useStreamData from "../hooks/useStreamData";
import MapLegend from "./MapLegend";
import type { MergedObject } from "../types";

interface MapCanvasProps {
  data: MergedObject[];
  error: Error | null;
  isLoading: boolean;
}

const MapCanvas = ({ data, isLoading, error }: MapCanvasProps) => {
  console.log("in Map Canvas");

  const nodeRegistry = useRef<Record<string, Konva.Group>>({});

  useStreamData({ registry: nodeRegistry });

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

  const renderedObjects = useMemo(() => {
    return data?.map((obj) => {
      const initialPos = toScreenCoordinates(obj.x, obj.y);
      return (
        <Group
          key={obj.id}
          ref={(node) => {
            if (!node) {
              delete nodeRegistry.current[String(obj.id)];
              return;
            }
            const idKey = String(obj.id);
            nodeRegistry.current[idKey] = node;
            const isInitialized = node.getAttr("isInitialized");
            if (!isInitialized) {
              node.position({ x: initialPos.x, y: initialPos.y });
              node.rotation(obj.angle || 0);
              node.setAttr("isInitialized", true);
            }
          }}
        >
          <MapItem obj={obj} />
          {showLabels && (
            <Text
              text={obj.name}
              fontSize={6}
              y={-20}
              x={-20}
              fill="#4c4545"
              listening={false}
            />
          )}
        </Group>
      );
    });
  }, [data, showLabels]);

  return (
    <Box
      style={{
        border: "2px solid #333",
        display: "inline-block",
        position: "relative",
      }}
    >
      {isLoading && (
        <Box
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          top={0}
          left={0}
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            zIndex: 20,
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {!isLoading && error && (
        <Typography variant="h4">
          Error while fetching data. Reason : {error.message}
        </Typography>
      )}
      {!isLoading && (
        <>
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
          <MapLegend />
        </>
      )}
      <Stage
        width={CANVAS_SIZE_PX}
        height={CANVAS_SIZE_PX}
        onWheel={handleOnScroll}
      >
        <Layer ref={objectLayerRef} draggable>
          <MapBackground />
          {renderedObjects}
        </Layer>
      </Stage>
    </Box>
  );
};

export default MapCanvas;
