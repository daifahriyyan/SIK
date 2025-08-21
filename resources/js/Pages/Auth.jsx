import React, { useState } from 'react';
import InputField from '../Component/InputField';
import { Head, useForm } from '@inertiajs/inertia-react';

export default function Auth() {

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // form Login
  const loginForm = useForm({
    email: '',
    password: '',
  });

  // form registrasi
  const registerForm = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  // setting Current Form
  const currentForm = isLogin ? loginForm : registerForm;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      currentForm.post('/signin', {
        onFinish: () => loginForm.reset(),
        onError: (errors) => {
          // Handle errors
          console.error('Login failed:', errors);
        }
      });
    } else {
      currentForm.post('/signup', {
        onFinish: () => registerForm.reset(),
        onError: (errors) => {
          // Handle errors
          console.error('Registration failed:', errors);
        }
      });
    }
  }

  const fields = [
    ...(!isLogin ? [{
      name: 'name',
      placeholder: 'Full Name',
      required: true,
      value: registerForm.data.name,
      onChange: (e) => registerForm.setData('name', e.target.value),
      error: registerForm.errors.name
    }] : []),
    {
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      required: true,
      value: currentForm.data.email,
      onChange: (e) => currentForm.setData('email', e.target.value),
      error: currentForm.errors.email
    },
    {
      name: 'password',
      placeholder: 'Password',
      required: true,
      showToggle: true,
      showPassword: showPassword,
      onToggle: () => setShowPassword(!showPassword),
      value: currentForm.data.password,
      onChange: (e) => currentForm.setData('password', e.target.value),
      error: currentForm.errors.password
    },
    ...(!isLogin ? [{
      name: 'password_confirmation',
      placeholder: 'Confirm Password',
      required: true,
      showToggle: true,
      showPassword: showConfirmPassword,
      onToggle: () => setShowConfirmPassword(!showConfirmPassword),
      value: registerForm.data.password_confirmation,
      onChange: (e) => registerForm.setData('password_confirmation', e.target.value),
      error: registerForm.errors.password_confirmation
    }] : [])
  ]

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <Head title={isLogin ? 'Login' : 'Register'} />

      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">SIK {isLogin ? 'Login' : 'Register'}</h1>
        <form onSubmit={(e) => handleSubmit(e)}>

          {fields.map((field) => (
            <InputField
              key={field.name}
              icon={field.icon}
              type={field.type}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              placeholder={field.placeholder}
              required={field.required}
              showToggle={field.showToggle}
              onToggle={field.onToggle}
              showPassword={field.showPassword}
              error={field.error}
            />
          ))}

          <div className='text-center mb-4'>
            {isLogin ? 'belum punya akun?' : 'sudah punya akun?'}
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >{isLogin ? 'Daftar' : 'Login'}</button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}