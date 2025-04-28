import React from 'react';
import {Modal} from "@/components/layout";
import {ProductModalContainer} from "@/components/entities/Product";
import {UUID} from "@/store/types/shared";

const ProductModalPage = async ({ params }: { params: { id: UUID } }) => {
  const {id} = await params;

  return (
    <Modal>
      <ProductModalContainer id={id} />
    </Modal>
  );
};

export default ProductModalPage;