'use client';

import {useCallback, useMemo, useState} from 'react';
import styles from '../Auth.module.scss';
import {InlineButton, TitledInput, UiButton} from "@/components/ui";
import {PhoneIcon} from "@/components/icons";
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {login, selectUser} from "@/store/model/User";
import {LoadingStatus} from "@/store/types/shared";

type formData = {
  email: string;
  password: string;
}

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const {error, status} = useAppSelector(selectUser);
  const router = useRouter();
  const [form, setForm] = useState<formData>({
    email: "",
    password: "",
  })

  const onRedirectToRegister = useCallback(() => {
    router.replace("/register");
  }, [router]);

  const formChangeHandlers = useMemo(() => ({
    email: (value: string) => setForm(prev => ({...prev, email: value })),
    password: (value: string) => setForm(prev => ({...prev, password: value })),
  }), []);

  const onLogin = useCallback(() => {
    dispatch(login(form)).then((result) => {
      if (login.fulfilled.match(result)) {
        router.back();
      }
    });
  },[dispatch, form, router])

  return (
    <div className={styles.AuthModal_container}>
      <div className={styles.AuthModal_content}>
        <div className={styles.LoginModal_header}>
          <div className={styles.LoginModal_text}>
            <div className={styles.AuthModal_title}>
              <h2>Вход в аккаунт</h2>
            </div>
            <div className={styles.AuthModal_description}>
              <p>Введите почту и пароль, чтобы войти</p>
            </div>
          </div>
          <div className={styles.LoginModal_icon}>
            <PhoneIcon/>
          </div>
        </div>
        <div className={styles.AuthModal_inputs}>
          <div className={styles.AuthModal_input}>
            <TitledInput
              title={"E-mail"}
              value={form.email}
              onChange={formChangeHandlers.email}
            />
          </div>
          <div className={styles.AuthModal_input}>
            <TitledInput
              title={"Пароль"}
              value={form.password}
              onChange={formChangeHandlers.password}
              type="password"
            />
          </div>
          {error &&
            <div className={styles.AuthModal_error}>
              <p>Неверный данные!</p>
            </div>
          }
        </div>
        <div className={styles.LoginModal_button}>
          <UiButton
            onClick={onLogin}
            caption="Войти"
            isFullWidth
            disabled={status === LoadingStatus.PENDING}
          />
        </div>
        <div className={styles.AuthModal_linkButton}>
          <InlineButton
            onClick={onRedirectToRegister}
            caption={"Нет аккаунта? Зарегестрирйтесь!"}
            withAnimation
          />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;