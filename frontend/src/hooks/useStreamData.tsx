import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type { PositionsType } from "../types";
import Konva from "konva";
import { toScreenCoordinates } from "../utils/coordinates";
import { updatePositionCache } from "../store/eventDataStore";

interface UseStreamDataParams {
  registry: RefObject<Record<string, Konva.Group>>;
}

const useStreamData = ({ registry }: UseStreamDataParams) => {
  const [error, setError] = useState<string | null>(null);
  const initializedIds = useRef<Set<number>>(new Set());

  const lastUpdateTimes = useRef<Record<string, number>>({});

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8080/api/positions/stream",
    );

    eventSource.onerror = (err) => {
      console.error("SSE Connection Error:", err);
      setError(
        "Unable to fetch live updates. You are viewing a static snapshot; please refresh to retry.",
      );
      eventSource.close();
    };

    eventSource.onopen = () => {
      setError(null);
    };
    eventSource.onmessage = (event) => {
      try {
        const data: PositionsType = JSON.parse(event.data);
        const idKey = String(data.object_id);
        updatePositionCache(data);

        const now = Date.now();
        const lastTime = lastUpdateTimes.current[idKey] || now;
        const gapInSeconds = (now - lastTime) / 1000;
        lastUpdateTimes.current[idKey] = now;

        const node = registry.current?.[idKey];

        const { x, y } = toScreenCoordinates(data.x, data.y);

        if (node) {
          if (document.hidden) {
            node.position({ x, y });
            if (data.a !== undefined) node.rotation(data.a);
            return;
          }
          const targetOpacity = data.is_valid === false ? 0.2 : 1;

          const currentX = node.x();
          const currentY = node.y();
          const distance = Math.sqrt(
            Math.pow(x - currentX, 2) + Math.pow(y - currentY, 2),
          );
          const isActuallyABug = distance > 1500;
          if (isActuallyABug) {
            node.position({ x, y });
          } else {
            const animDuration =
              gapInSeconds > 1 ? Math.min(gapInSeconds, 2.5) : 0.4;

            node.to({
              x: x,
              y: y,
              rotation: data.a,
              opacity: targetOpacity,
              duration: animDuration,
              easing: Konva.Easings.Linear,
            });
          }

          initializedIds.current.add(data.object_id);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Data processing error";
        setError(errorMessage);
        console.error("SSE Parse Error", err);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [registry]);

  return { error };
};

export default useStreamData;
