'use client';

import React, {FC} from 'react';
import styles from './styles.module.scss'
import BlockContainer from "@/components/features/OrderFrom/BlockContainer/BlockContainer";
import {OrderFormErrors, OrderFormField} from "@/store/model/Cart/types";
import {FIELDS_CONFIG} from "./const";
import {TitledErrorInput} from "@/components/ui/Inputs";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  errors: OrderFormErrors,
  onSetField: (field: OrderFormField, value: string) => void,
}

const PersonalInfoBlock: FC<Props> = ({
  errors,
  onSetField,
  ...formData
}) => {

  return (
    <BlockContainer
      title="2. Персональная информация"
    >
      <div className={styles.content}>
        <div className={styles.widgets}>
          {FIELDS_CONFIG.map(({field, title, type, placeholder}, i) =>
            <div
              className={styles.widget}
              key={i}
            >
              <TitledErrorInput
                value={formData[field]}
                onChange={(value) => onSetField(field, value)}
                error={errors[field]}
                title={title}
                type={type}
                placeholder={placeholder}
              />
            </div>
          )}
        </div>
      </div>
    </BlockContainer>
  );
};

export default React.memo(PersonalInfoBlock);