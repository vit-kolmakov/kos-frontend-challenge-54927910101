import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../test/utils";
import ObjectDetails from "../ObjectDetails";
import type { MergedObject } from "../../../types";

vi.mock("../LabelIcon", () => ({
  default: () => <div data-testid="mock-label-icon" />,
}));

vi.mock("../LiveObjectData", () => ({
  default: () => <div data-testid="mock-live-data" />,
}));

const mockData: MergedObject[] = [
  {
    id: 222,
    labels: ["container"],
    name: "container-222",
    properties: {
      capacity: "468",
      fill_level: "6",
      material_type: "components",
      status: "idle",
      temperature: "24.0",
      zone: "Zone-C",
    },
    location: [0, 0],
    x: 0,
    y: 0,
    angle: 0,
  } as MergedObject,
];

describe("ObjectDetails Basic Flow", () => {
  it("renders object details correctly and handles close action", () => {
    const { store } = renderWithProviders(<ObjectDetails data={mockData} />, {
      preloadedState: {
        map: { selectedObjectId: 222 },
      },
    });

    expect(
      screen.getByRole("heading", { name: "container-222" }),
    ).toBeInTheDocument();
    expect(screen.getByText("container")).toBeInTheDocument();

    expect(screen.getByText("Fill Level")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();

    expect(screen.getByText("Material Type")).toBeInTheDocument();
    expect(screen.getByText("components")).toBeInTheDocument();

    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("idle")).toBeInTheDocument();

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(store.getState().map.selectedObjectId).toBeNull();
  });
});
