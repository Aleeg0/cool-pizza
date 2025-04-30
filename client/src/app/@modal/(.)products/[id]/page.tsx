import React from 'react';
import {Modal} from "@/components/layout";
import {ProductModalContainer} from "@/components/entities/Product";
import {UUID} from "@/store/types/shared";

type Params = Promise<{ id: UUID }>;

const ProductModalPage = async (props : { params: Params }) => {
  const {id} = await props.params;
  return (
    <Modal>
      <ProductModalContainer id={id} />
    </Modal>
  );
};

export default ProductModalPage;