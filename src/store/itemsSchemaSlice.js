import { createSlice } from "@reduxjs/toolkit";

const itemsSchemaSlice = createSlice({
  name: "itemsSchema",
  initialState: {
    custom_str1_name: "",
    custom_str1_state: false,
    custom_str2_name: "",
    custom_str2_state: false,
    custom_str3_name: "",
    custom_str3_state: false,
    custom_int1_name: "",
    custom_int1_state: false,
    custom_int2_name: "",
    custom_int2_state: false,
    custom_int3_name: "",
    custom_int3_state: false,
    custom_bool1_name: "",
    custom_bool1_state: false,
    custom_bool2_name: "",
    custom_bool2_state: false,
    custom_bool3_name: "",
    custom_bool3_state: false,
    custom_date1_name: "",
    custom_date1_state: false,
    custom_date2_name: "",
    custom_date2_state: false,
    custom_date3_name: "",
    custom_date3_state: false,
    custom_multext1_name: "",
    custom_multext1_state: false,
    custom_multext2_name: "",
    custom_multext2_state: false,
    custom_multext3_name: "",
    custom_multext3_state: false,
  },
  reducers: {
    setField: (state, action) => {
      state[`custom_${action.payload.field}_state`] = action.payload.state;
      state[`custom_${action.payload.field}_name`] = action.payload.name;
    },
    resetFields: (state, action) => {
      state.custom_str1_name = "";
      state.custom_str1_state = false;
      state.custom_str2_name = "";
      state.custom_str2_state = false;
      state.custom_str3_name = "";
      state.custom_str3_state = false;
      state.custom_int1_name = "";
      state.custom_int1_state = false;
      state.custom_int2_name = "";
      state.custom_int2_state = false;
      state.custom_int3_name = "";
      state.custom_int3_state = false;
      state.custom_bool1_name = "";
      state.custom_bool1_state = false;
      state.custom_bool2_name = "";
      state.custom_bool2_state = false;
      state.custom_bool3_name = "";
      state.custom_bool3_state = false;
      state.custom_date1_name = "";
      state.custom_date1_state = false;
      state.custom_date2_name = "";
      state.custom_date2_state = false;
      state.custom_date3_name = "";
      state.custom_date3_state = false;
      state.custom_multext1_name = "";
      state.custom_multext1_state = false;
      state.custom_multext2_name = "";
      state.custom_multext2_state = false;
      state.custom_multext3_name = "";
      state.custom_multext3_state = false;
    },
  },
});

export const { setField, resetFields } = itemsSchemaSlice.actions;

export default itemsSchemaSlice.reducer;
