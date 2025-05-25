import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {register, selectUser} from "@/store/model/User";
import {useRouter} from "next/navigation";
import {useCallback, useMemo, useState} from "react";
import Validator from "@/utils/validator";
import toast from "react-hot-toast";

export interface formData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const initialState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phone: ""
};

export const useRegisterForm = () => {
  // form
  const [form, setForm] = useState<formData>(initialState);
  const [error, setError] = useState<string|null>(null);


  const changeFromHandlers = useMemo(() => ({
    email: (value: string) => setForm(prev => ({ ...prev, email: value })),
    password: (value: string) => setForm(prev => ({ ...prev, password: value })),
    firstName: (value: string) => setForm(prev => ({ ...prev, firstName: value })),
    lastName: (value: string) => setForm(prev => ({ ...prev, lastName: value })),
    phone: (value: string) => setForm(prev => ({ ...prev, phone: value })),
  }), []);

  // redux
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(selectUser);
  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    // validations
    if (!Validator.isValidEmail(form.email)) {
      setError("Некорректный e-mail");
      return;
    }
    if (!Validator.isValidPassword(form.password)) {
      setError(`Пароль должен содержать минимум ${Validator.PASSWORD_MIN_LENGTH} символов`);
      return;
    }
    if (Validator.isNotEmpty(form.phone) && !Validator.isValidPhone(form.phone)) {
      setError(`Неверный формат телефона`);
      return;
    }

    // request
    try{
      await dispatch(register(form)).unwrap();
      router.back();
      toast.success("Успешно зарегестрирован!")
    }
    catch(error){
      setError(error as string);
    }
  }, [dispatch, form, router]);

  return {
    status,
    form,
    changeFromHandlers,
    error,
    handleSubmit
  }
}