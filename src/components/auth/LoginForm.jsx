import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useLoginUser from '../../hooks/useLoginUser';

const GoogleIcon = () => (
    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512..." />
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119..." />
    </svg>
);

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const {mutate} = useLoginUser()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            mutate(values)
        },
    });

    return (
        <>
            {formik.submitCount > 0 && Object.keys(formik.errors).length > 0 && (
                <p className="p-3 text-sm font-medium text-center text-red-800 bg-red-100 rounded-lg">
                    Please fix the errors below.
                </p>
            )}

            <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="you@example.com"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-xs text-red-600">{formik.errors.email}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative flex items-center">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="••••••••"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 px-3 text-sm font-semibold text-gray-600 hover:text-blue-700"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-xs text-red-600">{formik.errors.password}</p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                        <label htmlFor="remember-me" className="ml-2 text-sm text-gray-900">Remember me</label>
                    </div>
                    <div className="text-sm">
                        <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <button
                    type="submit"
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700"
                >
                    Login
                </button>
            </form>

            <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-gray-500 bg-white">or</span>
                </div>
            </div>

            <div className="space-y-4 mt-6">
                <button className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    <GoogleIcon />
                    Sign in with Google
                </button>
                <button className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    <FacebookIcon />
                    Sign in with Facebook
                </button>
            </div>
        </>
    );
}
