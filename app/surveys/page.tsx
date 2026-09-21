'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MessageSquare, CheckCircle, Trash2, Plus, BarChart3 } from 'lucide-react'

export default function SurveysPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [surveys, setSurveys] = useState<any[]>([])
  const [surveyResponses, setSurveyResponses] = useState<any[]>([])
  const [selectedOption, setSelectedOption] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newSurveyTitle, setNewSurveyTitle] = useState('')
  const [newSurveyQuestion, setNewSurveyQuestion] = useState('')
  const [newSurveyOptions, setNewSurveyOptions] = useState('')

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser')
    if (currentUser) setUser(JSON.parse(currentUser))
    
    // بارگذاری از دیتابیس
    fetch('/api/surveys')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.surveys.length > 0) {
          const parsed = data.surveys.map((s: any) => ({ ...s, options: JSON.parse(s.options) }))
          setSurveys(parsed)
        } else {
          const saved = JSON.parse(localStorage.getItem('surveys') || '[]')
          setSurveys(saved)
        }
      })
      .catch(() => {
        const saved = JSON.parse(localStorage.getItem('surveys') || '[]')
        setSurveys(saved)
      })

    const savedResponses = JSON.parse(localStorage.getItem('surveyResponses') || '[]')
    setSurveyResponses(savedResponses)
  }, [])

  const addSurvey = () => {
    if (!newSurveyTitle || !newSurveyQuestion || !newSurveyOptions) { alert('همه را وارد کنید!'); return }
    const options = newSurveyOptions.split(',').map(opt => opt.trim())
    const newSurvey = { id: Date.now(), title: newSurveyTitle, question: newSurveyQuestion, options: options, createdBy: user?.fullName || 'نامشخص', createdAt: new Date().toLocaleDateString('fa-IR') }
    const updatedSurveys = [...surveys, newSurvey]
    setSurveys(updatedSurveys)
    localStorage.setItem('surveys', JSON.stringify(updatedSurveys))
    
    fetch('/api/surveys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newSurveyTitle, question: newSurveyQuestion, options: JSON.stringify(options), createdBy: user?.fullName || 'نامشخص' })
    }).catch(err => console.error(err))
    
    setNewSurveyTitle(''); setNewSurveyQuestion(''); setNewSurveyOptions('')
    setShowCreateForm(false)
    alert('نظرسنجی ایجاد شد!')
  }

  const deleteSurvey = (id: number) => {
    const updated = surveys.filter(s => s.id !== id)
    setSurveys(updated)
    localStorage.setItem('surveys', JSON.stringify(updated))
  }

  const submitResponse = (surveyId: number) => {
    if (!user) { alert('وارد شوید!'); router.push('/login'); return }
    if (!selectedOption) { alert('گزینه را انتخاب کنید!'); return }
    const newResponse = { id: Date.now(), surveyId, userId: user.id, userName: user.fullName, option: selectedOption, date: new Date().toLocaleDateString('fa-IR') }
    const updated = [...surveyResponses, newResponse]
    setSurveyResponses(updated)
    localStorage.setItem('surveyResponses', JSON.stringify(updated))
    setSelectedOption('')
    alert('پاسخ ثبت شد!')
  }

  const canViewResults = user?.role === 'admin' || user?.role === 'teacher'

  return (
    <>
      <section className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4" style={{ color: '#0a4a8f' }}>نظرسنجی‌ها</h1>
          <p className="text-xl text-gray-600">مشارکت در نظرسنجی‌های مدرسه</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {(user?.role === 'admin' || user?.role === 'teacher') && (
            <div className="max-w-2xl mx-auto mb-12">
              {!showCreateForm ? (
                <button onClick={() => setShowCreateForm(true)} className="mx-auto px-6 py-3 rounded-lg font-bold text-white flex items-center gap-2" style={{ backgroundColor: '#0a4a8f' }}>
                  <Plus className="w-5 h-5" /> ایجاد نظرسنجی
                </button>
              ) : (
                <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                  <input type="text" value={newSurveyTitle} onChange={(e) => setNewSurveyTitle(e.target.value)} placeholder="عنوان" className="w-full px-4 py-3 border rounded-lg" />
                  <input type="text" value={newSurveyQuestion} onChange={(e) => setNewSurveyQuestion(e.target.value)} placeholder="سوال" className="w-full px-4 py-3 border rounded-lg" />
                  <input type="text" value={newSurveyOptions} onChange={(e) => setNewSurveyOptions(e.target.value)} placeholder="گزینه‌ها (با کاما)" className="w-full px-4 py-3 border rounded-lg" />
                  <div className="flex gap-2">
                    <button onClick={addSurvey} className="px-6 py-2 rounded-lg font-bold text-white" style={{ backgroundColor: '#0a4a8f' }}>ایجاد</button>
                    <button onClick={() => setShowCreateForm(false)} className="px-6 py-2 rounded-lg bg-gray-300">لغو</button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="max-w-3xl mx-auto space-y-6">
            {surveys.map((survey) => {
              const responses = surveyResponses.filter(r => r.surveyId === survey.id)
              const alreadyVoted = user && responses.some(r => r.userId === user.id)
              
              return (
                <div key={survey.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: '#0a4a8f' }}>{survey.title}</h3>
                      <p className="text-gray-600 mt-1">{survey.question}</p>
                      <p className="text-gray-400 text-xs mt-1">{survey.createdBy} - {survey.createdAt}</p>
                    </div>
                    {(user?.role === 'admin' || user?.role === 'teacher') && (
                      <button onClick={() => deleteSurvey(survey.id)} className="text-red-600"><Trash2 className="w-5 h-5" /></button>
                    )}
                  </div>

                  {canViewResults && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-3">
                      <p className="font-bold mb-2 flex items-center gap-2"><BarChart3 className="w-4 h-4" />نتایج:</p>
                      {survey.options.map((option: string) => {
                        const count = responses.filter(r => r.option === option).length
                        const pct = responses.length > 0 ? Math.round((count / responses.length) * 100) : 0
                        return (
                          <div key={option} className="mb-2">
                            <div className="flex justify-between text-sm"><span>{option}</span><span>{count} نفر ({pct}%)</span></div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1"><div className="h-2 rounded-full" style={{ width: pct + '%', backgroundColor: '#0a4a8f' }}></div></div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {user?.role === 'student' && (
                    alreadyVoted ? (
                      <p className="text-green-600 font-bold">شما شرکت کرده‌اید!</p>
                    ) : (
                      <div className="space-y-3">
                        {survey.options.map((option: string) => (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name={'s-' + survey.id} checked={selectedOption === option} onChange={(e) => setSelectedOption(e.target.value)} className="w-4 h-4" />
                            <span>{option}</span>
                          </label>
                        ))}
                        <button onClick={() => submitResponse(survey.id)} className="px-4 py-2 rounded-lg text-white font-bold text-sm" style={{ backgroundColor: '#0a4a8f' }}>ثبت پاسخ</button>
                      </div>
                    )
                  )}
                </div>
              )
            })}
            {surveys.length === 0 && <p className="text-center text-gray-500">نظرسنجی وجود ندارد</p>}
          </div>
        </div>
      </section>
    </>
  )
}