'use client';

import React, {FC, ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss';
import {cn} from "@/utils";
import {HugeCrossIcon} from "@/components/icons";
import {useClickOutside, useLockBodyScroll} from "@/hooks";

interface Props {
  children: ReactNode;
  isInstant?: boolean;
  onClose: () => void;
}

const Drawer: FC<Props> = ({children, isInstant = false, onClose}) => {
  const [isMounted, setIsMounted] = useState(isInstant);
  const contentRef = useRef<HTMLDivElement>(null!);

  const onCloseWithUnmounting = useCallback(() => {
      setIsMounted(false);
      setTimeout(onClose, 300);
  },[onClose]);

  // mounting
  useEffect(() => {
    if (!isMounted)
      setIsMounted(true);
  }, []);

  // for outside container click
  useClickOutside(contentRef, onCloseWithUnmounting);
  // for scroll-bar
  useLockBodyScroll(isMounted);

  return (
    <div className={styles.root}>
      <div className={cn(
        styles.wrapper,
        isMounted ? styles.show : ''
      )}>
        <div className={styles.fade}/>
        <div
          ref={contentRef}
          className={styles.content}
        >
          <button
            className={styles.closeButton}
            onClick={onCloseWithUnmounting}
          >
            <HugeCrossIcon/>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;