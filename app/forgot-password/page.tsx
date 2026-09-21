'use client'

import { useState } from 'react'
import { KeyRound, Mail, Send, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u: any) => u.email === email)

    if (!user) {
      alert('این ایمیل در سیستم ثبت نشده است!')
      return
    }

    setIsSubmitted(true)
  }

  return (
    <>
      <section className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#0a4a8f' }}>فراموشی رمز عبور</h1>
          <p className="text-xl">بازیابی دسترسی به حساب کاربری</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
                    <KeyRound className="w-12 h-12 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">بازیابی رمز عبور</h2>
                  <p className="text-gray-500 mt-1">
                    ایمیل خود را وارد کنید تا لینک بازیابی برایتان ارسال شود
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                    ایمیل
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ایمیل خود را وارد کنید"
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  ارسال لینک بازیابی
                </button>

                <div className="text-center text-gray-600">
                  <a href="/login" className="text-blue-600 hover:text-blue-800 font-bold">
                    بازگشت به صفحه ورود
                  </a>
                </div>
              </form>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">ایمیل ارسال شد!</h2>
                <p className="text-gray-600 mb-6">
                  لینک بازیابی رمز عبور به ایمیل شما ارسال شد.
                  <br />
                  لطفاً صندوق ورودی خود را بررسی کنید.
                </p>
                <a
                  href="/login"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors"
                >
                  بازگشت به صفحه ورود
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}