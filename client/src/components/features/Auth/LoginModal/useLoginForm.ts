import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {login, selectUser} from "@/store/model/User";
import {useRouter} from "next/navigation";
import {useCallback, useMemo, useState} from "react";
import Validator from "@/utils/validator";
import toast from "react-hot-toast";

export interface LoginFormData {
  email: string;
  password: string;
}

const initialState: LoginFormData = {
  email: "",
  password: "",
}

export const useLoginForm = () => {
  // routing
  const router = useRouter();
  const onRedirect = useCallback(() => {
    router.replace("/register");
  }, [router]);

  // form
  const [form, setForm] = useState<LoginFormData>(initialState);
  const [validationError, setValidationError] = useState<string|null>(null);

  const formChangeHandlers = useMemo(() => ({
    email: (value: string) => {
      setForm(prev => ({...prev, email: value}));
      setValidationError(null);
    },
    password: (value: string) => {
      setForm(prev => ({...prev, password: value}));
      setValidationError(null);
    },
  }), []);

  // redux
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(selectUser);
  const onLogin = useCallback(async () => {
    // validations
    if (!Validator.isValidEmail(form.email)) {
      setValidationError("Некорректный e-mail");
      return;
    }

    if (!Validator.isValidPassword(form.password)) {
      setValidationError(`Пароль должен содержать минимум ${Validator.PASSWORD_MIN_LENGTH} символов`);
      return;
    }

    // request
    try {
      await dispatch(login(form)).unwrap();
      router.back();
      toast.success("Вы зошли в аккаунт!");
    }
    catch (error) {
      setValidationError(error as string);
    }
  },[dispatch, form, router])

  return {
    onRedirect,
    form,
    formChangeHandlers,
    validationError,
    onLogin,
    status,
  };
}