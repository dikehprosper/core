import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const sampleClient = {
  value: {
    userData: {
      id: "user_12345",
      firstName: "Michael",
      lastName: "Adeyemi",
      email: "michael@example.com",
    },
    codeNotifier: {
      showCodeNotifier: false,
      codeValue: "",
    },
  },
};

interface ClientState {
  userData: any | null;
  isAuthChecked: boolean; 
}

const initialState: ClientState = {
  userData: null,
  isAuthChecked: false,
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
   updateClientData: (state, action: PayloadAction<{ userData: any; isAuthChecked?: boolean }>) => {
  state.userData = action.payload.userData;
  if (action.payload.isAuthChecked !== undefined) {
    state.isAuthChecked = action.payload.isAuthChecked;
  }
}
,
    clearClientData: (state) => {
      state.userData = null;
      state.isAuthChecked = false;
    },
  },
});

export const { updateClientData, clearClientData } = clientSlice.actions;
export default clientSlice.reducer;