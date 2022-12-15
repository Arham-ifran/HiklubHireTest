import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const initialValues = {
    id: (Date.now() * Math.random() * 1e9).toString(36),
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    selection: [],
    result: []
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters!")
        .required("Name is required!"),
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
    confirmPassword: Yup.string()
        .required("Confirm Password is required!")
        .oneOf([Yup.ref("password"), null], "Passwords must match!"),
});

const Signup = (props) => {

    const navigate = useNavigate();

    const checkEmail = (serverUsers, values) => {
        const user = serverUsers.find(user => (user.email === values.email)); // extract the email from the values
        if (user) return user;
    };

    const onSubmit = async (values) => {
        let  {
            id,
            name,
            email,
            password,
            selection,
            result
        } = values
        const user = await axios.get("http://localhost:8000/users")
            .then((res) => checkEmail(res.data, {id,
                name,
                email,
                password,
                selection,
                result}));
        if (user) {
            toast.error('User already exist with this Email', {
                position: "top-right",
                autoClose: 5000,
                //hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                //draggable: true,
                progress: undefined,
            });


        } else {
            const response = await axios.post(`http://localhost:8000/users`, {id,
            name,
            email,
            password,
            selection,
            result})
            if (response) {
                navigate('/login')
                toast.success('SignUp Successfully.', {
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
    }
    return (
        <>
            <h1>Signup</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form>
                    <div className='form-control'>
                        <label htmlFor="name">Name</label>
                        <Field type="text" name="name" id="name" />
                        <ErrorMessage name='name'>
                            {(errorMsg) => <div className='error'>{errorMsg}</div>}
                        </ErrorMessage>
                    </div>
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
                    <div className='form-control'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Field type="password" name="confirmPassword" id="confirmPassword" />
                        <ErrorMessage name='confirmPassword'>
                            {(errorMsg) => <div className='error'>{errorMsg}</div>}
                        </ErrorMessage>
                    </div>
                    <button type='submit'>Submit</button>
                </Form>
            </Formik>
        </>
    )
}

export default Signup