'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Award, Users, Clock, GraduationCap, Newspaper, ArrowLeft, BookOpen, Trophy, Star, Image, Search } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [newsItems, setNewsItems] = useState<any[]>([])
  const [galleryItems, setGalleryItems] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [achievements, setAchievements] = useState<any[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [showPopup, setShowPopup] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      // خوندن از دیتابیس
      try {
        const newsRes = await fetch('/api/news')
        const newsData = await newsRes.json()
        if (newsData.success && newsData.news.length > 0) {
          setNewsItems(newsData.news.slice(0, 3))
        } else {
          const savedNews = JSON.parse(localStorage.getItem('news') || '[]')
          setNewsItems(savedNews.slice(0, 3))
        }
      } catch (error) {
        const savedNews = JSON.parse(localStorage.getItem('news') || '[]')
        setNewsItems(savedNews.slice(0, 3))
      }

      try {
        const galleryRes = await fetch('/api/gallery')
        const galleryData = await galleryRes.json()
        if (galleryData.success && galleryData.gallery.length > 0) {
          setGalleryItems(galleryData.gallery)
        } else {
          const savedGallery = JSON.parse(localStorage.getItem('gallery') || '[]')
          setGalleryItems(savedGallery)
        }
      } catch (error) {
        const savedGallery = JSON.parse(localStorage.getItem('gallery') || '[]')
        setGalleryItems(savedGallery)
      }

      try {
        const testimonialsRes = await fetch('/api/testimonials')
        const testimonialsData = await testimonialsRes.json()
        if (testimonialsData.success && testimonialsData.testimonials.length > 0) {
          setTestimonials(testimonialsData.testimonials.slice(0, 3))
        } else {
          const savedTestimonials = JSON.parse(localStorage.getItem('testimonials') || '[]')
          setTestimonials(savedTestimonials.slice(0, 3))
        }
      } catch (error) {
        const savedTestimonials = JSON.parse(localStorage.getItem('testimonials') || '[]')
        setTestimonials(savedTestimonials.slice(0, 3))
      }

      const savedAchievements = JSON.parse(localStorage.getItem('achievements') || 'null')
      setAchievements(savedAchievements || [
        { id: 1, title: 'قبولی در دانشگاه‌های برتر', value: '95%' },
        { id: 2, title: 'مدال المپیاد', value: '50+' },
        { id: 3, title: 'سال سابقه درخشان', value: '30+' },
        { id: 4, title: 'دانش‌آموخته موفق', value: '1000+' },
      ])
    }
    loadData()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false)
    }, 6000)
    return () => clearTimeout(timer)
  }, [])

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('لطفاً عبارت جستجو را وارد کنید!')
      return
    }
    router.push('/search?q=' + encodeURIComponent(searchQuery))
  }

  return (
    <>
      {/* پاپ‌آپ */}
      {showPopup && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowPopup(false)}
        >
          <div className="text-center px-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full mx-auto mb-6 overflow-hidden border-4 border-[#d4af37] bg-white shadow-2xl shadow-[#d4af37]/40">
              <img src="/sampad-logo.png" alt="لوگوی سمپاد" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-3 mb-8">
              <p className="text-2xl md:text-3xl font-extrabold text-white">ایمان و تلاش</p>
              <p className="text-xl md:text-2xl font-bold text-[#d4af37]">مسئولیت‌ پذیری و تعهد</p>
              <p className="text-lg md:text-xl font-medium text-white/80">استعداد برتر</p>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="px-10 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#d4af37', color: '#1a1a2e' }}
            >
              ورود به سایت
            </button>
          </div>
        </div>
      )}

      {/* Hero */}
<section 
  className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: 'url(/hero-bg.png)' }}
>
  {/* لایه تاریک روی عکس */}
  <div className="absolute inset-0 bg-black/40"></div>
  
  {/* محتوا */}
  <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
    <h1 
      className="text-3xl md:text-5xl font-extrabold mb-6 whitespace-nowrap text-white"
      style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
    >
      دبیرستان دخترانه فرزانگان (سمپاد)
    </h1>
    <p 
      className="text-xl md:text-2xl mb-10 text-white/95"
      style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
    >
      پرورش استعدادهای درخشان، ساختن آینده‌ای روشن
    </p>
    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-200 max-w-xl mx-auto">
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter') handleSearch() }}
          placeholder="جستجو در سایت..."
          className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:border-blue-500"
        />
        <button 
          onClick={handleSearch}
          className="px-8 py-4 rounded-lg text-white font-bold text-lg flex items-center justify-center gap-2"
          style={{ backgroundColor: '#0a4a8f' }}
        >
          <Search className="w-5 h-5" />
          جستجو
        </button>
      </div>
    </div>
    <div className="mt-8 flex gap-6 justify-center">
      <Link href="/admission" className="font-bold text-white hover:underline">ثبت‌نام آنلاین</Link>
      <Link href="/news" className="font-bold text-white hover:underline">اخبار مدرسه</Link>
    </div>
  </div>
