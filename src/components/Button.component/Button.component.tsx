import { BaseButton, InvertedButton, GoogleButton } from './button.styles';

import { FC, ButtonHTMLAttributes } from 'react';
export enum buttonTypes {
    base = 'base',
    google = 'google',
    inverted = 'inverted',
}

export type ButtonProps = {
    btnType?: buttonTypes;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const getButtonType = (buttonType = buttonTypes.base): typeof BaseButton => {
    return {
        [buttonTypes.base]: BaseButton,
        [buttonTypes.google]: GoogleButton,
        [buttonTypes.inverted]: InvertedButton,
    }[buttonType];
};

const Button: FC<ButtonProps> = ({ children, btnType, ...otherProps }) => {
    const CustomButton = getButtonType(btnType);
    return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
