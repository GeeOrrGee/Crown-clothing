import './button.styles.scss';
const buttonTypes = {
    google: 'google-sign-in',
    inverted: 'inverted',
};

const Button = ({ children, btnType, ...otherProps }) => {
    return (
        <button
            className={`button-container ${buttonTypes[btnType]}`}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export default Button;
