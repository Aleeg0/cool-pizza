'use client';

import React, {FC, useEffect, useState} from 'react';
import {PizzaModal} from "@/components/entities/Pizza";
import {SimpleProductModule} from "@/components/entities/Product";
import {UUID} from "@/store/types/shared";
import {useAppDispatch} from "@/store/lib/hooks";
import {Product} from "@/store/types/Product";
import {fetchCurrentProduct} from "@/store/model/CurrentProduct/thunk";

type Props = {id: UUID}

export const ModalContainer: FC<Props> = ({id}) => {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const product = await dispatch(fetchCurrentProduct(id)).unwrap();
      setProduct(product);
    };

    fetch();
  }, [dispatch, id, product]);

  if (!product) return;

  return product.type === 'pizza' ?
    <PizzaModal
      product={product}
    /> :
    <SimpleProductModule
      product={product}
    />;
};

export default ModalContainer;