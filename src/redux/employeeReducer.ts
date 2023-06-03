import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DatePickerType } from "antd/es/date-picker";

export interface Employee {
  article: string;
  name: string;
  surname: string;
  birthday?: string;
  nationality: string;
  idCardNumber: string;
  gender: string;
  phoneNumber: string;
  passportNumber: string;
  salary: string;
}
export interface EmployeesState {
  data: Array<Employee>;
}

const initialState: EmployeesState = {
  data: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addInfo: (state, action: PayloadAction<Employee>) => {
      state.data.push(action.payload);
    },
    setEmployees: (state, action: PayloadAction<[Employee]>) => {
      state.data = [...action.payload];
    },
    mutipleRemove: (state, action: PayloadAction<number[]>) => {
      const newData = state.data.filter(
        (value, index) => action.payload.indexOf(index) == -1
      );
      state.data = [...newData];
    },
    // changeIncrementAmount: (state, action: PayloadAction<number>) => {
    //   state.incrementAmount = action.payload
    // },
  },
});

export const { addInfo, setEmployees, mutipleRemove } = employeeSlice.actions;

export default employeeSlice.reducer;
