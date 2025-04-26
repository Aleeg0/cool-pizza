'use client';

import React, {FC, ReactNode, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss'
import {useRouter} from "next/navigation";
import {cn} from "@/utils";
import {CrossIcon} from "@/components/icons";

interface Props {
  children: ReactNode;
}

const Modal: FC<Props> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  // for outside container click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        router.back();
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [router]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={styles.root}>
      <div className={cn(
        styles.wrapper,
        isMounted ? styles.show : ''
      )}>
        <div className={styles.fade} />
        <div className={styles.container}>
          <div
            ref={contentRef}
            className={styles.content}
          >
            <button
              className={styles.closeButton}
              onClick={() => router.back()}
            >
              <CrossIcon/>
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;