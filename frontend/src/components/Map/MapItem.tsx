import React from "react";
import { Group } from "react-konva";
import { renderObjectShape } from "../../hooks/useShapeDraw";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSelectedObject } from "../../store/map/mapSlice";
import type { MergedObject } from "../../types";
import {
  handlePointerDisabled,
  handlePointerEnabled,
} from "../../utils/objectMouseHandler";

const MapItem = React.memo(({ obj }: { obj: MergedObject }) => {
  const dispatch = useAppDispatch();

  const selectedId = useAppSelector((state) => state.map.selectedObjectId);
  const isSelected = selectedId === obj.id;

  return (
    <Group
      onClick={() => {
        dispatch(setSelectedObject(obj.id));
      }}
      x={0}
      y={0}
      onMouseEnter={handlePointerEnabled}
      onMouseLeave={handlePointerDisabled}
    >
      {renderObjectShape(obj.labels[0], 3, isSelected)}
    </Group>
  );
});

export default MapItem;
