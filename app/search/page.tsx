'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, Newspaper, Image, Users, Award, FileText, MessageSquare, ChevronLeft } from 'lucide-react'
import { Suspense } from 'react'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    if (!query) return
    
    const allResults: any[] = []
    
    // جستجو در اخبار
    const news = JSON.parse(localStorage.getItem('news') || '[]')
    news.forEach((item: any) => {
      if (item.title.includes(query) || item.content.includes(query)) {
        allResults.push({
          id: item.id,
          title: item.title,
          description: item.content.slice(0, 100),
          type: 'اخبار',
          link: '/news',
          icon: 'Newspaper'
        })
      }
    })
    
    // جستجو در گالری
    const gallery = JSON.parse(localStorage.getItem('gallery') || '[]')
    gallery.forEach((item: any) => {
      if (item.title.includes(query) || (item.description && item.description.includes(query))) {
        allResults.push({
          id: item.id,
          title: item.title,
          description: item.description || '',
          type: 'گالری',
          link: '/gallery',
          icon: 'Image'
        })
      }
    })
    
    // جستجو در معلمان
    const teachers = JSON.parse(localStorage.getItem('teachers') || '[]')
    teachers.forEach((item: any) => {
      if (item.name.includes(query) || item.subject.includes(query)) {
        allResults.push({
          id: item.id,
          title: item.name,
          description: item.subject + ' - ' + item.education,
          type: 'کادر آموزشی',
          link: '/teachers',
          icon: 'Users'
        })
      }
    })
    
    // جستجو در دستاوردها
    const achievements = JSON.parse(localStorage.getItem('achievements') || '[]')
    achievements.forEach((item: any) => {
      if (item.title.includes(query)) {
        allResults.push({
          id: item.id,
          title: item.title,
          description: item.value,
          type: 'افتخارات',
          link: '/achievements',
          icon: 'Award'
        })
      }
    })
    
    // جستجو در نظرات
    const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]')
    testimonials.forEach((item: any) => {
      if (item.userName.includes(query) || item.comment.includes(query)) {
        allResults.push({
          id: item.id,
          title: item.userName,
          description: item.comment.slice(0, 100),
          type: 'نظرات',
          link: '/testimonials',
          icon: 'MessageSquare'
        })
      }
    })
    
    // جستجو در سوالات متداول
    const faqKeywords = [
      { title: 'ثبت‌نام آنلاین', description: 'شرایط و مراحل ثبت‌نام', type: 'سوالات متداول', link: '/faq' },
      { title: 'قوانین و مقررات', description: 'قوانین مدرسه', type: 'قوانین', link: '/rules' },
      { title: 'تماس با ما', description: 'اطلاعات تماس مدرسه', type: 'تماس', link: '/contact' },
      { title: 'درباره ما', description: 'آشنایی با مدرسه', type: 'درباره ما', link: '/about' },
    ]
    faqKeywords.forEach((item: any) => {
      if (item.title.includes(query) || item.description.includes(query)) {
        allResults.push({ ...item, icon: 'FileText' })
      }
    })
    
    setResults(allResults)
  }, [query])

  const getIcon = (iconName: string) => {
    if (iconName === 'Newspaper') return <Newspaper className="w-5 h-5" />
    if (iconName === 'Image') return <Image className="w-5 h-5" />
    if (iconName === 'Users') return <Users className="w-5 h-5" />
    if (iconName === 'Award') return <Award className="w-5 h-5" />
    if (iconName === 'MessageSquare') return <MessageSquare className="w-5 h-5" />
    return <FileText className="w-5 h-5" />
  }

  return (
    <>
      <section className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-4 text-center">
          <Search className="w-16 h-16 mx-auto mb-4" style={{ color: '#0a4a8f' }} />
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#0a4a8f' }}>نتایج جستجو</h1>
          <p className="text-xl text-gray-600">
            {query ? `نتایج برای: "${query}"` : 'عبارتی را جستجو کنید'}
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-4 max-w-3xl">
          {results.length === 0 ? (
            <div className="text-center bg-white p-8 rounded-xl border border-gray-200">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">نتیجه‌ای یافت نشد</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result, index) => (
                <Link
                  key={index}
                  href={result.link}
                  className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#e8f0fe' }}>
                      <span style={{ color: '#0a4a8f' }}>{getIcon(result.icon)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-lg" style={{ color: '#0a4a8f' }}>{result.title}</h3>
                        <span className="text-xs px-3 py-1 rounded-full font-bold" style={{ backgroundColor: '#e8f0fe', color: '#0a4a8f' }}>
                          {result.type}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{result.description}</p>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">در حال بارگذاری...</div>}>
      <SearchContent />
    </Suspense>
  )
}