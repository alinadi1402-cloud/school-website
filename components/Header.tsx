'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkUser = () => {
      const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser')
      setUser(currentUser ? JSON.parse(currentUser) : null)
    }
    checkUser()
    window.addEventListener('storage', checkUser)
    return () => window.removeEventListener('storage', checkUser)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    sessionStorage.removeItem('currentUser')
    setUser(null)
    router.push('/')
  }

  const mainMenuItems = [
    { href: '/', label: 'خانه' },
    { href: '/admission', label: 'ثبت‌نام آنلاین' },
    { href: '/programs', label: 'برنامه‌ها و فرصت‌ها' },
    { href: '/surveys', label: 'نظرسنجی‌ها' },
    { href: '/exams', label: 'آزمون‌ها' },
    { href: '/teachers', label: 'کادر آموزشی' },
  ]

  const moreMenuItems = [
    { href: '/gallery', label: 'گالری' },
    { href: '/achievements', label: 'افتخارات' },
    { href: '/news', label: 'اخبار' },
    { href: '/testimonials', label: 'نظرات' },
    { href: '/faq', label: 'سوالات متداول' },
    { href: '/rules', label: 'قوانین و مقررات' },
    { href: '/about', label: 'درباره ما' },
    { href: '/contact', label: 'تماس با ما' },
  ]

  return (
    <header className="bg-white text-gray-700 sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* لوگو */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-16 h-16 md:w-18 md:h-18 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-white shrink-0">
            <img 
              src="/logo.png" 
              alt="لوگوی مدرسه"
              className="w-full h-full object-contain"
            />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold" style={{ color: '#0a4a8f' }}>دبیرستان فرزانگان خواف(سمپاد)</span>
              <span className="text-xs text-gray-500">مدرسه دخترانه</span>
            </div>
          </Link>

          {/* منوی دسکتاپ */}
          <div className="hidden lg:flex items-center gap-6">
            {mainMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${pathname === item.href ? 'font-bold' : 'hover:text-blue-700'}`}
                style={pathname === item.href ? { color: '#0a4a8f' } : {}}
              >
                {item.label}
              </Link>
            ))}

            {/* بیشتر */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center gap-1 text-sm font-medium hover:text-blue-700 transition-colors"
              >
                بیشتر
                <ChevronDown className={`w-4 h-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMoreOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-2">
                  {moreMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-4 py-2.5 text-sm transition-colors ${pathname === item.href ? 'bg-blue-50 font-bold' : 'hover:bg-gray-50'}`}
                      style={pathname === item.href ? { color: '#0a4a8f' } : {}}
                      onClick={() => setIsMoreOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* دکمه‌های کاربر */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-white" style={{ backgroundColor: '#0a4a8f' }}>
                  <User className="w-4 h-4" />
                  {user.fullName}
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-red-600 border border-red-200 hover:bg-red-50">
                  <LogOut className="w-4 h-4" />
                  خروج
                </button>
              </>
            ) : (
              <Link href="/login" className="px-6 py-2.5 rounded-lg font-bold text-sm text-white" style={{ backgroundColor: '#0a4a8f' }}>
                ورود
              </Link>
            )}
          </div>

          {/* منوی موبایل */}
          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* منوی موبایل */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-1">
            {mainMenuItems.map((item) => (
              <Link key={item.href} href={item.href} className="block px-4 py-2.5 rounded-lg text-sm hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="px-4 py-2 text-xs text-gray-500 font-bold">بیشتر</p>
              {moreMenuItems.map((item) => (
                <Link key={item.href} href={item.href} className="block px-4 py-2.5 rounded-lg text-sm hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 mt-2 border-t border-gray-200">
              {user ? (
                <>
                  <Link href="/dashboard" className="block px-4 py-3 rounded-lg text-white mb-2" style={{ backgroundColor: '#0a4a8f' }} onClick={() => setIsMenuOpen(false)}>
                    داشبورد - {user.fullName}
                  </Link>
                  <button onClick={handleLogout} className="block w-full px-4 py-3 rounded-lg text-red-600 border border-red-200">
                    خروج
                  </button>
                </>
              ) : (
                <Link href="/login" className="block text-center px-4 py-3 rounded-lg text-white font-bold" style={{ backgroundColor: '#0a4a8f' }} onClick={() => setIsMenuOpen(false)}>
                  ورود
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}