</section>

{/* دستاوردها */}
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#0a4a8f' }}>دستاوردهای ما</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
      {achievements.map((achievement) => (
        <div key={achievement.id} className="text-center bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <Trophy className="w-12 h-12 mx-auto mb-3" style={{ color: '#0a4a8f' }} />
          <div className="text-4xl font-extrabold mb-2" style={{ color: '#0a4a8f' }}>{achievement.value}</div>
          <p className="text-gray-600 text-sm">{achievement.title}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* عکس روز */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#0a4a8f' }}>عکس روز</h2>
          {galleryItems.length > 0 ? (
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-lg">
                  {galleryItems[currentSlide].imageData ? (
                    <img src={galleryItems[currentSlide].imageData} alt={galleryItems[currentSlide].title} className="w-full h-80 md:h-96 object-cover" />
                  ) : (
                    <div className="h-80 md:h-96 bg-gray-100 flex items-center justify-center">
                      <Image className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: '#0a4a8f' }}>{galleryItems[currentSlide].title}</h3>
                      {galleryItems[currentSlide].description && (
                        <p className="text-gray-600 text-sm mt-1">{galleryItems[currentSlide].description}</p>
                      )}
                    </div>
                    <span className="text-gray-500 text-sm">{currentSlide + 1} / {galleryItems.length}</span>
                  </div>
                </div>
                <button onClick={() => setCurrentSlide(currentSlide === 0 ? galleryItems.length - 1 : currentSlide - 1)} className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-lg border border-gray-200 flex items-center justify-center hover:bg-white transition-colors z-10" style={{ color: '#0a4a8f' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={() => setCurrentSlide(currentSlide === galleryItems.length - 1 ? 0 : currentSlide + 1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-lg border border-gray-200 flex items-center justify-center hover:bg-white transition-colors z-10" style={{ color: '#0a4a8f' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
              <div className="flex justify-center gap-3 mt-6">
                {galleryItems.map((item, index) => (
                  <button key={item.id} onClick={() => setCurrentSlide(index)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${currentSlide === index ? 'border-blue-500 scale-110' : 'border-gray-200 hover:border-blue-300'}`}>
                    {item.imageData ? (
                      <img src={item.imageData} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center"><Image className="w-6 h-6 text-gray-400" /></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">هنوز تصویری ثبت نشده است</p>
          )}
        </div>
      </section>

      {/* اخبار */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#0a4a8f' }}>آخرین اخبار</h2>
          {newsItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {newsItems.map((news) => (
                <div key={news.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {news.imageData ? (
                    <img src={news.imageData} alt={news.title} className="h-40 w-full object-cover" />
                  ) : (
                    <div className="h-40 bg-gray-100 flex items-center justify-center"><Newspaper className="w-12 h-12 text-gray-400" /></div>
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2" style={{ color: '#0a4a8f' }}>{news.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{news.content ? news.content.slice(0, 80) + '...' : ''}</p>
                    <a href="/news" className="inline-flex items-center gap-1 font-bold text-sm hover:underline" style={{ color: '#0a4a8f' }}>
                      ادامه مطلب
                      <ArrowLeft className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">هنوز خبری ثبت نشده است</p>
          )}
        </div>
      </section>

      {/* نظرات */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#0a4a8f' }}>نظرات کاربران</h2>
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex gap-1 mb-3 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={star <= testimonial.rating ? 'w-4 h-4 text-yellow-500 fill-yellow-500' : 'w-4 h-4 text-gray-300'} />
                    ))}
                  </div>
                  <p className="text-gray-600 text-center">{testimonial.comment ? testimonial.comment.slice(0, 100) + '...' : ''}</p>
                  <p className="font-bold text-center text-sm mt-3">{testimonial.userName}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">هنوز نظری ثبت نشده است</p>
          )}
        </div>
      </section>
    </>
  )
}