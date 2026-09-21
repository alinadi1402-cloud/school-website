'use client'

import { useState } from 'react'
import { ExternalLink, Trophy, FlaskConical, Users, Star, Calendar, Award } from 'lucide-react'

export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState('all')

  const programs = [
     {
      id: 11,
      title: 'کارسوق‌های دانش‌آموزی',
      category: 'کارسوق‌ها',
      description: 'کارسوق‌ها دوره‌های کوتاه‌مدت آموزشی هستند که توسط مدارس استعدادهای درخشان و دانشگاه‌ها برگزار می‌شوند.',
      link: 'https://sampad.gov.ir',
      linkText: 'اطلاعات بیشتر',
      icon: 'Calendar',
      level: 'همه مقاطع'
    },
    {
      id: 7,
      title: 'جشنواره جوان خوارزمی',
      category: 'جشنواره‌ها',
      description: 'جشنواره جوان خوارزمی قدیمی‌ترین جشنواره علمی دانش‌آموزی ایران است که هر ساله در بخش‌های مختلف برگزار می‌شود.',
      link: 'https://kharazmi.sampad.gov.ir',
      linkText: 'ثبت‌نام در جشنواره خوارزمی',
      icon: 'Award',
      level: 'متوسطه اول و دوم'
    },
    {
      id: 8,
      title: 'جشنواره نوجوان خوارزمی',
      category: 'جشنواره‌ها',
      description: 'جشنواره نوجوان خوارزمی ویژه دانش‌آموزان متوسطه اول است و شامل محورهای مختلف علمی و پژوهشی می‌شود.',
      link: 'https://kharazmi.sampad.gov.ir',
      linkText: 'ثبت‌نام در جشنواره نوجوان خوارزمی',
      icon: 'Award',
      level: 'متوسطه اول'
    },
    {
      id: 9,
      title: 'جشنواره ابن سینا',
      category: 'جشنواره‌ها',
      description: 'جشنواره ابن سینا با هدف ترویج علوم پایه و شناسایی استعدادهای دانش‌آموزی برگزار می‌شود.',
      link: 'https://ebnesinafestival.com',
      linkText: 'ثبت‌نام در جشنواره ابن سینا',
      icon: 'Award',
      level: 'همه مقاطع'
    },
    {
      id: 10,
      title: 'انجمن علمی ریاضی',
      category: 'انجمن‌های علمی',
      description: 'انجمن‌های علمی مدارس استعدادهای درخشان فرصتی برای فعالیت‌های پژوهشی و علمی دانش‌آموزان فراهم می‌کنند.',
      link: 'https://sampad.gov.ir',
      linkText: 'اطلاعات بیشتر',
      icon: 'Users',
      level: 'همه مقاطع'
    },
  ]

  const categories = ['all', 'کارسوق‌ها', 'جشنواره‌ها', 'انجمن‌های علمی']

  const filteredPrograms = activeTab === 'all' ? programs : programs.filter(p => p.category === activeTab)

  const getIcon = (iconName: string) => {
    if (iconName === 'Trophy') return <Trophy className="w-8 h-8" />
    if (iconName === 'FlaskConical') return <FlaskConical className="w-8 h-8" />
    if (iconName === 'Star') return <Star className="w-8 h-8" />
    if (iconName === 'Award') return <Award className="w-8 h-8" />
    if (iconName === 'Users') return <Users className="w-8 h-8" />
    return <Calendar className="w-8 h-8" />
  }

  return (
    <>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Award className="w-16 h-16 mx-auto mb-4" style={{ color: '#d4af37' }} />
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#0a4a8f' }}>برنامه‌ها و فرصت‌ها</h1>
          <p className="text-xl text-gray-600">کارسوق‌ها، جشنواره‌ها، المپیادها و انجمن‌های علمی</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* فیلترها */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className="px-6 py-2 rounded-full font-bold text-sm transition-all"
                style={{
                  backgroundColor: activeTab === category ? '#0a4a8f' : 'white',
                  color: activeTab === category ? 'white' : '#0a4a8f',
                  border: '2px solid #0a4a8f'
                }}
              >
                {category === 'all' ? 'همه' : category}
              </button>
            ))}
          </div>

          {/* لیست برنامه‌ها */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#e8f0fe' }}>
                      <span style={{ color: '#0a4a8f' }}>{getIcon(program.icon)}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: '#0a4a8f' }}>{program.title}</h3>
                      <span className="text-xs px-3 py-1 rounded-full font-bold" style={{ backgroundColor: '#e8f0fe', color: '#0a4a8f' }}>
                        {program.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{program.description}</p>
                  <p className="text-gray-400 text-xs mb-4">مقطع: {program.level}</p>
                </div>
                <div className="p-4 border-t border-gray-100">
                  <a
                    href={program.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-bold text-sm hover:underline"
                    style={{ color: '#0a4a8f' }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    {program.linkText}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <p className="text-center text-gray-500 py-8">برنامه‌ای در این دسته وجود ندارد</p>
          )}
        </div>
      </section>
    </>
  )
}