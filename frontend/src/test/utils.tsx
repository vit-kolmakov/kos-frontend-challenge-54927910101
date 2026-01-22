import React from "react";
import type { JSX } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { Reducer } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// Import your specific reducer and types
import mapReducer from "../store/map/mapSlice";
import { store as actualStore } from "../store/store";
import type { RootState } from "../store/store";

type AppStore = typeof actualStore;

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        map: mapReducer as Reducer<RootState["map"] | undefined>,
      },
      preloadedState,
    }) as AppStore,
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
