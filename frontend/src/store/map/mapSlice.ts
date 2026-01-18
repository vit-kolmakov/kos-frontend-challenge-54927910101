import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MapState {
  selectedObjectId: string | number | null;
}

const initialState: MapState = {
  selectedObjectId: null,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setSelectedObject: (
      state,
      action: PayloadAction<string | number | null>,
    ) => {
      state.selectedObjectId = action.payload;
    },
    clearSelection: (state) => {
      state.selectedObjectId = null;
    },
  },
});

export const { setSelectedObject, clearSelection } = mapSlice.actions;
export default mapSlice.reducer;
