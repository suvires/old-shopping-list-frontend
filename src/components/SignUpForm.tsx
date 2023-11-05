'use client'

import React, { useState } from 'react'

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle registration logic
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='fullName'>Full Name:</label>
        <input
          type='text'
          id='fullName'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  )
}

export default SignUpForm
