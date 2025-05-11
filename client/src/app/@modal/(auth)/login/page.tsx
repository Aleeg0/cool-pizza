'use client';

import React, {useEffect, useState} from 'react';
import {Modal} from "@/components/layout";
import {LoginModal} from "@/components/features/Auth";

const LoginModalPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, [])
  
  return (
    <Modal
      isMounted={isMounted}
    >
      <LoginModal/>
    </Modal>
  );
};

export default LoginModalPage;