'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Award, CheckCircle, Trash2, Plus, ArrowLeft, ArrowRight, Clock } from 'lucide-react'

const subjects = [
  'ریاضی', 'فیزیک', 'شیمی', 'زیست‌شناسی', 'ادبیات فارسی',
  'زبان انگلیسی', 'عربی', 'دینی', 'تاریخ', 'جغرافیا', 'هنر', 'ورزش'
]

export default function ExamsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [exams, setExams] = useState<any[]>([])
  const [examResults, setExamResults] = useState<any[]>([])
  const [currentExam, setCurrentExam] = useState<any>(null)
  const [examAnswers, setExamAnswers] = useState<any>({})
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0)

  // فرم ایجاد آزمون
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newExamTitle, setNewExamTitle] = useState('')
  const [newExamSubject, setNewExamSubject] = useState('ریاضی')
  const [numQuestions, setNumQuestions] = useState(5)
  const [examDuration, setExamDuration] = useState(30) // دقیقه
  const [questionsList, setQuestionsList] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questionText, setQuestionText] = useState('')
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [option4, setOption4] = useState('')
  const [correctOption, setCorrectOption] = useState(0)

  // تایمر
  const [timeLeft, setTimeLeft] = useState(0)
  const [timerActive, setTimerActive] = useState(false)

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser')
    if (currentUser) setUser(JSON.parse(currentUser))

    const savedExams = JSON.parse(localStorage.getItem('exams') || '[]')
    setExams(savedExams)

    const savedResults = JSON.parse(localStorage.getItem('examResults') || '[]')
    setExamResults(savedResults)
  }, [])

  // شمارش معکوس تایمر
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setTimerActive(false)
          // زمان تمام شد → خودکار ثبت
          submitExamAutomatically()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timerActive, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // ====================== ایجاد آزمون ======================
  const saveQuestion = () => {
    if (!questionText || !option1 || !option2 || !option3 || !option4) {
      alert('سوال و هر ۴ گزینه را وارد کنید!')
      return
    }

    const newQuestion = {
      question: questionText,
      options: [option1, option2, option3, option4],
      correctAnswer: correctOption
    }

    const updatedQuestions = [...questionsList, newQuestion]
    setQuestionsList(updatedQuestions)

    // پاک کردن فیلدها
    setQuestionText('')
    setOption1('')
    setOption2('')
    setOption3('')
    setOption4('')
    setCorrectOption(0)

    if (updatedQuestions.length >= numQuestions) {
      if (!newExamTitle) {
        alert('عنوان آزمون را وارد کنید!')
        return
      }

      const newExam = {
        id: Date.now(),
        title: newExamTitle,
        subject: newExamSubject,
        questions: updatedQuestions,
        duration: examDuration, // دقیقه
        createdBy: user?.fullName || 'نامشخص',
        createdAt: new Date().toLocaleDateString('fa-IR')
      }

      const updatedExams = [...exams, newExam]
      setExams(updatedExams)
      localStorage.setItem('exams', JSON.stringify(updatedExams))

      // ریست فرم
      setNewExamTitle('')
      setNewExamSubject('ریاضی')
      setNumQuestions(5)
      setExamDuration(30)
      setQuestionsList([])
      setCurrentQuestionIndex(0)
      setShowCreateForm(false)

      alert(`آزمون با ${updatedQuestions.length} سوال و مدت ${examDuration} دقیقه ایجاد شد!`)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const deleteExam = (id: number) => {
    const updated = exams.filter(e => e.id !== id)
    setExams(updated)
    localStorage.setItem('exams', JSON.stringify(updated))
  }

  // ====================== شرکت در آزمون ======================
  const startExam = (exam: any) => {
    if (!user) {
      alert('برای شرکت در آزمون باید وارد شوید!')
      router.push('/login')
      return
    }

    setCurrentExam(exam)
    setExamAnswers({})
    setCurrentQuestionNum(0)

    // شروع تایمر
    const durationInSeconds = (exam.duration || 30) * 60
    setTimeLeft(durationInSeconds)
    setTimerActive(true)
  }

  const nextQuestion = () => {
    if (currentQuestionNum < currentExam.questions.length - 1) {
      setCurrentQuestionNum(currentQuestionNum + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionNum > 0) {
      setCurrentQuestionNum(currentQuestionNum - 1)
    }
  }

  // ثبت دستی
  const submitExam = () => {
    if (!currentExam) return

    let score = 0
    currentExam.questions.forEach((q: any, index: number) => {
      if (examAnswers[index] === q.correctAnswer) score++
    })

    const finalScore = Math.round((score / currentExam.questions.length) * 20)

    const newResult = {
      id: Date.now(),
      examId: currentExam.id,
      examTitle: currentExam.title,
      examSubject: currentExam.subject,
      userId: user.id,
      userName: user.fullName,
      score: finalScore,
      totalQuestions: currentExam.questions.length,
      correctAnswers: score,
      date: new Date().toLocaleDateString('fa-IR')
    }

    const updatedResults = [...examResults, newResult]
    setExamResults(updatedResults)
    localStorage.setItem('examResults', JSON.stringify(updatedResults))

    // توقف تایمر
    setTimerActive(false)
    setTimeLeft(0)
    setCurrentExam(null)
    setExamAnswers({})
    setCurrentQuestionNum(0)

    alert(`نمره شما: ${finalScore} از ۲۰`)
  }

  // ثبت خودکار وقتی زمان تمام شود
  const submitExamAutomatically = () => {
    if (!currentExam) return

    let score = 0
    currentExam.questions.forEach((q: any, index: number) => {
      if (examAnswers[index] === q.correctAnswer) score++
    })

    const finalScore = Math.round((score / currentExam.questions.length) * 20)

    const newResult = {
      id: Date.now(),
      examId: currentExam.id,
      examTitle: currentExam.title,
      examSubject: currentExam.subject,
      userId: user.id,
      userName: user.fullName,
      score: finalScore,
      totalQuestions: currentExam.questions.length,
      correctAnswers: score,
      date: new Date().toLocaleDateString('fa-IR')
    }

    const updatedResults = [...examResults, newResult]
    setExamResults(updatedResults)
    localStorage.setItem('examResults', JSON.stringify(updatedResults))

    setTimerActive(false)
    setTimeLeft(0)
    setCurrentExam(null)
    setExamAnswers({})
    setCurrentQuestionNum(0)

    alert(`زمان آزمون به پایان رسید!\nنمره شما: ${finalScore} از ۲۰`)
  }

  const myResults = examResults.filter(r => r.userId === user?.id)

  return (
    <>
      {/* هدر */}
      <section className="py-16" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="container mx-auto px-4 text-center">
          <Award className="w-16 h-16 mx-auto mb-4 text-[#d4af37]" />
          <h1 className="text-5xl font-bold mb-4"  style={{ color: '#0a4a8f' }}>آزمون‌های آنلاین</h1>
          <p className="text-2xl">شرکت در آزمون‌های مدرسه و سنجش مهارت‌ها</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">

          {/* ========== فرم ایجاد آزمون (معلم) ========== */}
          {user?.role === 'teacher' && (
            <div className="max-w-4xl mx-auto mb-12">
              {!showCreateForm ? (
                <button
                  onClick={() => {
                    setShowCreateForm(true)
                    setQuestionsList([])
                    setCurrentQuestionIndex(0)
                  }}
                  className="flex items-center gap-3 mx-auto px-8 py-4 bg-[#6693f5] hover:bg-[#7bb0ff] text-white rounded-2xl font-bold text-lg shadow-lg transition-all"
                >
                  <Plus className="w-6 h-6" />
                  ایجاد آزمون جدید
                </button>
              ) : (
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-[#1E3A5F]">ایجاد آزمون جدید</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <input
                      type="text"
                      value={newExamTitle}
                      onChange={(e) => setNewExamTitle(e.target.value)}
                      placeholder="عنوان آزمون"
                      className="px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#6693f5] text-lg"
                    />
                    <select
                      value={newExamSubject}
                      onChange={(e) => setNewExamSubject(e.target.value)}
                      className="px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#6693f5]"
                    >
                      {subjects.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <select
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                      className="px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#6693f5]"
                    >
                      <option value={5}>۵ سوال</option>
                      <option value={10}>۱۰ سوال</option>
                      <option value={15}>۱۵ سوال</option>
                      <option value={20}>۲۰ سوال</option>
                    </select>
                    <select
                      value={examDuration}
                      onChange={(e) => setExamDuration(parseInt(e.target.value))}
                      className="px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#6693f5]"
                    >
                      <option value={10}>۱۰ دقیقه</option>
                      <option value={15}>۱۵ دقیقه</option>
                      <option value={20}>۲۰ دقیقه</option>
                      <option value={30}>۳۰ دقیقه</option>
                      <option value={45}>۴۵ دقیقه</option>
                      <option value={60}>۶۰ دقیقه</option>
                      <option value={90}>۹۰ دقیقه</option>
                    </select>
                  </div>

                  <div className="bg-[#E8F0FE] p-4 rounded-2xl mb-6 text-center">
                    <span className="font-bold text-[#6693f5]">
                      سوال {currentQuestionIndex + 1} از {numQuestions}
                    </span>
                  </div>

                  <div className="border border-gray-100 p-6 rounded-3xl space-y-6">
                    <input
                      type="text"
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="متن سوال"
                      className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-lg"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={option1}
                        onChange={(e) => setOption1(e.target.value)}
                        placeholder="گزینه ۱"
                        className="px-5 py-4 border border-gray-200 rounded-2xl"
                      />
                      <input
                        type="text"
                        value={option2}
                        onChange={(e) => setOption2(e.target.value)}
                        placeholder="گزینه ۲"
                        className="px-5 py-4 border border-gray-200 rounded-2xl"
                      />
                      <input
                        type="text"
                        value={option3}
                        onChange={(e) => setOption3(e.target.value)}
                        placeholder="گزینه ۳"
                        className="px-5 py-4 border border-gray-200 rounded-2xl"
                      />
                      <input
                        type="text"
                        value={option4}
                        onChange={(e) => setOption4(e.target.value)}
                        placeholder="گزینه ۴"
                        className="px-5 py-4 border border-gray-200 rounded-2xl"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-[#1E3A5F]">
                        گزینه صحیح:
                      </label>
                      <select
                        value={correctOption}
                        onChange={(e) => setCorrectOption(parseInt(e.target.value))}
                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl"
                      >
                        <option value={0}>گزینه ۱</option>
                        <option value={1}>گزینه ۲</option>
                        <option value={2}>گزینه ۳</option>
                        <option value={3}>گزینه ۴</option>
                      </select>
                    </div>

                    <button
                      onClick={saveQuestion}
                      className="w-full py-4 bg-[#6693f5] hover:bg-[#7bb0ff] text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all"
                    >
                      <CheckCircle className="w-6 h-6" />
                      {currentQuestionIndex + 1 >= numQuestions
                        ? 'ایجاد آزمون نهایی'
                        : 'ثبت سوال و سوال بعدی'}
                    </button>
                  </div>

                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="mt-6 text-[#6693f5] font-medium hover:underline"
                  >
                    بازگشت به لیست آزمون‌ها
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========== لیست آزمون‌ها و صفحه آزمون ========== */}
          <div className="max-w-4xl mx-auto space-y-8">
            {currentExam ? (
              // ========== صفحه در حال آزمون ==========
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-8">
                  {/* هدر آزمون + تایمر */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-[#1E3A5F]">
                        {currentExam.title} - {currentExam.subject}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        سوال {currentQuestionNum + 1} از {currentExam.questions.length}
                      </p>
                    </div>

                    {/* تایمر */}
                    <div
                      className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-lg ${
                        timeLeft <= 120
                          ? 'bg-red-100 text-red-700 animate-pulse'
                          : 'bg-[#E8F0FE] text-[#6693f5]'
                      }`}
                    >
                      <Clock className="w-5 h-5" />
                      <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
                    </div>
                  </div>

                  {/* سوال */}
                  <div className="bg-[#F8F4EB] p-8 rounded-3xl mb-8">
                    <p className="font-bold text-xl mb-6 leading-relaxed">
                      {currentQuestionNum + 1}. {currentExam.questions[currentQuestionNum].question}
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                      {currentExam.questions[currentQuestionNum].options.map(
                        (option: string, index: number) => (
                          <label
                            key={index}
                            className={`flex items-center gap-4 cursor-pointer p-4 rounded-2xl transition-all border ${
                              examAnswers[currentQuestionNum] === index
                                ? 'bg-white border-[#6693f5] shadow-md'
                                : 'hover:bg-white border-transparent'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`q-${currentQuestionNum}`}
                              checked={examAnswers[currentQuestionNum] === index}
                              onChange={() =>
                                setExamAnswers({
                                  ...examAnswers,
                                  [currentQuestionNum]: index
                                })
                              }
                              className="w-5 h-5 accent-[#6693f5]"
                            />
                            <span className="text-lg">{option}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  {/* دکمه‌های قبلی / بعدی / پایان */}
                  <div className="flex justify-between items-center">
                    {currentQuestionNum > 0 ? (
                      <button
                        onClick={prevQuestion}
                        className="flex items-center gap-3 px-8 py-4 bg-gray-100 hover:bg-gray-200 rounded-2xl font-medium text-gray-700 transition-colors"
                      >
                        <ArrowRight className="w-5 h-5" />
                        قبلی
                      </button>
                    ) : (
                      <div />
                    )}

                    {currentQuestionNum < currentExam.questions.length - 1 ? (
                      <button
                        onClick={nextQuestion}
                        className="flex items-center gap-3 px-8 py-4 bg-[#6693f5] hover:bg-[#7bb0ff] text-white rounded-2xl font-bold transition-all"
                      >
                        بعدی
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={submitExam}
                        className="flex items-center gap-3 px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg transition-all"
                      >
                        <CheckCircle className="w-6 h-6" />
                        پایان آزمون
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // ========== لیست آزمون‌ها ==========
              <>
                {exams.length === 0 ? (
                  <div className="text-center bg-white p-12 rounded-3xl shadow-lg">
                    <Award className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">آزمونی وجود ندارد</p>
                  </div>
                ) : (
                  exams.map((exam) => {
                    const alreadyTaken =
                      user &&
                      examResults.some(
                        r => r.examId === exam.id && r.userId === user.id
                      )

                    return (
                      <div
                        key={exam.id}
                        className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-2xl transition-shadow"
                      >
                        <div>
                          <h3 className="text-2xl font-bold text-[#1E3A5F]">
                            {exam.title}
                          </h3>
                          <p className="text-[#6693f5] font-medium mt-1">
                            درس: {exam.subject}
                          </p>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                            <span>تعداد سوالات: {exam.questions.length}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              مدت زمان: {exam.duration || 30} دقیقه
                            </span>
                            <span>توسط: {exam.createdBy}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {user?.role === 'teacher' && (
                            <button
                              onClick={() => deleteExam(exam.id)}
                              className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}

                          {alreadyTaken ? (
                            <span className="text-emerald-600 font-medium px-4 py-2 bg-emerald-50 rounded-xl">
                              انجام شده ✓
                            </span>
                          ) : (
                            user?.role === 'student' && (
                              <button
                                onClick={() => startExam(exam)}
                                className="flex items-center gap-3 bg-[#6693f5] hover:bg-[#7bb0ff] text-white px-8 py-4 rounded-2xl font-bold transition-all"
                              >
                                <Award className="w-5 h-5" />
                                شروع آزمون
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </>
            )}
          </div>

          {/* ========== نتایج آزمون‌های دانش‌آموز ========== */}
          {user?.role === 'student' && myResults.length > 0 && !currentExam && (
            <div className="mt-16 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-[#1E3A5F]">
                نتایج آزمون‌های من
              </h3>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#6693f5] text-white">
                      <th className="px-6 py-4 text-right">آزمون</th>
                      <th className="px-6 py-4 text-right">درس</th>
                      <th className="px-6 py-4 text-right">نمره</th>
                      <th className="px-6 py-4 text-right">تاریخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myResults.map(r => (
                      <tr key={r.id} className="border-b hover:bg-[#F0F5FF]">
                        <td className="px-6 py-4 font-medium">{r.examTitle}</td>
                        <td className="px-6 py-4">{r.examSubject}</td>
                        <td className="px-6 py-4 font-bold text-[#6693f5]">
                          {r.score}
                        </td>
                        <td className="px-6 py-4 text-gray-500">{r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}