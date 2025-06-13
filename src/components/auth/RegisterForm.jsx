// components/auth/RegisterForm.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useRegisterUser from '../../hooks/useRegisterUser';

export default function RegisterForm() {
    const {mutate} = useRegisterUser()
    const formik = useFormik({
        initialValues: {
            fName: '',
            lName: '',
            email: '',
            password: '',
            phoneNo: ''
        },
        validationSchema: Yup.object({
            fName: Yup.string().required('First name is required'),
            lName: Yup.string().required('Last name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            phoneNo: Yup.string()
            .min(10, 'Contact number must be of 10 digits').required('Contact number is required')
        }),
        onSubmit: (values) => {
            mutate(values) // Pass values to RegisterPage
        },
    });

    return (
        <>
            {formik.submitCount > 0 && Object.keys(formik.errors).length > 0 && (
                <p className="p-3 text-sm font-medium text-center text-red-800 bg-red-100 rounded-lg">
                    Please fix the errors below.
                </p>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="flex space-x-2">
                    <div className="w-1/2">
                        <input
                            type="text"
                            name="fName"
                            placeholder="First Name"
                            value={formik.values.fName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {formik.touched.fName && formik.errors.fName && (
                            <p className="text-xs text-red-600">{formik.errors.fName}</p>
                        )}
                    </div>
                    <div className="w-1/2">
                        <input
                            type="text"
                            name="lName"
                            placeholder="Last Name"
                            value={formik.values.lName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {formik.touched.lName && formik.errors.lName && (
                            <p className="text-xs text-red-600">{formik.errors.lName}</p>
                        )}
                    </div>
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-xs text-red-600">{formik.errors.email}</p>
                    )}
                </div>

                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-xs text-red-600">{formik.errors.password}</p>
                    )}
                </div>

                <div>
                    <input
                        type="text"
                        name="phoneNo"
                        placeholder="Contact Number"
                        value={formik.values.phoneNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {formik.touched.phoneNo && formik.errors.phoneNo && (
                        <p className="text-xs text-red-600">{formik.errors.phoneNo}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700"
                >
                    Register
                </button>
            </form>
        </>
    );
}
