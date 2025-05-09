import React, {FC} from 'react';
import BlockContainer from "@/components/features/OrderFrom/BlockContainer/BlockContainer";
import styles from './styles.module.scss';
import {OrderFormField} from "@/store/model/Cart/types";
import {TitledErrorDropdownInput, TitledMultilineInput} from "@/components/ui";
import {useDebouncedFetchAddresses} from "@/components/features/OrderFrom/ExtraInfoBlock/useDebouncedFetchAddresses";


interface Props {
  address: string;
  comment: string;
  error?: string;
  onSetField: (field: OrderFormField, value: string) => void,
}

const ExtraInfoBlock: FC<Props> = ({address, comment, error, onSetField}) => {
  const {suggestions, trigger} = useDebouncedFetchAddresses();

  const onAddressChange = (value: string) => {
    onSetField("address", value);
    trigger(value);
  };

  return (
    <BlockContainer
      title={"3. Адрес доставки"}
    >
      <div className={styles.content}>
        <div className={styles.inputs}>
          <div className={styles.addressInput}>
            <TitledErrorDropdownInput
              value={address}
              onChange={onAddressChange}
              title={"Введите адрес"}
              suggestions={suggestions}
              onSelectSuggestionAction={(v) => onSetField("address", v)}
              error={error}
            />
          </div>
          <div className={styles.commentInput}>
            <TitledMultilineInput
              title={"Комментарий к заказу"}
              value={comment}
              onChange={(value) => onSetField("comment", value)}
              placeholder={"Укажите тут дополнительную информацию для курьера"}
            />
          </div>
        </div>
      </div>
    </BlockContainer>
  );
};

export default React.memo(ExtraInfoBlock);