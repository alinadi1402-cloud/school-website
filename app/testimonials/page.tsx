'use client'

import { useState, useEffect } from 'react'
import { Star, User, Send, Trash2 } from 'lucide-react'

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [newComment, setNewComment] = useState('')
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser')
    if (currentUser) setUser(JSON.parse(currentUser))
    
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/testimonials')
      const data = await res.json()
      if (data.success && data.testimonials.length > 0) {
        setTestimonials(data.testimonials)
      } else {
        const saved = JSON.parse(localStorage.getItem('testimonials') || '[]')
        setTestimonials(saved)
      }
    } catch (error) {
      const saved = JSON.parse(localStorage.getItem('testimonials') || '[]')
      setTestimonials(saved)
    }
    setLoading(false)
  }

  const addTestimonial = async () => {
    if (!newComment) { alert('لطفاً نظر خود را بنویسید!'); return }
    
    const newTestimonial = {
      id: Date.now(),
      userName: user ? user.fullName : 'کاربر مهمان',
      comment: newComment,
      rating: rating,
      createdAt: new Date().toISOString()
    }

    // ذخیره در localStorage
    const saved = JSON.parse(localStorage.getItem('testimonials') || '[]')
    saved.push(newTestimonial)
    localStorage.setItem('testimonials', JSON.stringify(saved))

    // ذخیره در دیتابیس
    try {
      await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: newTestimonial.userName,
          comment: newTestimonial.comment,
          rating: newTestimonial.rating
        })
      })
    } catch (error) {
      console.error('Error:', error)
    }

    setTestimonials([...testimonials, newTestimonial])
    setNewComment('')
    setRating(5)
    alert('نظر شما ثبت شد!')
  }

  const deleteTestimonial = (id: number) => {
    const updated = testimonials.filter(t => t.id !== id)
    setTestimonials(updated)
    localStorage.setItem('testimonials', JSON.stringify(updated))
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#0a4a8f' }}>نظرات کاربران</h1>
          <p className="text-xl text-gray-600">نظرات دانش‌آموزان، والدین و معلمان</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* فرم ثبت نظر */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-12">
            <h2 className="text-xl font-bold mb-6 text-center" style={{ color: '#0a4a8f' }}>ثبت نظر</h2>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="text-3xl hover:scale-125 transition-transform">
                  <Star className={star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
                </button>
              ))}
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              placeholder="نظر خود را بنویسید..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
            ></textarea>
            <button
              onClick={addTestimonial}
              className="w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2"
              style={{ backgroundColor: '#0a4a8f' }}
            >
              <Send className="w-5 h-5" />
              ثبت نظر
            </button>
          </div>

          {/* لیست نظرات */}
          {loading ? (
            <p className="text-center text-gray-500">در حال بارگذاری...</p>
          ) : testimonials.length === 0 ? (
            <p className="text-center text-gray-500">هنوز نظری ثبت نشده است</p>
          ) : (
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: '#0a4a8f' }}>{testimonial.userName}</h3>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(testimonial.createdAt).toLocaleDateString('fa-IR')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={star <= testimonial.rating ? 'w-4 h-4 text-yellow-500 fill-yellow-500' : 'w-4 h-4 text-gray-300'} />
                        ))}
                      </div>
                      {user && user.role === 'admin' && (
                        <button onClick={() => deleteTestimonial(testimonial.id)} className="text-red-500">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}