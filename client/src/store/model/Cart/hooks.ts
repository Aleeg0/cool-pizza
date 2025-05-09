import {useAppDispatch} from "@/store/lib/hooks";
import {
  getCartTotalAmount,
  removeCartGoods,
  removeCartPizza,
  updateCartGoods,
  updateCartPizza
} from "./thunk";
import {UUID} from "@/store/types/shared";
import {useCallback, useMemo, useState} from "react";
import {OrderFormData, OrderFormErrors, OrderFormField} from "./types";
import {errorMessages} from "./const";


export const useCartActions = () => {
  const dispatch = useAppDispatch();

  const updatePizzaQuantity = (id: UUID, quantity: number) => {
    if (quantity > 0)
      dispatch(updateCartPizza({id: id, quantity: quantity}));
    else
      dispatch(removeCartPizza(id))
  }

  const updateGoodsQuantity = (id: UUID, quantity: number) => {
    if (quantity > 0)
      dispatch(updateCartGoods({id: id, quantity: quantity}));
    else
      dispatch(removeCartGoods(id));
  }

  const updateTotalAmount = () =>
    dispatch(getCartTotalAmount());

  return { updatePizzaQuantity, updateGoodsQuantity, updateTotalAmount };
};

export const useOrderForm = () => {
  const [formData, setFormData] = useState<OrderFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    comment: ''
  });

  const [errors, setErrors] = useState<OrderFormErrors>({});

  const setFieldValue = useCallback((field: OrderFormField, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: OrderFormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = errorMessages.firstName;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = errorMessages.lastName;
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = errorMessages.email;
    }

    if (!formData.phone.trim() ||
      !/^[\d\+][\d\s\-\(\)]{7,}$/.test(formData.phone)) {
      newErrors.phone = errorMessages.phone;
    }

    if (!formData.address.trim()) {
      newErrors.address = errorMessages.address;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData])

  const memoizedErrors = useMemo(() => errors, [
    errors.firstName,
    errors.lastName,
    errors.phone,
    errors.email,
    errors.address,
    errors.comment
  ]);

  const memoizedData = useMemo(() => formData, [
    formData.firstName,
    formData.lastName,
    formData.phone,
    formData.email,
    formData.address,
    formData.comment
  ]);

  return {
    formData: memoizedData,
    errors: memoizedErrors,
    setFieldValue,
    validateForm,
  }
}