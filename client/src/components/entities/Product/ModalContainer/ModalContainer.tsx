'use client';

import React, {useEffect} from 'react';
import {useAppSelector} from "@/store/lib/hooks";
import {PizzaModal} from "@/components/entities/Pizza";
import {SimpleProductModule} from "@/components/entities/Product";
import {selectProductById} from "@/store/model/Products/selectors";
import {UUID} from "@/store/types/shared";

export const ModalContainer = ({ id }: { id: UUID }) => {
  const product = useAppSelector((state) => selectProductById(state, id));

  useEffect(() => {
    if (!product.variations){
      // TODO fetch variations
    }
  }, [product]);

  return product.type === 'pizza' ?
    <PizzaModal
      product={product}
    /> :
    <SimpleProductModule
      product={product}
    />;
};

export default ModalContainer;