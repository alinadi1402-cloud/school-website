'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GraduationCap, User, Lock, LogIn } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u: any) => u.username === formData.username)

    if (!user) {
      alert('نام کاربری یافت نشد!')
      return
    }

    if (user.status === 'pending') {
      alert('حساب شما در انتظار تایید مدیر است!')
      return
    }

    if (user.status === 'approved') {
      alert('لطفاً از لینک فعال‌سازی پیامک شده استفاده کنید!')
      return
    }

    if (user.password !== btoa(formData.password)) {
      alert('رمز عبور اشتباه است!')
      return
    }

    const sessionData = {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      role: user.role,
      phone: user.phone,
      status: user.status,
      loginTime: new Date().toISOString()
    }

    if (formData.rememberMe) {
      localStorage.setItem('currentUser', JSON.stringify(sessionData))
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(sessionData))
    }

    alert('خوش آمدید ' + user.fullName + ' عزیز!')
    router.push('/dashboard')
  }

  return (
    <>
      <section className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#0a4a8f' }}>ورود به سیستم</h1>
          <p className="text-xl text-gray-600">پنل کاربری دانش‌آموزان و والدین</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200 space-y-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: '#e8f0fe' }}>
                  <GraduationCap className="w-12 h-12" style={{ color: '#0a4a8f' }} />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: '#0a4a8f' }}>خوش آمدید</h2>
                <p className="text-gray-500 mt-1">لطفاً اطلاعات خود را وارد کنید</p>
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm" style={{ color: '#0a4a8f' }}>نام کاربری (کد ملی)</label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value.replace(/[^0-9]/g, '')})}
                    placeholder="کد ملی ۱۰ رقمی"
                    maxLength={10}
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm" style={{ color: '#0a4a8f' }}>رمز عبور</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="رمز عبور"
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700 text-sm">مرا به خاطر بسپار</span>
                </label>
                <a href="/forgot-password" className="text-sm font-bold" style={{ color: '#0a4a8f' }}>
                  فراموشی رمز؟
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-bold text-white text-lg flex items-center justify-center gap-2"
                style={{ backgroundColor: '#0a4a8f' }}
              >
                <LogIn className="w-5 h-5" />
                ورود
              </button>

              <p className="text-center text-gray-500 text-sm">
                حساب ندارید؟{' '}
                <a href="/register" className="font-bold" style={{ color: '#0a4a8f' }}>ثبت‌نام کنید</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}