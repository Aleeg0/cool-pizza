'use client';

import React, {FC, useEffect, useState} from 'react';
import {PizzaModal} from "@/components/entities/Pizza";
import {SimpleProductModule} from "@/components/entities/Product";
import {UUID} from "@/store/types/shared";
import {useAppDispatch, useAppSelector} from "@/store/lib/hooks";
import {fetchCurrentProduct} from "@/store/model/CurrentProduct/thunk";
import {selectCurrentProduct} from "@/store/model/CurrentProduct";
import {Modal} from "@/components/layout";

type Props = {id: UUID}

export const ModalContainer: FC<Props> = ({id}) => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectCurrentProduct);

  useEffect(() => {
    dispatch(fetchCurrentProduct(id))
      .then(() => setIsMounted(true));
  }, []);

  return (
    <Modal isMounted={isMounted}>
      {product && (product.type === 'Pizza' ?
        <PizzaModal
          product={product}
        /> :
        <SimpleProductModule
          product={product}
        />)}
    </Modal>
  );
};

export default ModalContainer;