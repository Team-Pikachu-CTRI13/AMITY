import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  hasPartner: null,
  id: null,
  page: null,
  picture: null,
  sub: null,
  partnerInfo: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    actionSetField: (state, action) => {
      const { field, value } = action.payload;
      if (Object.keys(state).includes(field) === false) return; // validate field: don't do anything if invalid field
      state[field] = value;
      // console.log('in userSlice', state[field], state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { actionSetField } = userSlice.actions;

export default userSlice.reducer;
