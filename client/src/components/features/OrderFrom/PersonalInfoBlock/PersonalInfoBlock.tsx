'use client';

import React, {FC} from 'react';
import styles from './styles.module.scss'
import BlockContainer from "@/components/features/OrderFrom/BlockContainer/BlockContainer";
import {OrderFormErrors, OrderFormData, OrderFormField} from "@/store/model/Cart/types";
import {TitledInput} from "@/components/ui";
import {FIELDS_CONFIG} from "./const";

type Props = OrderFormData & {
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
              <TitledInput
                value={formData[field]}
                onChange={(e) => onSetField(field, e.target.value)}
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

export default PersonalInfoBlock;