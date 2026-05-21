import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskSearch: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setTaskSearch(state, action) {
      state.taskSearch = action.payload || "";
    },
    clearTaskSearch(state) {
      state.taskSearch = "";
    },
  },
});

export const { setTaskSearch, clearTaskSearch } = filtersSlice.actions;
export default filtersSlice.reducer;


