'use client';

import React from 'react';
import styles from './styles.module.scss'
import PersonalInfoWidget from "@/components/features/OrderFrom/PersonalInfoWidget/PersonalInfoWidget";
import {OrderFormSelectors} from "@/store/model/OrderForm/selectors";
import {useAppSelector} from "@/store/lib/hooks";
import BlockContainer from "@/components/features/OrderFrom/BlockContainer/BlockContainer";

const PersonalInfoBlock = () => {
  const {firstName, lastName, phoneNumber, email, errors} = useAppSelector(OrderFormSelectors);

  return (
    <BlockContainer
      title="2. Персональная информация"
    >
      <div className={styles.content}>
        <div className={styles.widgets}>
          <div className={styles.widget}>
            <PersonalInfoWidget
              field="firstName"
              value={firstName}
              error={errors.firstName}
              title="Имя"
              type="text"
              placeholder={"Иван"}
            />
          </div>
          <div className={styles.widget}>
            <PersonalInfoWidget
              field="lastName"
              value={lastName}
              error={errors.lastName}
              title="Фамилия"
              type="text"
              placeholder={"Иванов"}
            />
          </div>
          <div className={styles.widget}>
            <PersonalInfoWidget
              field="email"
              value={email}
              error={errors.email}
              title="E-mail"
              type="email"
              placeholder={"ivan@gmail.com"}
            />
          </div>
          <div className={styles.widget}>
            <PersonalInfoWidget
              field="phoneNumber"
              value={phoneNumber}
              error={errors.phoneNumber}
              title="Телефон"
              type="text"
              placeholder={"+375 29 111 2233"}
            />
          </div>
        </div>
      </div>
    </BlockContainer>
  );
};

export default PersonalInfoBlock;