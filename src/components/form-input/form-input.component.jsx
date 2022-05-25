import { Group, FormInputStyles, FormInputLabel } from './formInput.styles.jsx';

const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <FormInputStyles {...otherProps} />
            {label && (
                <FormInputLabel shrink={otherProps.value.length}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;
