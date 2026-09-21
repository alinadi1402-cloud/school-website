'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus, User, Phone, CreditCard, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    phone: '',
    role: 'student'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.fullName || !formData.nationalId || !formData.phone) {
      alert('لطفاً همه فیلدها را پر کنید!')
      return
    }
    
    if (formData.nationalId.length !== 10) {
      alert('کد ملی باید ۱۰ رقم باشد!')
      return
    }
    
    if (!/^09[0-9]{9}$/.test(formData.phone)) {
      alert('شماره موبایل معتبر نیست!')
      return
    }

    const newUser = {
      id: Date.now(),
      fullName: formData.fullName,
      username: formData.nationalId,
      nationalId: formData.nationalId,
      phone: formData.phone,
      role: formData.role,
      status: 'pending',
      password: '',
      token: '',
      createdAt: new Date().toISOString()
    }

    // ذخیره در localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const existingUser = users.find((u: any) => u.nationalId === formData.nationalId)
    if (existingUser) {
      alert('این کد ملی قبلاً ثبت شده است!')
      return
    }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    // ذخیره در دیتابیس (از طریق API)
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: newUser.fullName,
          username: newUser.username,
          email: newUser.username + '@school.ir',
          password: '',
          role: newUser.role,
        })
      })
      const result = await response.json()
      if (result.success) {
        console.log('✅ کاربر در دیتابیس ذخیره شد!')
      } else {
        console.error('خطا:', result.error)
      }
    } catch (error) {
      console.error('Error:', error)
    }
    
    setIsSubmitted(true)
  }

  return (
    <>
      <section className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#0a4a8f' }}>ثبت‌نام</h1>
          <p className="text-xl text-gray-600">ایجاد حساب کاربری جدید</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-md">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200 space-y-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: '#e8f0fe' }}>
                  <UserPlus className="w-10 h-10" style={{ color: '#0a4a8f' }} />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: '#0a4a8f' }}>ثبت‌نام در سایت</h2>
                <p className="text-gray-500 mt-1 text-sm">اطلاعات هویتی خود را وارد کنید</p>
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm" style={{ color: '#0a4a8f' }}>نام و نام خانوادگی</label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="نام کامل خود را وارد کنید"
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm" style={{ color: '#0a4a8f' }}>کد ملی</label>
                <div className="relative">
                  <CreditCard className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({...formData, nationalId: e.target.value.replace(/[^0-9]/g, '')})}
                    placeholder="کد ملی ۱۰ رقمی"
                    maxLength={10}
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">نام کاربری شما = کد ملی</p>
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm" style={{ color: '#0a4a8f' }}>شماره موبایل</label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/[^0-9]/g, '')})}
                    placeholder="۰۹xxxxxxxxx"
                    maxLength={11}
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm" style={{ color: '#0a4a8f' }}>نقش کاربر</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="student">دانش‌آموز</option>
                  <option value="parent">والدین</option>
                  <option value="teacher">معلم</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-bold text-white text-lg"
                style={{ backgroundColor: '#0a4a8f' }}
              >
                ثبت‌نام
              </button>

              <p className="text-center text-gray-500 text-sm">
                قبلاً ثبت‌نام کرده‌اید؟{' '}
                <a href="/login" className="font-bold" style={{ color: '#0a4a8f' }}>وارد شوید</a>
              </p>
            </form>
          ) : (
            <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#0a4a8f' }}>ثبت‌نام انجام شد!</h2>
              <p className="text-gray-600 mb-6">
                ثبت‌نام شما در انتظار تایید مدیر است.
                <br />
                پس از تایید، لینک فعال‌سازی به شماره موبایل شما پیامک می‌شود.
              </p>
              <a
                href="/"
                className="inline-block px-6 py-2 rounded-lg text-white font-bold"
                style={{ backgroundColor: '#0a4a8f' }}
              >
                بازگشت به صفحه اصلی
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  )
}