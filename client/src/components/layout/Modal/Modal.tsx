'use client';

import React, {FC, ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss'
import {useRouter} from "next/navigation";
import {cn} from "@/utils";
import {CrossIcon} from "@/components/icons";
import {useClickOutside, useLockBodyScroll} from "@/hooks";

interface Props {
  children: ReactNode;
  isMounted?: boolean;
}

const Modal: FC<Props> = ({ children, isMounted = true}) => {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null!);

  const onClose = useCallback(() => router.back(), [router]);
  // for outside container click
  useClickOutside(contentRef, onClose);
  // for scroll-bar
  useLockBodyScroll(isMounted);

  return (
    <div className={styles.root} data-nextjs-dialog="">
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
              onClick={onClose}
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