'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Newspaper } from 'lucide-react'
import { Suspense } from 'react'

function NewsContent() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const [newsItems, setNewsItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/news')
        const data = await res.json()
        if (data.success && data.news.length > 0) {
          let items = data.news
          if (search) {
            items = items.filter((news: any) => 
              news.title.includes(search) || news.content.includes(search)
            )
          }
          setNewsItems(items)
        } else {
          const savedNews = JSON.parse(localStorage.getItem('news') || '[]')
          let items = savedNews
          if (search) {
            items = items.filter((news: any) => 
              news.title.includes(search) || news.content.includes(search)
            )
          }
          setNewsItems(items)
        }
      } catch (error) {
        const savedNews = JSON.parse(localStorage.getItem('news') || '[]')
        let items = savedNews
        if (search) {
          items = items.filter((news: any) => 
            news.title.includes(search) || news.content.includes(search)
          )
        }
        setNewsItems(items)
      }
      setLoading(false)
    }
    loadNews()
  }, [search])

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#0a4a8f' }}>اخبار و رویدادها</h1>
          <p className="text-xl text-gray-600">
            {search ? `نتایج جستجو برای: "${search}"` : 'آخرین اخبار و رویدادهای مدرسه'}
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          {loading ? (
            <p className="text-center text-gray-500">در حال بارگذاری...</p>
          ) : newsItems.length === 0 ? (
            <div className="text-center bg-white p-8 rounded-xl border border-gray-200">
              <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">{search ? 'نتیجه‌ای یافت نشد' : 'هنوز خبری ثبت نشده است'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsItems.map((news) => (
                <div key={news.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {news.imageData ? (
                    <img src={news.imageData} alt={news.title} className="h-48 w-full object-cover" />
                  ) : (
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <Newspaper className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2" style={{ color: '#0a4a8f' }}>{news.title}</h3>
                    <p className="text-gray-600 text-sm">{news.content}</p>
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(news.createdAt).toLocaleDateString('fa-IR')}
                    </p>
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

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">در حال بارگذاری...</div>}>
      <NewsContent />
    </Suspense>
  )
}