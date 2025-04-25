import React, {useRef, useState} from 'react';
import {UiButton} from "@/components/ui";
import ProfilePopup from "./ProfilePopup";
import {Portal} from "@/components/layout";
import {ProfileIcon} from "@/components/icons";

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const onSettings = () => {
    setIsOpen(false);
  }

  const onOrders = () => {
    setIsOpen(false);
  }

  const onLogout = () => {
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
              onSettings={onSettings}
              onOrders={onOrders}
              onLogout={onLogout}
          />
        </Portal>
      }
    </>
  );
};

export default ProfileButton;