import {useState} from "react";
import Validator from "@/utils/validator";
import {User} from "./types";
import {updateUser} from "@/store/model/User/thunk";
import {useAppDispatch} from "@/store/lib/hooks";

interface IUserForm {
  phone: string;
  firstName: string;
  lastName: string;
}

const initState = {
  phone: undefined,
  firstName: undefined,
  lastName: undefined,
}

export const useUserForm = (data: User|null) => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<Partial<IUserForm>>({
    ...initState,
    ...data,
  });

  const onReset = () => {
    setForm({...data} as IUserForm);
  }

  const onSave = async () => {
    return await dispatch(updateUser({
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
    })).unwrap();
  }

  const setUserField = (field: keyof IUserForm, value: string) => {
    setForm(p => ({...p, [field]: value}));
  }

  const validateForm = (): string => {
    if (Validator.isNotEmpty(form.phone) && !Validator.isValidPhone(form.phone!)) {
      return "Неверный формат телефона";
    }
    return "";
  }

  return {
    user: form,
    setUserField,
    validateForm,
    onReset,
    onSave
  }
}