import { Trophy, Medal, Award, Star, Users, Target, GraduationCap, TrendingUp } from 'lucide-react'

export default function AchievementsPage() {
  const olympiadMedals = [
    { id: 1, title: 'المپیاد ریاضی', gold: 5, silver: 8, bronze: 12, year: '۱۴۰۴' },
    { id: 2, title: 'المپیاد فیزیک', gold: 3, silver: 6, bronze: 9, year: '۱۴۰۴' },
    { id: 3, title: 'المپیاد شیمی', gold: 4, silver: 7, bronze: 10, year: '۱۴۰۴' },
    { id: 4, title: 'المپیاد زیست', gold: 2, silver: 5, bronze: 8, year: '۱۴۰۴' },
    { id: 5, title: 'المپیاد ادبی', gold: 6, silver: 9, bronze: 11, year: '۱۴۰۴' },
  ]

  const universityAcceptance = [
    { university: 'دانشگاه تهران', students: 45, percentage: 95 },
    { university: 'دانشگاه شریف', students: 35, percentage: 90 },
    { university: 'دانشگاه امیرکبیر', students: 30, percentage: 85 },
    { university: 'دانشگاه علم و صنعت', students: 25, percentage: 80 },
  ]

  const competitions = [
    { id: 1, title: 'مسابقات کشوری قرآن', rank: 'مقام اول', year: '۱۴۰۴' },
    { id: 2, title: 'جشنواره خوارزمی', rank: 'رتبه برگزیده', year: '۱۴۰۳' },
    { id: 3, title: 'مسابقات ورزشی منطقه', rank: 'مقام اول', year: '۱۴۰۴' },
    { id: 4, title: 'مسابقات هنری', rank: 'مقام دوم', year: '۱۴۰۳' },
  ]

  return (
    <>
      {/* Hero کوچک */}
      <section className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-4 text-center" style={{ color: '#0a4a8f' }}>
          <Trophy className="w-16 h-16 mx-auto mb-4" style={{ color: '#d4af37' }} />
          <h1 className="text-4xl font-bold mb-4">افتخارات مدرسه</h1>
          <p className="text-xl">درخشش دانش‌آموزان در عرصه‌های مختلف</p>
        </div>
      </section>

      {/* آمار کلی */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4" style={{ color: '#0a4a8f' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8" style={{ color: '#0a4a8f' }}>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center" style={{ color: '#0a4a8f' }}>
              <Medal className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <div className="text-4xl font-bold text-blue-600 mb-2" style={{ color: '#0a4a8f' }}>۲۰+</div>
              <p className="text-gray-600">مدال طلای المپیاد</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center" style={{ color: '#0a4a8f' }}>
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <div className="text-4xl font-bold text-blue-600 mb-2" style={{ color: '#0a4a8f' }}>۳۵+</div>
              <p className="text-gray-600">مدال نقره المپیاد</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center" style={{ color: '#0a4a8f' }}>
              <Star className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <div className="text-4xl font-bold text-blue-600 mb-2" style={{ color: '#0a4a8f' }}>۵۰+</div>
              <p className="text-gray-600">مدال برنز المپیاد</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center" style={{ color: '#0a4a8f' }}>
              <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <div className="text-4xl font-bold text-blue-600 mb-2" style={{ color: '#0a4a8f' }}>۹۵٪</div>
              <p className="text-gray-600">قبولی در دانشگاه برتر</p>
            </div>
          </div>
        </div>
      </section>

      {/* المپیادها */}
      <section className="py-16">
        <div className="container mx-auto px-4" style={{ color: '#0a4a8f' }}>
          <h2 className="text-3xl font-bold mb-12 text-center">مدال‌های المپیاد</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ color: '#0a4a8f' }}>
            <div className="overflow-x-auto" style={{ color: '#0a4a8f' }}>
              <table className="w-full">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-right">رشته المپیاد</th>
                    <th className="px-4 py-3 text-center">🥇 طلا</th>
                    <th className="px-4 py-3 text-center">🥈 نقره</th>
                    <th className="px-4 py-3 text-center">🥉 برنز</th>
                    <th className="px-4 py-3 text-center">سال</th>
                  </tr>
                </thead>
                <tbody>
                  {olympiadMedals.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-bold">{item.title}</td>
                      <td className="px-4 py-3 text-center text-yellow-600 font-bold">{item.gold}</td>
                      <td className="px-4 py-3 text-center text-gray-500 font-bold">{item.silver}</td>
                      <td className="px-4 py-3 text-center text-orange-600 font-bold">{item.bronze}</td>
                      <td className="px-4 py-3 text-center text-gray-500">{item.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* قبولی دانشگاه */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4" style={{ color: '#0a4a8f' }}>
          <h2 className="text-3xl font-bold mb-12 text-center">قبولی در دانشگاه‌های برتر</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {universityAcceptance.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg" style={{ color: '#0a4a8f' }}>
                <div className="flex justify-between items-center mb-3" style={{ color: '#0a4a8f' }}>
                  <h3 className="text-xl font-bold">{item.university}</h3>
                  <span className="text-blue-600 font-bold">٪{item.percentage}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3" style={{ color: '#0a4a8f' }}>
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: item.percentage + '%' }}
                  ></div>
                </div>
                <p className="text-gray-500 mt-2 text-sm">
                  تعداد قبولی: {item.students} نفر
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* مسابقات */}
      <section className="py-16">
        <div className="container mx-auto px-4" style={{ color: '#0a4a8f' }}>
          <h2 className="text-3xl font-bold mb-12 text-center">مسابقات و جشنواره‌ها</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {competitions.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4" style={{ color: '#0a4a8f' }}>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center" style={{ color: '#0a4a8f' }}>
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-blue-600 font-bold mt-1">{item.rank}</p>
                  <p className="text-gray-500 text-sm mt-1">سال {item.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* نظر دانش‌آموختگان */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4" style={{ color: '#0a4a8f' }}>
          <h2 className="text-3xl font-bold mb-12 text-center">افتخارات دانش‌آموختگان</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">فارغ‌التحصیلان موفق</h3>
              <p className="text-gray-600">بیش از ۱۰۰۰ دانش‌آموخته در مشاغل برتر</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center" style={{ color: '#0a4a8f' }}>
              <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">رشد علمی</h3>
              <p className="text-gray-600">رشد مستمر در نتایج کنکور و المپیاد</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center" style={{ color: '#0a4a8f' }}>
              <Star className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">افتخارات بین‌المللی</h3>
              <p className="text-gray-600">کسب مدال در المپیادهای جهانی</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}