import React from 'react';
import {Modal} from "@/components/layout";
import {PizzaModal} from "@/components/entities/Pizza";
import {SimpleProductModule} from "@/components/entities/Product";

const ProductModalPage = async ({ params }: { params: { id: string } }) => {
  const {id} = await params;

  return (
    <Modal>
      {Number(id) > 4 ?
        <PizzaModal/>
        :
        <SimpleProductModule/>
      }
    </Modal>
  );
};

export default ProductModalPage;