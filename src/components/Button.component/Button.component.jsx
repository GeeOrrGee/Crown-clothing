import { BaseButton, InvertedButton, GoogleButton } from './button.styles.jsx';
export const buttonTypes = {
    base: 'base',
    google: 'google',
    inverted: 'inverted',
};

const getButtonType = (buttonType = buttonTypes.base) => {
    return {
        [buttonTypes.base]: BaseButton,
        [buttonTypes.google]: GoogleButton,
        [buttonTypes.inverted]: InvertedButton,
    }[buttonType];
};

const Button = ({ children, btnType, ...otherProps }) => {
    const CustomButton = getButtonType(btnType);
    return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
