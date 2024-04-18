import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type modalMessageStateType = {
  status: "succeeded" | "failed";
  title: string | null;
  visible: boolean;
  buttonName: string | null;
  description: string | null;
  redirectAfterClose?: string;
};

const modalMessageState: modalMessageStateType = {
  status: "succeeded",
  title: null,
  visible: false,
  buttonName: null,
  description: null,
  redirectAfterClose: "",
};

const modalMessageSlice = createSlice({
  name: "modalMessage",
  initialState: modalMessageState,
  reducers: {
    showModalMessage: (state, action: PayloadAction<modalMessageStateType>) => {
      state.status = action.payload.status;
      state.title = action.payload.title;
      state.visible = action.payload.visible;
      state.buttonName = action.payload.buttonName;
      state.description = action.payload.description;
      state.redirectAfterClose = action.payload.redirectAfterClose;
    },
    closeModalMessage: (state) => {
      state.visible = false;
      state = modalMessageState;
    },
  },
});

export const { showModalMessage, closeModalMessage } =
  modalMessageSlice.actions;

export default modalMessageSlice.reducer;
