'use client';

import styles from '../Auth.module.scss'
import {TitledInput, UiButton} from "@/components/ui";
import {LoadingStatus} from "@/store/types/shared";
import {useRegisterForm} from "@/components/features/Auth/RegisterModal/useRegisterForm";

const RegisterModal = () => {
  const {
    status,
    form,
    changeFromHandlers,
    error,
    handleSubmit
  } = useRegisterForm();

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
              onChange={changeFromHandlers.email}
            />
          </div>
          <div className={styles.AuthModal_input}>
            <TitledInput
              title={'Пароль *'}
              value={form.password}
              onChange={changeFromHandlers.password}
              type="password"
            />
          </div>
          <div className={styles.AuthModal_input}>
            <TitledInput
              title={'Имя'}
              value={form.firstName}
              onChange={changeFromHandlers.firstName}
            />
          </div>
          <div className={styles.AuthModal_input}>
            <TitledInput
              title={'Фамилия'}
              value={form.lastName}
              onChange={changeFromHandlers.lastName}
            />
          </div>
          <div className={styles.AuthModal_input}>
            <TitledInput
              title={'Номер телефона'}
              value={form.phone}
              onChange={changeFromHandlers.phone}
            />
          </div>
          {error &&
            <div className={styles.AuthModal_error}>
              <p>{error}</p>
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