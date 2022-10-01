import {
    BaseButton,
    InvertedButton,
    GoogleButton,
    ButtonSpinner,
} from './button.styles';

import { FC, ButtonHTMLAttributes } from 'react';
export enum buttonTypes {
    base = 'base',
    google = 'google',
    inverted = 'inverted',
}

export type ButtonProps = {
    btnType?: buttonTypes;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const getButtonType = (buttonType = buttonTypes.base): typeof BaseButton => {
    return {
        [buttonTypes.base]: BaseButton,
        [buttonTypes.google]: GoogleButton,
        [buttonTypes.inverted]: InvertedButton,
    }[buttonType];
};

const Button: FC<ButtonProps> = ({
    children,
    isLoading,
    btnType,
    ...otherProps
}) => {
    const CustomButton = getButtonType(btnType);
    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton>
    );
};

export default Button;
