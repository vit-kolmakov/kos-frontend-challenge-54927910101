import type { MergedObject, ObjectType, PositionsType } from "../types";
import useApi from "./useApi";
const END_POINT = "/positions";

const useMergeData = () => {
  const {
    isLoading: isPositionsLoading,
    error: positionError,
    data: positionData,
  } = useApi<PositionsType[]>(END_POINT);

  const {
    isLoading: isObjectsLoading,
    error: objectsError,
    data: objectsData,
  } = useApi<ObjectType[]>("/objects");

  const mergedData: MergedObject[] = (objectsData || []).map((object) => {
    const positionOfObject = (positionData || []).find(
      (position) => position.object_id === object.id,
    );
    return {
      ...object,
      x: positionOfObject ? positionOfObject.x : 0,
      y: positionOfObject ? positionOfObject.y : 0,
      angle: positionOfObject ? positionOfObject.a : 0,
      ...positionOfObject,
    };
  });

  return {
    mergedData,
    isLoading: isObjectsLoading || isPositionsLoading,
    error: positionError || objectsError,
  };
};

export default useMergeData;
