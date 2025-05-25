import styles from './styles.module.scss';
import {InlineButton, TitledInput, UiButton} from "@/components/ui";
import {FC, useMemo} from "react";
import {User} from "@/store/model/User";
import toast from "react-hot-toast";
import {useUserForm} from "@/store/model/User/hooks";

interface Props {
  user: User;
}

const Widget: FC<Props> = ({user}) => {
  const {
    user: localUser,
    setUserField,
    validateForm,
    onReset,
    onSave
  } = useUserForm(user);

  const handlers = useMemo(() => ({
    phone: (value: string) => setUserField("phone", value),
    firstName: (value: string) => setUserField("firstName", value),
    lastName: (value: string) => setUserField("lastName", value)
  }), [setUserField])

  const onClick = async () => {
    const error = validateForm();
    if (error !== ""){
      toast.error(error);
      return;
    }

    try {
      await onSave();
      toast.success("Информация успешно сохранена!");
    }
    catch (error) {
      toast.error("");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_leftPart}>
          <h2>Персональная информация</h2>
        </div>
        <div className={styles.header_rightPart}>
          <InlineButton
            caption={"сбросить"}
            onClick={onReset}
          />
          <UiButton
            onClick={onClick}
            caption={"Сохранить"}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.inputs}>
          <div className={styles.input}>
            <TitledInput
              title={"E-mail"}
              value={user.email ?? ""}
              onChange={() => {}}
              readOnly={true}
            />
          </div>
          <div className={styles.input}>
            <TitledInput
              title={"Телефон"}
              value={localUser.phone ?? ""}
              onChange={handlers.phone}
            />
          </div>
          <div className={styles.input}>
            <TitledInput
              title={"Имя"}
              value={localUser.firstName ?? ""}
              onChange={handlers.firstName}
            />
          </div>
          <div className={styles.input}>
            <TitledInput
              title={"Фамилия"}
              value={localUser.lastName ?? ""}
              onChange={handlers.lastName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;