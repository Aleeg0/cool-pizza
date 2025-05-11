'use client';

import React, {useCallback, useMemo, useState} from 'react';
import styles from '../Auth.module.scss'
import {TitledInput, UiButton} from "@/components/ui";
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {register, selectUser} from "@/store/model/User";
import {useRouter} from "next/navigation";
import {LoadingStatus} from "@/store/types/shared";

type formData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const RegisterModal = () => {
  const dispatch = useAppDispatch();
  const {error, status} = useAppSelector(selectUser);
  const router = useRouter();
  const [form, setForm] = useState<formData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: ""
  });

  const changeHandlers = useMemo(() => ({
    email: (value: string) => setForm(prev => ({ ...prev, email: value })),
    password: (value: string) => setForm(prev => ({ ...prev, password: value })),
    firstName: (value: string) => setForm(prev => ({ ...prev, firstName: value })),
    lastName: (value: string) => setForm(prev => ({ ...prev, lastName: value })),
    phone: (value: string) => setForm(prev => ({ ...prev, phone: value })),
  }), []);

  const handleSubmit = useCallback(() => {
    dispatch(register(form)).then((result) => {
      if (register.fulfilled.match(result)) {
        router.back();
      }
    });
  }, [dispatch, form, router]);

  return (
    <div className={styles.AuthModal_container}>
      <div className={styles.AuthModal_content}>
        <div className={styles.RegisterModal_header}>
          <div className={styles.AuthModal_title}>
            <h2>Регистрация</h2>
          </div>
          <div className={styles.AuthModal_description}>
            <p>Введите данные для регистрации</p>
          </div>
        </div>
        <div className={styles.AuthModal_inputs}>
          <div className={styles.AuthModal_input}>
            <TitledInput
              title={'E-mail *'}
              value={form.email}
              onChange={changeHandlers.email}
            />
          </div>
          <div className={styles.AuthModal_input}>
            <TitledInput
              title={'Пароль *'}
              value={form.password}
              onChange={changeHandlers.password}
              type="password"
            />
          </div>
          <div className={styles.AuthModal_input}>
            <TitledInput
              title={'Имя'}
              value={form.firstName}
              onChange={changeHandlers.firstName}
            />
          </div>
          <div className={styles.AuthModal_input}>
            <TitledInput
              title={'Фамилия'}
              value={form.lastName}
              onChange={changeHandlers.lastName}
            />
          </div>
          <div className={styles.AuthModal_input}>
            <TitledInput
              title={'Номер телефона'}
              value={form.phone}
              onChange={changeHandlers.phone}
            />
          </div>
          {error &&
            <div className={styles.AuthModal_error}>
              <p>Пользователь с таким e-mail сущесвтует!</p>
            </div>
          }
        </div>
        <div className={styles.AuthModal_mainButton}>
          <UiButton
            onClick={handleSubmit}
            caption={"Зарегестрироваться"}
            isFullWidth
            disabled={status === LoadingStatus.PENDING}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;