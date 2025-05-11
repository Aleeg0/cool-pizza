import React, {FC, useRef, useState} from 'react';
import {UiButton} from "@/components/ui";
import ProfilePopup from "./ProfilePopup";
import {Portal} from "@/components/layout";
import {ProfileIcon} from "@/components/icons";

interface Props {
  onSettings: () => void;
  onOrders: () => void;
  onLogout: () => void;
}

const ProfileButton : FC<Props> = ({
  onSettings,
  onOrders,
  onLogout
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const onPopupClick = (callback: () => void) => {
    callback();
    setIsOpen(false);
  }

  return (
    <>
      <UiButton
        ref={triggerRef}
        caption="Профиль"
        onClick={() => setIsOpen(!isOpen)}
        icon={<ProfileIcon className="UiKit_icon__transition" />}
        type={isOpen ? "primary" : "secondary"}
      />
      {isOpen &&
        <Portal
            triggerRef={triggerRef}
            onClose={() => setIsOpen(false)}
        >
          <ProfilePopup
              onSettings={() => onPopupClick(onSettings)}
              onOrders={() => onPopupClick(onOrders)}
              onLogout={() => onPopupClick(onLogout)}
          />
        </Portal>
      }
    </>
  );
};

export default ProfileButton;