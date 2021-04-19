import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';
import './InputField.scss';

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
};


InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
}

function InputField(props) {
    const { field, type, label, placeholder } = props;
    const { name, value, onChange, onBlur } = field;

    return (
        <div className='inputfield'>
            <FormGroup>
                {label && <Label for={name} >{label}</Label>}
                <Input
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}

                    type={type}
                    placeholder={placeholder}
                />
            </FormGroup>
        </div>
    );
}

export default InputField;