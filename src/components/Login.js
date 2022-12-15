import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios'

const initialValues = {
    email: '',
    password: '',
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format!")
        .required("Email is required!"),
    password: Yup.string()
        .required("Password is required!")
        .test(
            "regex",
            "Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase!",
            (val) => {
                let regExp = new RegExp(
                    "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                );
                return regExp.test(val);
            }
        ),
});


const Login = (props) => {

    const navigate = useNavigate();

    const checkEmail = (serverUsers, values) => {
        const user = serverUsers.find(user => (user.email === values.email && user.password === values.password)); // extract the email from the values
        if (user) return user;
    };

    const onSubmit = async (values) => {
        const user = await axios.get("http://localhost:8000/users")
            .then((res) => checkEmail(res.data, values));
        if (user) {
            localStorage.setItem('userId', user.id)
            navigate('/')
            toast.success('Login Successfully.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            props.Logged(true)
        }else{
            toast.error('User not found with this credentials!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <Form>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <Field type="text" name="email" id="email" />
                    <ErrorMessage name='email'>
                        {(errorMsg) => <div className='error'>{errorMsg}</div>}
                    </ErrorMessage>
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <Field type="password" name="password" id="password" />
                    <ErrorMessage name='password'>
                        {(errorMsg) => <div className='error'>{errorMsg}</div>}
                    </ErrorMessage>
                </div>
                <button type='submit'>Submit</button>
            </Form>
        </Formik>
    )
}

export default Login