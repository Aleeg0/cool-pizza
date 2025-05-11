'use client';

import ProfileButton from "./ProfileButton";
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {logout, selectUser} from "@/store/model/User";
import {useRouter} from "next/navigation";
import {ProfileIcon} from "@/components/icons";
import {UiButton} from "@/components/ui";
import {LoadingStatus} from "@/store/types/shared";

export const AuthButton = () => {
  const {data, status} = useAppSelector(selectUser);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onLoginButtonClick = () => {
    router.push("/login");
  }

  const onOrderClick = () => {
    router.push("/order");
  }

  const onSettingsClick = () => {
    router.push("/user");
  }

  const onLogoutClick = () => {
    dispatch(logout());
  }

  if (data) {
    return (
      <ProfileButton
        onSettings={onSettingsClick}
        onOrders={onOrderClick}
        onLogout={onLogoutClick}
      />
    );
  }

  return (
    <UiButton
      caption="Войти"
      icon={<ProfileIcon className="UiKit_icon__transition" />}
      type="secondary"
      onClick={onLoginButtonClick}
      disabled={status === LoadingStatus.PENDING}
    />
  );
};