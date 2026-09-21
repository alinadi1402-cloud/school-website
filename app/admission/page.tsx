'use client'

import { useState } from 'react'
import { 
  User, CreditCard, Calendar, FileText, Camera, MapPin, 
  Phone, GraduationCap, Briefcase, AlertCircle, CheckCircle,
  Upload, Heart, ClipboardList
} from 'lucide-react'

export default function AdmissionPage() {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [agreeToRules, setAgreeToRules] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    birthDate: '',
    birthCertificateNumber: '',
    birthCertificateSerial: '',
    photo: '',
    idCardImage: '',
    nationalCardImage: '',
    address: '',
    postalCode: '',
    homePhone: '',
    parentMobile: '',
    fatherName: '',
    motherName: '',
    fatherNationalId: '',
    motherNationalId: '',
    fatherEducation: '',
    motherEducation: '',
    fatherJob: '',
    motherJob: '',
    emergencyPhone: '',
    previousSchool: '',
    requestedGrade: '10',
    gpa: '',
    reportCardImage: '',
    medicalHistory: '',
    allergies: '',
    specialNeeds: '',
    field: 'ریاضی',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileUpload = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('حجم فایل نباید بیشتر از ۲ مگابایت باشد!')
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        handleInputChange(field, event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateStep = (currentStep: number): boolean => {
    if (currentStep === 1) {
      if (!formData.fullName || formData.fullName.length < 3) {
        alert('لطفاً نام و نام خانوادگی را کامل وارد کنید!')
        return false
      }
      if (!formData.nationalId || formData.nationalId.length !== 10) {
        alert('لطفاً کد ملی ۱۰ رقمی را وارد کنید!')
        return false
      }
      if (!formData.birthDate) {
        alert('لطفاً تاریخ تولد را وارد کنید!')
        return false
      }
      return true
    }
    
    if (currentStep === 2) {
      if (!formData.address || formData.address.length < 10) {
        alert('لطفاً آدرس کامل را وارد کنید!')
        return false
      }
      if (!formData.postalCode || formData.postalCode.length !== 10) {
        alert('لطفاً کد پستی ۱۰ رقمی را وارد کنید!')
        return false
      }
      if (!formData.parentMobile || formData.parentMobile.length !== 11) {
        alert('لطفاً شماره موبایل والدین را صحیح وارد کنید (۱۱ رقم)!')
        return false
      }
      return true
    }
    
    if (currentStep === 3) {
      if (!formData.fatherName) {
        alert('لطفاً نام پدر را وارد کنید!')
        return false
      }
      if (!formData.motherName) {
        alert('لطفاً نام مادر را وارد کنید!')
        return false
      }
      if (!formData.fatherNationalId || formData.fatherNationalId.length !== 10) {
        alert('لطفاً کد ملی پدر را صحیح وارد کنید!')
        return false
      }
      if (!formData.motherNationalId || formData.motherNationalId.length !== 10) {
        alert('لطفاً کد ملی مادر را صحیح وارد کنید!')
        return false
      }
      if (!formData.emergencyPhone) {
        alert('لطفاً شماره تماس اضطراری را وارد کنید!')
        return false
      }
      return true
    }
    
    if (currentStep === 4) {
      if (!formData.previousSchool) {
        alert('لطفاً نام مدرسه قبلی را وارد کنید!')
        return false
      }
      if (!formData.gpa) {
        alert('لطفاً معدل سال گذشته را وارد کنید!')
        return false
      }
      return true
    }
    
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeToRules) {
      alert('لطفاً با قوانین و مقررات موافقت کنید!')
      return
    }
    const applications = JSON.parse(localStorage.getItem('applications') || '[]')
    const newApplication = {
      id: Date.now(),
      ...formData,
      status: 'pending',
      submittedAt: new Date().toISOString()
    }
    applications.push(newApplication)
    localStorage.setItem('applications', JSON.stringify(applications))
    setIsSubmitted(true)
  }

  const inputClass = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
  const labelClass = "block font-bold mb-2 text-sm"
  const labelStyle = { color: '#0a4a8f' }

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#0a4a8f' }}>درخواست ثبت شد!</h2>
            <p className="text-gray-600 mb-6">درخواست ثبت‌نام شما با موفقیت ثبت شد. کارشناسان ما با شما تماس خواهند گرفت.</p>
            <a href="/" className="inline-block px-6 py-2 rounded-lg text-white font-bold" style={{ backgroundColor: '#0a4a8f' }}>بازگشت به صفحه اصلی</a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-4 text-center">
          <ClipboardList className="w-16 h-16 mx-auto mb-4" style={{ color: '#d4af37' }} />
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#0a4a8f' }}>ثبت‌نام آنلاین</h1>
          <p className="text-xl text-white-600">فرم ثبت‌نام دانش‌آموز جدید</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* نوار مراحل */}
          <div className="flex justify-center gap-4 mb-12">
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <div key={stepNum} className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: step >= stepNum ? '#0a4a8f' : '#d1d5db' }}
                >
                  {stepNum}
                </div>
                {stepNum < 5 && <div className="w-8 h-0.5" style={{ backgroundColor: step > stepNum ? '#0a4a8f' : '#d1d5db' }}></div>}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* مرحله ۱ */}
            {step === 1 && (
              <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: '#0a4a8f' }}>
                  <User className="w-6 h-6" />
                  اطلاعات هویتی دانش‌آموز
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={labelStyle}>نام و نام خانوادگی *</label>
                    <input type="text" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>کد ملی *</label>
                    <input type="text" value={formData.nationalId} onChange={(e) => handleInputChange('nationalId', e.target.value.replace(/[^0-9]/g, ''))} maxLength={10} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>تاریخ تولد *</label>
                    <input type="date" value={formData.birthDate} onChange={(e) => handleInputChange('birthDate', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>شماره شناسنامه</label>
                    <input type="text" value={formData.birthCertificateNumber} onChange={(e) => handleInputChange('birthCertificateNumber', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>سریال شناسنامه</label>
                    <input type="text" value={formData.birthCertificateSerial} onChange={(e) => handleInputChange('birthCertificateSerial', e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass} style={labelStyle}>عکس پرسنلی</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload('photo', e)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>تصویر شناسنامه</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload('idCardImage', e)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>تصویر کارت ملی</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload('nationalCardImage', e)} className={inputClass} />
                  </div>
                </div>
              </div>
            )}

            {/* مرحله ۲ */}
            {step === 2 && (
              <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: '#0a4a8f' }}>
                  <MapPin className="w-6 h-6" />
                  اطلاعات تماس و سکونت
                </h2>
                <div>
                  <label className={labelClass} style={labelStyle}>آدرس دقیق پستی منزل *</label>
                  <textarea value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} rows={3} className={inputClass}></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass} style={labelStyle}>کد پستی ۱۰ رقمی *</label>
                    <input type="text" value={formData.postalCode} onChange={(e) => handleInputChange('postalCode', e.target.value.replace(/[^0-9]/g, ''))} maxLength={10} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>تلفن ثابت منزل</label>
                    <input type="text" value={formData.homePhone} onChange={(e) => handleInputChange('homePhone', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>موبایل والدین *</label>
                    <input type="text" value={formData.parentMobile} onChange={(e) => handleInputChange('parentMobile', e.target.value.replace(/[^0-9]/g, ''))} maxLength={11} className={inputClass} />
                  </div>
                </div>
              </div>
            )}

            {/* مرحله ۳ */}
            {step === 3 && (
              <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: '#0a4a8f' }}>
                  <GraduationCap className="w-6 h-6" />
                  اطلاعات والدین و سرپرست
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} style={labelStyle}>نام پدر *</label>
                    <input type="text" value={formData.fatherName} onChange={(e) => handleInputChange('fatherName', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>نام مادر *</label>
                    <input type="text" value={formData.motherName} onChange={(e) => handleInputChange('motherName', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>کد ملی پدر *</label>
                    <input type="text" value={formData.fatherNationalId} onChange={(e) => handleInputChange('fatherNationalId', e.target.value.replace(/[^0-9]/g, ''))} maxLength={10} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>کد ملی مادر *</label>
                    <input type="text" value={formData.motherNationalId} onChange={(e) => handleInputChange('motherNationalId', e.target.value.replace(/[^0-9]/g, ''))} maxLength={10} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>تحصیلات پدر</label>
                    <input type="text" value={formData.fatherEducation} onChange={(e) => handleInputChange('fatherEducation', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>تحصیلات مادر</label>
                    <input type="text" value={formData.motherEducation} onChange={(e) => handleInputChange('motherEducation', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>شغل پدر</label>
                    <input type="text" value={formData.fatherJob} onChange={(e) => handleInputChange('fatherJob', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>شغل مادر</label>
                    <input type="text" value={formData.motherJob} onChange={(e) => handleInputChange('motherJob', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>شماره تماس اضطراری *</label>
                    <input type="text" value={formData.emergencyPhone} onChange={(e) => handleInputChange('emergencyPhone', e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>
            )}

            {/* مرحله ۴ */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: '#0a4a8f' }}>
                    <FileText className="w-6 h-6" />
                    سوابق تحصیلی
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} style={labelStyle}>نام مدرسه قبلی *</label>
                      <input type="text" value={formData.previousSchool} onChange={(e) => handleInputChange('previousSchool', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>پایه مورد تقاضا</label>
                      <select value={formData.requestedGrade} onChange={(e) => handleInputChange('requestedGrade', e.target.value)} className={inputClass}>
                        <option value="10">پایه دهم</option>
                        <option value="11">پایه یازدهم</option>
                        <option value="12">پایه دوازدهم</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>رشته</label>
                      <select value={formData.field} onChange={(e) => handleInputChange('field', e.target.value)} className={inputClass}>
                        <option value="ریاضی">ریاضی و فیزیک</option>
                        <option value="تجربی">علوم تجربی</option>
                        <option value="انسانی">علوم انسانی</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>معدل سال گذشته *</label>
                      <input type="text" value={formData.gpa} onChange={(e) => handleInputChange('gpa', e.target.value)} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>تصویر کارنامه سال قبل</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload('reportCardImage', e)} className={inputClass} />
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: '#0a4a8f' }}>
                    <Heart className="w-6 h-6" />
                    اطلاعات پزشکی
                  </h2>
                  <div>
                    <label className={labelClass} style={labelStyle}>سابقه بیماری خاص</label>
                    <textarea value={formData.medicalHistory} onChange={(e) => handleInputChange('medicalHistory', e.target.value)} rows={2} className={inputClass}></textarea>
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>حساسیت دارویی</label>
                    <input type="text" value={formData.allergies} onChange={(e) => handleInputChange('allergies', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle}>نیاز به مراقبت ویژه</label>
                    <input type="text" value={formData.specialNeeds} onChange={(e) => handleInputChange('specialNeeds', e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>
            )}

            {/* مرحله ۵ */}
            {step === 5 && (
              <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: '#0a4a8f' }}>
                  <CheckCircle className="w-6 h-6" />
                  تایید نهایی
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <p><strong>نام:</strong> {formData.fullName}</p>
                  <p><strong>کد ملی:</strong> {formData.nationalId}</p>
                  <p><strong>تاریخ تولد:</strong> {formData.birthDate}</p>
                  <p><strong>پایه:</strong> {formData.requestedGrade}</p>
                  <p><strong>رشته:</strong> {formData.field}</p>
                  <p><strong>مدرسه قبلی:</strong> {formData.previousSchool}</p>
                  <p><strong>معدل:</strong> {formData.gpa}</p>
                  <p><strong>موبایل والدین:</strong> {formData.parentMobile}</p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeToRules}
                    onChange={(e) => setAgreeToRules(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700">با قوانین و مقررات مدرسه موافقم *</span>
                </label>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-bold text-white text-lg"
                  style={{ backgroundColor: '#0a4a8f' }}
                >
                  ارسال درخواست ثبت‌نام
                </button>
              </div>
            )}

            {/* دکمه‌های ناوبری */}
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 rounded-lg font-bold border-2"
                  style={{ borderColor: '#0a4a8f', color: '#0a4a8f' }}
                >
                  قبلی
                </button>
              )}
              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep(step)) {
                      setStep(step + 1)
                    }
                  }}
                  className="px-6 py-2 rounded-lg font-bold text-white mr-auto"
                  style={{ backgroundColor: '#0a4a8f' }}
                >
                  بعدی
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}