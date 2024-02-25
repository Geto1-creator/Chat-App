import React from "react";
import { IconType } from "react-icons";
interface AuthSocialButtonsProps {
  icon: IconType;
  onClick?: () => void;
}
const AuthSocialButton: React.FC<AuthSocialButtonsProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500 hover:text-white focus:outline-offset-0">
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
