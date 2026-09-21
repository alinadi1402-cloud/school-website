'use client'

import { useState, useEffect } from 'react'
import { Image as ImageIcon } from 'lucide-react'

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadGallery = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/gallery')
        const data = await res.json()
        if (data.success && data.gallery.length > 0) {
          setGalleryItems(data.gallery)
        } else {
          const savedGallery = JSON.parse(localStorage.getItem('gallery') || '[]')
          setGalleryItems(savedGallery)
        }
      } catch (error) {
        const savedGallery = JSON.parse(localStorage.getItem('gallery') || '[]')
        setGalleryItems(savedGallery)
      }
      setLoading(false)
    }
    loadGallery()
  }, [])

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#0a4a8f' }}>گالری تصاویر</h1>
          <p className="text-xl text-gray-600">لحظات به‌یادماندنی مدرسه</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          {loading ? (
            <p className="text-center text-gray-500">در حال بارگذاری...</p>
          ) : galleryItems.length === 0 ? (
            <div className="text-center bg-white p-8 rounded-xl border border-gray-200">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">هنوز تصویری ثبت نشده است</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {item.imageData ? (
                    <img src={item.imageData} alt={item.title} className="h-48 w-full object-cover" />
                  ) : (
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-sm" style={{ color: '#0a4a8f' }}>{item.title}</h3>
                    {item.description && <p className="text-gray-500 text-xs mt-1">{item.description}</p>}
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