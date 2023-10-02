
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  view: string;
}

const initialState: SidebarState = {
  view: 'holidays', // Opción por defecto
};

const SidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSelectedOption: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
    },
  },
});

export const { setSelectedOption } = SidebarSlice.actions;
export default SidebarSlice.reducer;
