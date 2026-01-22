import type { PositionsType } from "../types";

export const latestPositions = new Map<string, PositionsType>();

export const updatePositionCache = (data: PositionsType) => {
  latestPositions.set(String(data.object_id), data);
};

export const getPosition = (id: string | number) => {
  return latestPositions.get(String(id));
};
