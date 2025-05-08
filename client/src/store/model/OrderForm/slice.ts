import {OrderFormField, OrderFormState} from "@/store/model/OrderForm/types";
import {LoadingStatus} from "@/store/types/shared";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: OrderFormState = {
  data: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    errors: {}
  },
  status: LoadingStatus.IDLE,
  error: undefined
};

const orderFormSlice = createSlice({
  name: "orderForm",
  initialState,
  reducers: {
    setOrderFormFieldValue: (state, action: PayloadAction<{field: OrderFormField; value: string}>) => {
      const { field, value } = action.payload;
      state.data[field] = value;
      // Очищаем ошибку при изменении поля
      if (field in state.data.errors) {
        delete state.data.errors[field];
      }
    },
    validateOrderForm: (state) => {
      // Валидация всех полей
      const data = state.data;
      const newErrors: typeof data.errors = {};

      if (!data.firstName.trim()) {
        newErrors.firstName = 'Введите имя';
      }

      if (!data.lastName.trim()) {
        newErrors.lastName = 'Введите фамилию';
      }

      if (!data.email.trim()) {
        newErrors.email = 'Введите email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        newErrors.email = 'Некорректный email';
      }

      if (!data.phoneNumber.trim()) {
        newErrors.phoneNumber = 'Введите телефон';
      } else if (!/^[\d\+][\d\s\-\(\)]{7,}$/.test(data.phoneNumber)) {
        newErrors.phoneNumber = 'Некорректный телефон';
      }

      data.errors = newErrors;

      // Если есть ошибки, очищаем невалидные поля
      if (Object.keys(newErrors).length > 0) {
        for (const field in newErrors) {
          const key = field as keyof typeof newErrors;
          data[key] = '';
        }
      }
    }
  },
  extraReducers: (builder) => {

  }
});

export const {
  setOrderFormFieldValue,
  validateOrderForm
} = orderFormSlice.actions;

export default orderFormSlice.reducer;