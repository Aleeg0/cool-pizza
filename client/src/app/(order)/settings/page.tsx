'use client';

import React, {useEffect} from 'react';
import styles from "../Orders.module.scss";
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {getUser, selectUser} from "@/store/model/User";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {LoadingStatus} from "@/store/types/shared";
import {UserWidget} from "@/components/entities/User";

const SettingsPage = () => {
  const {data: user, status, error} = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const isLoading = [LoadingStatus.IDLE, LoadingStatus.PENDING].includes(status);

  if (isLoading) {
    return null;
  }

  const isAuth = status === LoadingStatus.FAILED && error && error!.includes("401");

  if (isAuth) {
    router.push('/');
    toast("Авторизуйтесь сначало!", {icon: "⚠️",});
    return;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Персональная информация</h1>
        </div>
        {status === LoadingStatus.SUCCEEDED &&
          <UserWidget user={user!}/>
        }
      </div>
    </div>
  );
};

export default SettingsPage;