import React from 'react'
import { AuthLayout } from './AuthLayout'
import { RegisterForm } from '../components'

export const Register = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}
