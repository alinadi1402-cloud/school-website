'use client'

import { useState, useEffect } from 'react'
import { User, GraduationCap, Award } from 'lucide-react'

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTeachers = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/teachers')
        const data = await res.json()
        if (data.success && data.teachers.length > 0) {
          setTeachers(data.teachers)
        } else {
          const savedTeachers = JSON.parse(localStorage.getItem('teachers') || 'null')
          setTeachers(savedTeachers || [])
        }
      } catch (error) {
        const savedTeachers = JSON.parse(localStorage.getItem('teachers') || 'null')
        setTeachers(savedTeachers || [])
      }
      setLoading(false)
    }
    loadTeachers()
  }, [])

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#0a4a8f' }}>کادر آموزشی</h1>
          <p className="text-xl text-gray-600">اساتید مجرب و دلسوز مدرسه</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          {loading ? (
            <p className="text-center text-gray-500">در حال بارگذاری...</p>
          ) : teachers.length === 0 ? (
            <p className="text-center text-gray-500">اطلاعاتی ثبت نشده است</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {teacher.imageData ? (
                      <img src={teacher.imageData} alt={teacher.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-1" style={{ color: '#0a4a8f' }}>{teacher.name}</h3>
                    <p className="font-bold text-sm mb-3" style={{ color: '#d4af37' }}>{teacher.subject}</p>
                    <div className="space-y-2 text-gray-600 text-xs">
                      <p>{teacher.education}</p>
                      <p>سابقه: {teacher.experience}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}