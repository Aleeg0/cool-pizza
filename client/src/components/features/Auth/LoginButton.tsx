import React from 'react';
import {UiButton} from "@/components/ui";
import {ProfileIcon} from "@/components/icons";

const LoginButton = () => {
  return (
    <UiButton
      caption="Войти"
      icon={<ProfileIcon className="UiKit_icon__transition" />}
      variation="secondary"
    />
  );
};

export default LoginButton;