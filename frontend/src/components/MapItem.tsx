import React from "react";
import { Group } from "react-konva";
import { renderObjectShape } from "../hooks/useShapeDraw";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setSelectedObject } from "../store/map/mapSlice";
import type { MergedObject } from "../types";

const MapItem = React.memo(({ obj }: { obj: MergedObject }) => {
  const dispatch = useAppDispatch();

  const selectedId = useAppSelector((state) => state.map.selectedObjectId);
  const isSelected = selectedId === obj.id;

  return (
    <Group
      onClick={() => {
        console.log("obj", obj);
        dispatch(setSelectedObject(obj.id));
      }}
      x={0}
      y={0}
    >
      {renderObjectShape(obj.labels[0], 3, isSelected)}
    </Group>
  );
});

export default MapItem;
