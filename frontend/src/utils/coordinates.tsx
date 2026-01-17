const MAP_SIZE_METERS = 100;

export const CANVAS_SIZE_PX = 800;

const SCALE = CANVAS_SIZE_PX / MAP_SIZE_METERS;

export const toScreenCoordinates = (x: number, y: number) => {
  return {
    x: x * SCALE,
    y: CANVAS_SIZE_PX - y * SCALE,
  };
};
