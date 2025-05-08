import React, {ChangeEvent, FC} from 'react';
import {TitledInput} from "@/components/ui";
import {useAppDispatch} from "@/store/lib/hooks";
import {OrderFormField, setOrderFormFieldValue} from "@/store/model/OrderForm";

interface Props {
  field: OrderFormField;
  value: string;
  error?: string;
  title: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
}

const PersonalInfoWidget: FC<Props> = ({
  field,
  value,
  error,
  title,
  type,
  placeholder
}) => {
  const dispatch = useAppDispatch();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setOrderFormFieldValue({
      field,
      value: e.target.value,
    }));
  }

  return (
    <TitledInput
      title={title}
      value={value}
      onChange={handleOnChange}
      type={type}
      error={error}
      placeholder={placeholder}
    />
  );
};

export default PersonalInfoWidget;