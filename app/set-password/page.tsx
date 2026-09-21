'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, CheckCircle, KeyRound } from 'lucide-react'
import { Suspense } from 'react'

function SetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''
  const userId = searchParams.get('userId') || ''
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isDone, setIsDone] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!password || !confirmPassword) {
      alert('لطفاً رمز عبور را وارد کنید!')
      return
    }
    
    if (password.length < 8) {
      alert('رمز عبور باید حداقل ۸ کاراکتر باشد!')
      return
    }
    
    if (password !== confirmPassword) {
      alert('رمز عبور و تکرار آن مطابقت ندارند!')
      return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u: any) => u.id === parseInt(userId))

    if (!user) {
      alert('کاربر یافت نشد!')
      return
    }

    if (user.token !== token || !user.token) {
      alert('لینک نامعتبر است!')
      return
    }

    // هش کردن رمز
    const hashedPassword = btoa(password)
    
    const updatedUsers = users.map((u: any) => 
      u.id === parseInt(userId) 
        ? { ...u, password: hashedPassword, status: 'active', token: '' }
        : u
    )
    
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    setIsDone(true)
  }

  if (isDone) {
    return (
      <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#0a4a8f' }}>رمز عبور تنظیم شد!</h2>
        <p className="text-gray-600 mb-6">حساب شما فعال شد. حالا می‌توانید وارد شوید.</p>
        <a
          href="/login"
          className="inline-block px-6 py-2 rounded-lg text-white font-bold"
          style={{ backgroundColor: '#0a4a8f' }}
        >
          رفتن به صفحه ورود
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200 space-y-6">
      <div className="text-center mb-6">
        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: '#e8f0fe' }}>
          <KeyRound className="w-10 h-10" style={{ color: '#0a4a8f' }} />
        </div>
        <h2 className="text-2xl font-bold" style={{ color: '#0a4a8f' }}>تنظیم رمز عبور</h2>
        <p className="text-gray-500 mt-1 text-sm">رمز عبور خود را تعیین کنید</p>
      </div>

      <div>
        <label className="block font-bold mb-2 text-sm" style={{ color: '#0a4a8f' }}>رمز عبور جدید</label>
        <div className="relative">
          <Lock className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="حداقل ۸ کاراکتر"
            className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block font-bold mb-2 text-sm" style={{ color: '#0a4a8f' }}>تکرار رمز عبور</label>
        <div className="relative">
          <Lock className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="رمز عبور را دوباره وارد کنید"
            className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      </div>
<button
        type="submit"
        className="w-full py-3 rounded-lg font-bold text-white text-lg"
        style={{ backgroundColor: '#0a4a8f' }}
      >
        تنظیم رمز عبور
      </button>
    </form>
  )
}

export default function SetPasswordPage() {
  return (
    <>
      <section className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#0a4a8f' }}>فعال‌سازی حساب</h1>
          <p className="text-xl text-gray-600">تنظیم رمز عبور جدید</p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-4 max-w-md">
          <Suspense fallback={<div className="text-center text-gray-500">در حال بارگذاری...</div>}>
            <SetPasswordForm />
          </Suspense>
        </div>
      </section>
    </>
  )
}