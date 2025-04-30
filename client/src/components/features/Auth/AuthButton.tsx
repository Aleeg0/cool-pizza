import React, {useState} from 'react';
import LoginButton from "./LoginButton";
import ProfileButton from "./ProfileButton";

export const AuthButton = () => {
  const [isAuth, setIsAuth] = useState(false);

  return isAuth ? <LoginButton/> : <ProfileButton/>;
};