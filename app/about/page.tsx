import { Target, Lightbulb, Heart, Users, Award, BookOpen } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      {/* Hero کوچک */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#0a4a8f' }}>درباره ما</h1>
          <p className="text-xl">آشنایی با دبیرستان دخترانه فرزانگان</p>
        </div>
      </section>

      {/* تاریخچه */}
      <section className="py-16">
        <div className="container mx-auto px-4" style={{ color: '#0a4a8f' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">تاریخچه مدرسه</h2>
            <p className="text-lg leading-relaxed mb-6 text-gray-700">
              دبیرستان دخترانه تیزهوشان با هدف پرورش استعدادهای درخشان و ایجاد
              بستری مناسب برای رشد علمی، فرهنگی و اجتماعی دانش‌آموزان نخبه تأسیس
              شده است. ما با تکیه بر کادر آموزشی مجرب و امکانات پیشرفته، محیطی
              پویا و الهام‌بخش برای یادگیری فراهم کرده‌ایم.
            </p>
            <p className="text-lg leading-relaxed mb-6 text-gray-700">
              از زمان تأسیس، این مدرسه همواره در زمینه‌های مختلف علمی، المپیادها،
              مسابقات فرهنگی و ورزشی درخشیده و توانسته است جایگاه ویژه‌ای در
              میان مدارس برتر کشور کسب کند.
            </p>
          </div>
        </div>
      </section>

      {/* ارزش‌ها */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4" style={{ color: '#0a4a8f' }}>
          <h2 className="text-3xl font-bold mb-12 text-center">ارزش‌های ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">تعالی علمی</h3>
              <p className="text-gray-600">
                تلاش برای رسیدن به بالاترین سطح علمی و آموزشی
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center" style={{ color: '#0a4a8f' }}>
              <Lightbulb className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">خلاقیت و نوآوری</h3>
              <p className="text-gray-600">
                پرورش تفکر خلاق و روحیه نوآوری در دانش‌آموزان
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center" style={{ color: '#0a4a8f' }}>
              <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">مسئولیت‌پذیری</h3>
              <p className="text-gray-600">
                تربیت دانش‌آموزانی مسئولیت‌پذیر و متعهد به جامعه
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* کادر آموزشی */}
      <section className="py-16">
        <div className="container mx-auto px-4" style={{ color: '#0a4a8f' }}>
          <h2 className="text-3xl font-bold mb-12 text-center">کادر آموزشی</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {['دکتر مریم احمدی', 'دکتر زهرا محمدی', 'دکتر فاطمه رضایی', 'دکتر سارا کریمی'].map((name) => (
              <div key={name} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="w-24 h-24 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="font-bold">{name}</h3>
                <p className="text-sm text-gray-500 mt-1">عضو هیئت علمی</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}