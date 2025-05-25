import React, {FC} from 'react';
import styles from './Auth.module.scss'

interface Props {
  onSettings: () => void;
  onOrders: () => void;
  onLogout: () => void;
}

const ProfilePopup: FC<Props> = ({
  onSettings,
  onOrders,
  onLogout
}) => {
  const options = [
    {value: "Настройки", onClick: onSettings},
    {value: "Заказы", onClick: onOrders},
    {value: "Выйти", onClick: onLogout}
  ];

  return (
    <div className={styles.ProfilePopup_options}>
      {options.map((option, index) =>
        <button
          className={styles.ProfilePopup_option}
          onClick={option.onClick}
          key={index}
        >
          {option.value}
        </button>
      )}
    </div>
  );
};

export default ProfilePopup;