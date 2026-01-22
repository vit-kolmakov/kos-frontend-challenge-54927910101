import { renderHook } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  type MockedFunction,
} from "vitest";
import useMergeData from "../useMergeData";
import useApi from "../useApi";
import type { ObjectType, PositionsType } from "../../types/index";

vi.mock("../useApi");
const mockUseApi = useApi as MockedFunction<typeof useApi>;

type TestApiResult = {
  isLoading: boolean;
  data: ObjectType[] | PositionsType[] | null;
  error: Error | null;
};
type RealApiReturn = ReturnType<typeof useApi>;
const mockObjects: ObjectType[] = [
  {
    id: 115,
    labels: ["order"],
    name: "order-115",
    properties: {
      customer: "ACME Corp",
      due_date: "2026-02-04",
      item_count: "31",
      order_id: "ORD-927599",
      priority: "medium",
      status: "processing",
      zone: "Zone-B",
    },
  },
  {
    id: 232,
    labels: ["container"],
    name: "container-232",
    properties: {
      capacity: "468",
      fill_level: "6",
      material_type: "components",
      status: "in_transit",
      temperature: "24.0",
      zone: "Zone-C",
    },
  },
];

const mockPositions: PositionsType[] = [
  {
    object_id: 115,
    x: 67.72,
    y: 75.15,
    a: -187.47,
    altitude: 520,
    b: 0,
    c: 0,
    battery: { percentage: 0, percentage_last_update: "" },
    flags: [],
    is_valid: true,
    latitude: 48.13,
    longitude: 11.58,
    source_id: 3,
    tag_id: "order-115",
    tenant_id: 1,
    timestamp: "2026-01-22",
    z: 0,
  },
  {
    object_id: 999,
    x: 10,
    y: 20,
    a: 0,
    altitude: 0,
    b: 0,
    c: 0,
    battery: { percentage: 0, percentage_last_update: "" },
    flags: [],
    is_valid: true,
    latitude: 0,
    longitude: 0,
    source_id: 0,
    tag_id: "ghost",
    tenant_id: 1,
    timestamp: "",
    z: 0,
  },
];

describe("useMergeData Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should correctly merge objects when a position is found", () => {
    mockUseApi.mockImplementation((endpoint) => {
      if (endpoint === "/objects") {
        const res: TestApiResult = {
          isLoading: false,
          data: mockObjects,
          error: null,
        };
        // Cast to match the full React Query return type
        return res as unknown as RealApiReturn;
      }

      if (endpoint === "/positions") {
        const res: TestApiResult = {
          isLoading: false,
          data: mockPositions,
          error: null,
        };
        // Cast to match the full React Query return type
        return res as unknown as RealApiReturn;
      }

      // Default fallback
      const fallback: TestApiResult = {
        isLoading: false,
        data: null,
        error: null,
      };
      return fallback as unknown as RealApiReturn;
    });

    const { result } = renderHook(() => useMergeData());

    expect(result.current.isLoading).toBe(false);

    const mergedItem = result.current.mergedData.find((o) => o.id === 115);

    expect(mergedItem).toBeDefined();
    expect(mergedItem?.x).toBe(67.72);
    expect(mergedItem?.y).toBe(75.15);
    expect(mergedItem?.angle).toBe(-187.47);
    expect(mergedItem?.latitude).toBe(48.13);
  });

  it("should use default values (0) when no position is found for an object", () => {
    mockUseApi.mockImplementation((endpoint) => {
      if (endpoint === "/objects") {
        const res: TestApiResult = {
          isLoading: false,
          data: mockObjects,
          error: null,
        };
        return res as unknown as RealApiReturn;
      }

      if (endpoint === "/positions") {
        const res: TestApiResult = {
          isLoading: false,
          data: mockPositions,
          error: null,
        };
        return res as unknown as RealApiReturn;
      }

      const fallback: TestApiResult = {
        isLoading: false,
        data: null,
        error: null,
      };
      return fallback as unknown as RealApiReturn;
    });

    const { result } = renderHook(() => useMergeData());

    const orphanItem = result.current.mergedData.find((o) => o.id === 232);

    expect(orphanItem).toBeDefined();
    expect(orphanItem?.x).toBe(0);
    expect(orphanItem?.y).toBe(0);
    expect(orphanItem?.angle).toBe(0);
  });

  it("should return loading state if positions are still loading", () => {
    mockUseApi.mockImplementation((endpoint) => {
      if (endpoint === "/positions") {
        const res: TestApiResult = {
          isLoading: true,
          data: null,
          error: null,
        };
        return res as unknown as RealApiReturn;
      }

      if (endpoint === "/objects") {
        const res: TestApiResult = {
          isLoading: false,
          data: mockObjects,
          error: null,
        };
        return res as unknown as RealApiReturn;
      }

      const fallback: TestApiResult = {
        isLoading: false,
        data: null,
        error: null,
      };
      return fallback as unknown as RealApiReturn;
    });

    const { result } = renderHook(() => useMergeData());
    expect(result.current.isLoading).toBe(true);
  });

  it("should return error if fetching objects fails", () => {
    const mockError = new Error("Failed to fetch objects");

    mockUseApi.mockImplementation((endpoint) => {
      if (endpoint === "/objects") {
        const res: TestApiResult = {
          isLoading: false,
          data: null,
          error: mockError,
        };
        return res as unknown as RealApiReturn;
      }
      const fallback: TestApiResult = {
        isLoading: false,
        data: [],
        error: null,
      };
      return fallback as unknown as RealApiReturn;
    });

    const { result } = renderHook(() => useMergeData());
    expect(result.current.error).toBe(mockError);
  });
});
