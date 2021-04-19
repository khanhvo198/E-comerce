import React from 'react';
import PropTypes from 'prop-types';
import './Login.scss';
import { Form, FastField, Formik } from 'formik';
import InputField from 'components/Form/InputField/InputField';
import * as Yup from 'yup';
import { Button, FormGroup } from 'reactstrap';

Login.propTypes = {

};

function Login(props) {
    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().email().required('Please enter your email!'),
        password: Yup.string().required('Please enter your password!'),
    })

    return (
        <div className='login'>
            <div className='login__title'>Login</div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => console.log('Submit: ', values)}
            >
                {formikProps => {
                    const { values, errors, touched } = formikProps
                    console.log(values)
                    return (
                        <Form>
                            <FastField
                                name='email'
                                component={InputField}

                                type='text'
                                label='Email:'
                                placeholder='Enter your email here ...'
                            />

                            <FastField
                                name='password'
                                component={InputField}

                                type='password'
                                label='Password:'
                                placeholder='Enter your password here ...'
                            />

                            <FormGroup>
                                <Button type='submit' color='primary'>Login</Button>
                            </FormGroup>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default Login;