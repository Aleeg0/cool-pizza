'use client';

import React, {useEffect, useState} from 'react';
import {Modal} from "@/components/layout";
import {RegisterModal} from "@/components/features/Auth";

const RegisterModalPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  return (
    <Modal
      isMounted={isMounted}
    >
      <RegisterModal/>
    </Modal>
  );
};

export default RegisterModalPage;