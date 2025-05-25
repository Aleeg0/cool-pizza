'use client';

import styles from '../Auth.module.scss';
import {InlineButton, TitledInput, UiButton} from "@/components/ui";
import {PhoneIcon} from "@/components/icons";
import {LoadingStatus} from "@/store/types/shared";
import {useLoginForm} from "@/components/features/Auth/LoginModal/useLoginForm";

const LoginModal = () => {
  const {
    status,
    form,
    formChangeHandlers,
    validationError,
    onLogin,
    onRedirect,
  } = useLoginForm();

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
          {validationError &&
            <div className={styles.AuthModal_error}>
              <p>{validationError}</p>
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
            onClick={onRedirect}
            caption={"Нет аккаунта? Зарегестрирйтесь!"}
            withAnimation
          />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;