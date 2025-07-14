import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register({ onLogin }) {
  const [step, setStep] = useState(1) // 1: Register form, 2: Verify OTP
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phoneNumber, password })
      })

      const data = await response.json()

      if (data.success) {
        setStep(2)
        setSuccess('OTP sent to your email')
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/auth/verifyEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
        credentials: 'include'
      })

      const data = await response.json()

      if (data.success) {
        onLogin(data.user)
        navigate('/')
      } else {
        setError(data.message || 'Verification failed')
      }
    } catch (err) {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {step === 1 ? 'Register' : 'Verify Email'}
        </h2>
        
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{success}</div>}
        
        {step === 1 ? (
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full p-2 border rounded"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Enter OTP</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        )}
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            {step === 1 ? 'Already have an account? ' : 'Back to '}
            <a href="/login" className="text-blue-500 hover:underline">
              {step === 1 ? 'Login' : 'Login'}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}