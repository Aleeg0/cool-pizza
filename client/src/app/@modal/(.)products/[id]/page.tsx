import React from 'react';
import {ModalContainer} from "@/components/layout";

import {UUID} from "@/store/types/shared";

type Params = Promise<{ id: UUID }>;

const ProductModalPage = async (props : { params: Params }) => {
  const {id} = await props.params;
  return <ModalContainer id={id} />;
};

export default ProductModalPage;