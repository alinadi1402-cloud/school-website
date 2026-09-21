'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      alert('لطفاً همه فیلدها را پر کنید!')
      return
    }
    alert('پیام شما با موفقیت ارسال شد!')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <>
      <section className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#0a4a8f' }}>تماس با ما</h1>
          <p className="text-xl text-gray-600">ما همیشه آماده پاسخگویی هستیم</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <MapPin className="w-10 h-10 mx-auto mb-3" style={{ color: '#0a4a8f' }} />
              <h3 className="font-bold mb-1">آدرس</h3>
              <p className="text-gray-600 text-sm">استان خراسان رضوی، شهرستان خواف</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <Phone className="w-10 h-10 mx-auto mb-3" style={{ color: '#0a4a8f' }} />
              <h3 className="font-bold mb-1">تلفن</h3>
              <p className="text-gray-600 text-sm">۰۵۱-۱۲۳۴۵۶۷۸</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <Mail className="w-10 h-10 mx-auto mb-3" style={{ color: '#0a4a8f' }} />
              <h3 className="font-bold mb-1">ایمیل</h3>
              <p className="text-gray-600 text-sm">info@school.ir</p>
            </div>
          </div>

          {/* نقشه نشان */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8">
            <iframe
              src="https://neshan.org/maps/embed?lat=34.55405081820219&lng=60.15526497736574&z=15"
              className="w-full h-72 rounded-lg border-0"
              loading="lazy"
              allowFullScreen
            ></iframe>
            <p className="text-center text-gray-500 text-sm mt-3">
              📍 موقعیت مدرسه روی نقشه
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center" style={{ color: '#0a4a8f' }}>ارسال پیام</h2>
            <div>
              <label className="block font-bold mb-2 text-sm" style={{ color: '#0a4a8f' }}>نام و نام خانوادگی *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2 text-sm" style={{ color: '#0a4a8f' }}>ایمیل *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2 text-sm" style={{ color: '#0a4a8f' }}>پیام *</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-white text-lg flex items-center justify-center gap-2"
              style={{ backgroundColor: '#0a4a8f' }}
            >
              <Send className="w-5 h-5" />
              ارسال پیام
            </button>
          </form>
        </div>
      </section>
    </>
  )
}