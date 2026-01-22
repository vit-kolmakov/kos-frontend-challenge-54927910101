import type Konva from "konva";

export const handlePointerEnabled = (e: Konva.KonvaEventObject<MouseEvent>) => {
  const stage = e.target.getStage();
  if (stage) stage.container().style.cursor = "pointer";
};

export const handlePointerDisabled = (
  e: Konva.KonvaEventObject<MouseEvent>,
) => {
  const stage = e.target.getStage();
  if (stage) stage.container().style.cursor = "default";
};
