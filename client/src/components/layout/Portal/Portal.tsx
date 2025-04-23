'use client';

import React, {FC, RefObject, useEffect, useRef, useState} from 'react';
import {createPortal} from "react-dom";
import {AppPopup} from "@/components/ui";

interface PortalProps {
  children: React.ReactNode;
  triggerRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  align?: "left" | "right";
}

const Portal : FC<PortalProps> = ({
  children,
  triggerRef,
  onClose,
  align = "right",
}) => {
  const portalRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({top: 0, left: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // effect for calculating position
  useEffect(() => {
    if (!triggerRef.current || !portalRef.current) return;

    const triggerBounding = triggerRef.current.getBoundingClientRect();

    const top = triggerBounding.top + triggerBounding.height;
    let left = triggerBounding.left;

    if (align === "right"){
      left = left + triggerBounding.width - portalRef.current.offsetWidth;
    }

    setPosition({top, left});

  }, [triggerRef, align, portalRef]);

  // effect for closing portal
  useEffect(() => {
    if (!portalRef.current) return;

    const handleScrollOrResize = () => {
      onClose();
    };

    const handleClickOutside= (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node) &&
        portalRef.current && !portalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    window.addEventListener("resize", handleScrollOrResize);
    window.addEventListener("scroll", handleScrollOrResize, true);
    document.addEventListener("mousedown", handleClickOutside);

    setIsMounted(true);

    return () => {
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, portalRef, triggerRef]);

  return createPortal(
    <div
      ref={portalRef}
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1000,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <AppPopup isVisible={isMounted}>
        {children}
      </AppPopup>
    </div>,
    document.body
  );
};

export default Portal;