import React from 'react'
import { AuthLayout } from './AuthLayout'
import { LoginForm } from '../components/LoginForm'

export const Login = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
