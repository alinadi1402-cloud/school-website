import { Shield, BookOpen, Users, Clock, Award, AlertCircle, CheckCircle } from 'lucide-react'

export default function RulesPage() {
  const sections = [
    {
      id: 1,
      title: 'مقررات آموزشی',
      icon: BookOpen,
      rules: [
        'حضور به موقع در کلاس‌ها الزامی است',
        'دانش‌آموزان موظف به انجام تکالیف و پروژه‌های درسی هستند',
        'شرکت در امتحانات میان‌ترم و پایان‌ترم اجباری است',
        'استفاده از کتاب‌های کمک‌آموزشی مجاز با تایید معلم مربوطه امکان‌پذیر است',
        'دانش‌آموزان باید در کلاس‌های فوق‌برنامه شرکت فعال داشته باشند'
      ]
    },
    {
      id: 2,
      title: 'مقررات انضباطی',
      icon: Shield,
      rules: [
        'رعایت پوشش مناسب و مطابق با آیین‌نامه مدرسه الزامی است',
        'استفاده از تلفن همراه در ساعات کلاس ممنوع است',
        'احترام به معلمان، کارکنان و سایر دانش‌آموزان الزامی است',
        'آسیب رساندن به اموال مدرسه پیگرد انضباطی دارد',
        'غیبت غیرموجه بیش از حد مجاز منجر به اقدام انضباطی می‌شود'
      ]
    },
    {
      id: 3,
      title: 'مقررات حضور و غیاب',
      icon: Clock,
      rules: [
        'دانش‌آموزان باید حداقل ۱۰ دقیقه قبل از شروع کلاس در مدرسه حاضر باشند',
        'در صورت بیماری، والدین باید مدرسه را مطلع کنند',
        'خروج زودتر از مدرسه فقط با هماهنگی قبلی و اطلاع والدین مجاز است',
        'تاخیر مکرر در ورود به کلاس تخلف محسوب می‌شود'
      ]
    },
    {
      id: 4,
      title: 'مقررات ارزشیابی',
      icon: Award,
      rules: [
        'نمره نهایی از ترکیب نمرات مستمر، میان‌ترم و پایان‌ترم محاسبه می‌شود',
        'دانش‌آموزان حق اعتراض به نمره را از طریق سامانه دارند',
        'تقلب در امتحانات منجر به نمره صفر و اقدام انضباطی می‌شود',
        'شرکت در تمام جلسات امتحانی الزامی است'
      ]
    },
    {
      id: 5,
      title: 'حقوق دانش‌آموزان',
      icon: Users,
      rules: [
        'دانش‌آموزان حق دسترسی به امکانات آموزشی مدرسه را دارند',
        'دانش‌آموزان می‌توانند نظرات و پیشنهادات خود را از طریق صندوق نظرات مطرح کنند',
        'دانش‌آموزان حق استفاده از کتابخانه و آزمایشگاه را دارند',
        'محرمانه بودن اطلاعات شخصی دانش‌آموزان تضمین می‌شود'
      ]
    },
    {
      id: 6,
      title: 'تخلفات و پیامدها',
      icon: AlertCircle,
      rules: [
        'تخلفات به سه دسته سبک، متوسط و سنگین تقسیم می‌شوند',
        'تخلفات سبک: تذکر شفاهی و کتبی',
        'تخلفات متوسط: اطلاع به والدین و جلسه مشاوره',
        'تخلفات سنگین: جلسه کمیته انضباطی و تصمیم‌گیری مدیریت'
      ]
    }
  ]

  return (
    <>
      <section className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-16 h-16 mx-auto mb-4" style={{ color: '#d40404' }} />
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#0a4a8f' }}>قوانین و مقررات</h1>
          <p className="text-xl">آشنایی با قوانین و مقررات مدرسه</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4" style={{ color: '#0a4a8f' }}>
          <div className="max-w-4xl mx-auto space-y-8" style={{ color: '#0a4a8f' }}>
            {sections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <div 
                  key={section.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift animate-fade-in"
                  style={{ animationDelay: index * 0.1 + 's' }}
                >
                  <div className="bg-blue-50 p-6 flex items-center gap-3" style={{ color: '#0a4a8f' }}>
                    <IconComponent className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-blue-800">{section.title}</h2>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {section.rules.map((rule, ruleIndex) => (
                        <li key={ruleIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="max-w-4xl mx-auto mt-12 bg-blie-50 p-8 rounded-lg shadow-lg animate-fade-in" style={{ color: '#0a4a8f' }}>
            <h3 className="text-xl font-bold mb-4 text-blue-800 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              نکته مهم
            </h3>
            <p className="text-gray-700 leading-relaxed">
              تمام دانش‌آموزان و والدین موظف به مطالعه و رعایت قوانین و مقررات مدرسه هستند.
              عدم آگاهی از قوانین به عنوان عذر موجه پذیرفته نمی‌شود. در صورت نیاز به توضیحات
              بیشتر، می‌توانید با دفتر مدرسه تماس بگیرید.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}