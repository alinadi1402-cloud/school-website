'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, ClipboardList, AlertCircle } from 'lucide-react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    { 
      question: 'روال و مراحل ثبت‌نام در سایت چگونه است؟', 
      answer: 'فرآیند ثبت‌نام آنلاین به صورت گام‌به‌گام انجام می‌شود: ۱. ورود به سامانه ۲. ایجاد حساب کاربری ۳. تکمیل مرحله‌ای فرم‌ها ۴. بارگذاری مدارک ۵. بازبینی و تأیید نهایی ۶. پرداخت هزینه ۷. دریافت کد رهگیری ۸. مراجعه حضوری'
    },
    { 
      question: 'چطور در سامانه ثبت‌نام کنم؟', 
      answer: 'به وب‌سایت رسمی مدرسه مراجعه کنید، شماره موبایل سرپرست را وارد کنید، کد تأیید پیامکی (OTP) را دریافت و وارد کنید، سپس فرم‌ها را مرحله به مرحله تکمیل کنید.'
    },
    { 
      question: 'چه مدارکی باید بارگذاری کنم؟', 
      answer: 'اسکن شناسنامه، کارت ملی، عکس پرسنلی و کارنامه سال قبل. فرمت مجاز JPG یا PDF و حداکثر حجم ۵۰۰ کیلوبایت است.'
    },
    { 
      question: 'آیا امکان ذخیره موقت اطلاعات وجود دارد؟', 
      answer: 'بله، در هر مرحله امکان ذخیره موقت (پیش‌نویس) وجود دارد تا بتوانید بعداً ادامه دهید.'
    },
    { 
      question: 'بعد از ثبت‌نام آنلاین چه اتفاقی می‌افتد؟', 
      answer: 'پس از تکمیل موفق، یک کد رهگیری به شما نمایش داده و پیامک می‌شود. سپس باید با در دست داشتن اصل مدارک و کد رهگیری، در زمان مقرر به مدرسه مراجعه کنید.'
    },
    { 
      question: 'آیا ثبت‌نام آنلاین قطعی است؟', 
      answer: 'خیر، در بسیاری از مدارس ثبت‌نام آنلاین به معنای ثبت‌نام قطعی نیست. باید برای تکمیل پرونده فیزیکی، امضای تعهدات و شرکت در مصاحبه یا آزمون ورودی به مدرسه مراجعه کنید.'
    },
    { 
      question: 'کد رهگیری چیست؟', 
      answer: 'کد رهگیری یک شماره پیگیری منحصر به فرد است که پس از ثبت‌نام موفق به شما داده می‌شود. این کد برای پیگیری‌های بعدی ضروری است، پس آن را یادداشت یا اسکرین‌شات کنید.'
    },
    { 
      question: 'مهلت ثبت‌نام چقدر است؟', 
      answer: 'حتماً به بازه زمانی اعلام‌شده توسط مدرسه توجه کنید. پس از پایان مهلت، سامانه بسته می‌شود و امکان ثبت‌نام وجود ندارد.'
    },
    { 
      question: 'چه نکاتی برای ثبت‌نام صحیح مهم است؟', 
      answer: '۱. کد ملی و تاریخ تولد را دقیق وارد کنید ۲. از مرورگر به‌روز مانند Chrome استفاده کنید ۳. کد رهگیری را حتماً ذخیره کنید ۴. حجم و فرمت مدارک را رعایت کنید.'
    },
    { 
      question: 'شرایط ثبت‌نام در مدرسه چیست؟', 
      answer: 'برای ثبت‌نام در دبیرستان تیزهوشان، دانش‌آموزان باید در آزمون ورودی شرکت کنند و حد نصاب نمره را کسب نمایند.'
    },
  ]

  const tips = [
    'مهلت ثبت‌نام: حتماً به بازه زمانی اعلام‌شده توجه کنید؛ پس از پایان مهلت، سامانه بسته می‌شود.',
    'صحت اطلاعات: وارد کردن کد ملی و تاریخ تولد اشتباه می‌تواند در ثبت‌نام نهایی اختلال ایجاد کند.',
    'مرورگر مناسب: از به‌روز بودن مرورگر (Chrome یا Firefox) اطمینان حاصل کنید.',
    'ذخیره کد رهگیری: کد رهگیری را یادداشت یا اسکرین‌شات کنید، زیرا تنها راه پیگیری وضعیت پرونده است.',
  ]

  return (
    <>
      <section className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-4 text-center">
          <ClipboardList className="w-16 h-16 mx-auto mb-4" style={{ color: '#03e434' }} />
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#0a4a8f' }}>سوالات متداول</h1>
          <p className="text-xl text-gray-600">پاسخ به سوالات پرتکرار شما</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* نکات مهم */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#0a4a8f' }}>
              <AlertCircle className="w-6 h-6" />
              نکات مهم برای والدین
            </h2>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="font-bold" style={{ color: '#0a4a8f' }}>•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* سوالات */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-right hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold" style={{ color: '#0a4a8f' }}>{faq.question}</span>
                  {openIndex === index ? <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: '#0a4a8f' }} /> : <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: '#0a4a8f' }} />}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}