import Link from 'next/link'
import { School, Phone, Mail, MapPin, Home, Info, Newspaper, Contact } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* اطلاعات مدرسه */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <School className="w-6 h-6" />
              دبیرستان دخترانه فرزانگان تیزهوشان
            </h3>
            <p className="text-gray-300">
              پرورش استعدادهای درخشان، ساختن آینده‌ای روشن
            </p>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h3 className="text-xl font-bold mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white flex items-center gap-2">
                  <Newspaper className="w-4 h-4" />
                  اخبار
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white flex items-center gap-2">
                  <Contact className="w-4 h-4" />
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          {/* اطلاعات تماس */}
          <div>
            <h3 className="text-xl font-bold mb-4">اطلاعات تماس</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                ۰۵۱-۱۲۳۴۵۶۷۸
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@school.ir
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                خواف، خیابان...
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p> copyright {new Date().getFullYear()} تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  )
}