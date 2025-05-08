import {DefaultState} from "@/store/model/Shared";

interface OrderFormFields {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface OrderFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

interface OrderFrom extends OrderFormFields {
  errors: OrderFormErrors;
}

export type OrderFormField = keyof OrderFormFields;

export type OrderFormState = DefaultState<OrderFrom>;