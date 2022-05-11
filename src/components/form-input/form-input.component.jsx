import './formInput.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
    // console.log(otherProps);

    return (
        <div className='group'>
            <input className='form-input' {...otherProps} />
            {label && (
                <label
                    className={`${
                        otherProps.value ? 'shrink' : ''
                    } form-input-label`}
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default FormInput;
