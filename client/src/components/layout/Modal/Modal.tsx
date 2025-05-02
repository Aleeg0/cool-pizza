'use client';

import React, {FC, ReactNode, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss'
import {useRouter} from "next/navigation";
import {cn} from "@/utils";
import {CrossIcon} from "@/components/icons";

interface Props {
  children: ReactNode;
  isMounted?: boolean;
}

const Modal: FC<Props> = ({ children, isMounted = true}) => {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  // for scroll-bar
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.setProperty('--size-main-scroll-bar', `${scrollbarWidth}px`);

    document.body.classList.add('modalOpen');

    return () => {
      document.body.style.removeProperty('--size-main-scroll-bar');
      document.body.classList.remove('modalOpen');
    }
  }, []);

  // for outside container click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        router.back();
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [router]);

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