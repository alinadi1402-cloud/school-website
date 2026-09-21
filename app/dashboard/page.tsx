'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Home, BarChart3, Calendar, BookOpen, Mail, Settings, Menu,
  GraduationCap, User, Clock, Trophy, CheckCircle, AlertCircle,
  ClipboardList, XCircle, Users, Plus, Trash2, Edit, Newspaper,
  Image, MessageSquare, Send, Upload, Download, FileText, Star, Award
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('home')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [applications, setApplications] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [scheduleDataState, setScheduleDataState] = useState<any[]>([])
  const [newSubject, setNewSubject] = useState('')
  const [selectedDay, setSelectedDay] = useState('شنبه')
  const [newsItems, setNewsItems] = useState<any[]>([])
  const [newNewsTitle, setNewNewsTitle] = useState('')
  const [newNewsContent, setNewNewsContent] = useState('')
  const [newsImage, setNewsImage] = useState('')
  const [newsImageName, setNewsImageName] = useState('')
  const newsImageInputRef = useRef<HTMLInputElement>(null)
  const [galleryItems, setGalleryItems] = useState<any[]>([])
  const [newGalleryTitle, setNewGalleryTitle] = useState('')
  const [newGalleryDescription, setNewGalleryDescription] = useState('')
  const [galleryImage, setGalleryImage] = useState('')
  const [galleryImageName, setGalleryImageName] = useState('')
  const galleryImageInputRef = useRef<HTMLInputElement>(null)
  const [achievements, setAchievements] = useState<any[]>([])
  const [newAchievementTitle, setNewAchievementTitle] = useState('')
  const [newAchievementValue, setNewAchievementValue] = useState('')
  const [teachers, setTeachers] = useState<any[]>([])
  const [newTeacherName, setNewTeacherName] = useState('')
  const [newTeacherSubject, setNewTeacherSubject] = useState('')
  const [newTeacherEducation, setNewTeacherEducation] = useState('')
  const [newTeacherExperience, setNewTeacherExperience] = useState('')
  const [teacherImage, setTeacherImage] = useState('')
  const teacherImageInputRef = useRef<HTMLInputElement>(null)
  const [homeworkDataState, setHomeworkDataState] = useState<any[]>([])
  const [newHomeworkTitle, setNewHomeworkTitle] = useState('')
  const [newHomeworkSubject, setNewHomeworkSubject] = useState('')
  const [newHomeworkDueDate, setNewHomeworkDueDate] = useState('')
  const [homeworkFile, setHomeworkFile] = useState('')
  const [homeworkFileName, setHomeworkFileName] = useState('')
  const [answerFile, setAnswerFile] = useState('')
  const [answerFileName, setAnswerFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const answerInputRef = useRef<HTMLInputElement>(null)
  const [studentList, setStudentList] = useState<any[]>([])
  const [selectedStudent, setSelectedStudent] = useState('')
  const [gradeSubject, setGradeSubject] = useState('')
  const [gradeValue, setGradeValue] = useState('')
  const [gradeDescription, setGradeDescription] = useState('')
  const [studentGrades, setStudentGrades] = useState<any[]>([])
  const [complaints, setComplaints] = useState<any[]>([])
  const [complaintGradeId, setComplaintGradeId] = useState<number | null>(null)
  const [complaintReason, setComplaintReason] = useState('')
  const [complaintResponse, setComplaintResponse] = useState('')
  const [newGradeAfterComplaint, setNewGradeAfterComplaint] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const [messageRecipient, setMessageRecipient] = useState('')
  const [messageText, setMessageText] = useState('')
  const [replyText, setReplyText] = useState('')
  const [pendingUsers, setPendingUsers] = useState<any[]>([])
  const [approvedToken, setApprovedToken] = useState('')
  const [settingsFullName, setSettingsFullName] = useState('')
  const [settingsPhone, setSettingsPhone] = useState('')
  const [settingsPassword, setSettingsPassword] = useState('')
  const [settingsConfirmPassword, setSettingsConfirmPassword] = useState('')
  const [settingsPhoto, setSettingsPhoto] = useState('')

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser')
    if (!currentUser) { router.push('/login'); return }
    const parsedUser = JSON.parse(currentUser)
    setUser(parsedUser)
    setSettingsFullName(parsedUser.fullName || '')
    setSettingsPhone(parsedUser.phone || '')
    const apps = JSON.parse(localStorage.getItem('applications') || '[]')
    setApplications(apps)
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
    setUsers(allUsers)
    const pending = allUsers.filter((u: any) => u.status === 'pending')
    setPendingUsers(pending)
    const students = allUsers.filter((u: any) => u.role === 'student')
    setStudentList(students)
    const savedSchedule = JSON.parse(localStorage.getItem('schedule') || 'null')
    setScheduleDataState(savedSchedule || [
      { day: 'شنبه', subjects: ['ریاضی', 'فیزیک', 'شیمی', 'ادبیات'] },
      { day: 'یکشنبه', subjects: ['زیست', 'عربی', 'زبان انگلیسی', 'دینی'] },
      { day: 'دوشنبه', subjects: ['ریاضی', 'فیزیک', 'شیمی', 'ورزش'] },
      { day: 'سه‌شنبه', subjects: ['ادبیات', 'تاریخ', 'جغرافیا', 'هنر'] },
      { day: 'چهارشنبه', subjects: ['زیست', 'زبان انگلیسی', 'ریاضی', 'مهارت'] },
    ])
    const savedNews = JSON.parse(localStorage.getItem('news') || '[]')
    setNewsItems(savedNews)
    const savedGallery = JSON.parse(localStorage.getItem('gallery') || '[]')
    setGalleryItems(savedGallery)
    const savedAchievements = JSON.parse(localStorage.getItem('achievements') || 'null')
    setAchievements(savedAchievements || [
      { id: 1, title: 'قبولی در دانشگاه‌های برتر', value: '95%' },
      { id: 2, title: 'مدال المپیاد', value: '50+' },
      { id: 3, title: 'سال سابقه درخشان', value: '30+' },
      { id: 4, title: 'دانش‌آموخته موفق', value: '1000+' },
    ])
    const savedTeachers = JSON.parse(localStorage.getItem('teachers') || '[]')
    setTeachers(savedTeachers)
    const savedHomework = JSON.parse(localStorage.getItem('homework') || '[]')
    setHomeworkDataState(savedHomework)
    const savedStudentGrades = JSON.parse(localStorage.getItem('studentGrades') || '[]')
    setStudentGrades(savedStudentGrades)
    const savedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]')
    setComplaints(savedComplaints)
    const savedMessages = JSON.parse(localStorage.getItem('messages') || '[]')
    setMessages(savedMessages)
    const savedTestimonials = JSON.parse(localStorage.getItem('testimonials') || '[]')
    setTestimonials(savedTestimonials)
  }, [])

  useEffect(() => {
    if (activeTab === 'surveys') { router.push('/surveys') }
    if (activeTab === 'exams') { router.push('/exams') }
  }, [activeTab])

  const approveUser = (userId: number) => {
    const token = Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
    const updatedUsers = users.map(u => u.id === userId ? { ...u, status: 'approved', token: token } : u)
    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    const updatedPending = pendingUsers.filter(u => u.id !== userId)
    setPendingUsers(updatedPending)
    const activationLink = `${window.location.origin}/set-password?token=${token}&userId=${userId}`
    setApprovedToken(activationLink)
    alert('کاربر تایید شد!\nلینک فعال‌سازی:\n' + activationLink)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) { alert('حجم فایل نباید بیشتر از ۲ مگابایت باشد!'); return }
      const reader = new FileReader()
      reader.onload = (event) => { setHomeworkFile(event.target?.result as string); setHomeworkFileName(file.name) }
      reader.readAsDataURL(file)
    }
  }

  const handleAnswerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) { alert('حجم فایل نباید بیشتر از ۲ مگابایت باشد!'); return }
      const reader = new FileReader()
      reader.onload = (event) => { setAnswerFile(event.target?.result as string); setAnswerFileName(file.name) }
      reader.readAsDataURL(file)
    }
  }

  const handleNewsImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) { alert('حجم تصویر نباید بیشتر از ۲ مگابایت باشد!'); return }
      const reader = new FileReader()
      reader.onload = (event) => { setNewsImage(event.target?.result as string); setNewsImageName(file.name) }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) { alert('حجم تصویر نباید بیشتر از ۲ مگابایت باشد!'); return }
      const reader = new FileReader()
      reader.onload = (event) => { setGalleryImage(event.target?.result as string); setGalleryImageName(file.name) }
      reader.readAsDataURL(file)
    }
  }

  const handleTeacherImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) { alert('حجم تصویر نباید بیشتر از ۲ مگابایت باشد!'); return }
      const reader = new FileReader()
      reader.onload = (event) => { setTeacherImage(event.target?.result as string) }
      reader.readAsDataURL(file)
    }
  }

  const handleSettingsPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) { alert('حجم تصویر نباید بیشتر از ۲ مگابایت باشد!'); return }
      const reader = new FileReader()
      reader.onload = (event) => { setSettingsPhoto(event.target?.result as string) }
      reader.readAsDataURL(file)
    }
  }

  const addSubjectToSchedule = () => {
    if (!newSubject) return
    const updatedSchedule = scheduleDataState.map(day => day.day === selectedDay ? { ...day, subjects: [...day.subjects, newSubject] } : day)
    setScheduleDataState(updatedSchedule)
    localStorage.setItem('schedule', JSON.stringify(updatedSchedule))
    setNewSubject('')
  }

  const removeSubjectFromSchedule = (dayName: string, subjectIndex: number) => {
    const updatedSchedule = scheduleDataState.map(day => day.day === dayName ? { ...day, subjects: day.subjects.filter((_: any, index: number) => index !== subjectIndex) } : day)
    setScheduleDataState(updatedSchedule)
    localStorage.setItem('schedule', JSON.stringify(updatedSchedule))
  }

  const addNews = () => {
    if (!newNewsTitle || !newNewsContent) return
    const newNews = { id: Date.now(), title: newNewsTitle, content: newNewsContent, date: new Date().toLocaleDateString('fa-IR'), category: 'عمومی', imageData: newsImage, imageName: newsImageName }
    const updatedNews = [...newsItems, newNews]
    setNewsItems(updatedNews)
    localStorage.setItem('news', JSON.stringify(updatedNews))
    fetch('/api/news', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: newNewsTitle, content: newNewsContent, imageData: newsImage }) }).catch(err => console.error(err))
    setNewNewsTitle(''); setNewNewsContent(''); setNewsImage(''); setNewsImageName('')
    if (newsImageInputRef.current) newsImageInputRef.current.value = ''
    alert('خبر ثبت شد!')
  }

  const deleteNews = (id: number) => {
    const updatedNews = newsItems.filter(item => item.id !== id)
    setNewsItems(updatedNews)
    localStorage.setItem('news', JSON.stringify(updatedNews))
  }

  const deleteTestimonial = (id: number) => {
    const updatedTestimonials = testimonials.filter(t => t.id !== id)
    setTestimonials(updatedTestimonials)
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials))
  }

  const addGalleryItem = () => {
    if (!newGalleryTitle) { alert('عنوان را وارد کنید!'); return }
    const newItem = { id: Date.now(), title: newGalleryTitle, category: 'عمومی', imageData: galleryImage, description: newGalleryDescription }
    const updatedGallery = [...galleryItems, newItem]
    setGalleryItems(updatedGallery)
    localStorage.setItem('gallery', JSON.stringify(updatedGallery))
    fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: newGalleryTitle, imageData: galleryImage, description: newGalleryDescription }) }).catch(err => console.error(err))
    setNewGalleryTitle(''); setGalleryImage(''); setGalleryImageName(''); setNewGalleryDescription('')
    if (galleryImageInputRef.current) galleryImageInputRef.current.value = ''
    alert('تصویر اضافه شد!')
  }

  const deleteGalleryItem = (id: number) => {
    const updatedGallery = galleryItems.filter(item => item.id !== id)
    setGalleryItems(updatedGallery)
    localStorage.setItem('gallery', JSON.stringify(updatedGallery))
  }

  const addAchievement = () => {
    if (!newAchievementTitle || !newAchievementValue) { alert('عنوان و مقدار را وارد کنید!'); return }
    const newAchievement = { id: Date.now(), title: newAchievementTitle, value: newAchievementValue }
    const updatedAchievements = [...achievements, newAchievement]
    setAchievements(updatedAchievements)
    localStorage.setItem('achievements', JSON.stringify(updatedAchievements))
    setNewAchievementTitle(''); setNewAchievementValue('')
    alert('دستاورد اضافه شد!')
  }

  const deleteAchievement = (id: number) => {
    const updatedAchievements = achievements.filter(a => a.id !== id)
    setAchievements(updatedAchievements)
    localStorage.setItem('achievements', JSON.stringify(updatedAchievements))
  }

  const addTeacher = () => {
    if (!newTeacherName || !newTeacherSubject) { alert('نام و درس را وارد کنید!'); return }
    const newTeacher = { id: Date.now(), name: newTeacherName, subject: newTeacherSubject, education: newTeacherEducation || 'نامشخص', experience: newTeacherExperience || 'نامشخص', imageData: teacherImage }
    const updatedTeachers = [...teachers, newTeacher]
    setTeachers(updatedTeachers)
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers))
    fetch('/api/teachers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newTeacherName, subject: newTeacherSubject, education: newTeacherEducation, experience: newTeacherExperience, imageData: teacherImage }) }).catch(err => console.error(err))
    setNewTeacherName(''); setNewTeacherSubject(''); setNewTeacherEducation(''); setNewTeacherExperience(''); setTeacherImage('')
    if (teacherImageInputRef.current) teacherImageInputRef.current.value = ''
    alert('معلم اضافه شد!')
  }

  const deleteTeacher = (id: number) => {
    const updatedTeachers = teachers.filter(t => t.id !== id)
    setTeachers(updatedTeachers)
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers))
  }

  const addHomework = () => {
    if (!newHomeworkTitle || !newHomeworkSubject) { alert('عنوان و درس را وارد کنید!'); return }
    const newHomework = { id: Date.now(), subject: newHomeworkSubject, title: newHomeworkTitle, dueDate: newHomeworkDueDate || 'تعیین نشده', status: 'pending', createdBy: user.fullName, createdByRole: user.role, createdAt: new Date().toLocaleDateString('fa-IR'), fileData: homeworkFile, fileName: homeworkFileName, answerData: '', answerFileName: '', answeredBy: '' }
    const updatedHomework = [...homeworkDataState, newHomework]
    setHomeworkDataState(updatedHomework)
    localStorage.setItem('homework', JSON.stringify(updatedHomework))
    setNewHomeworkTitle(''); setNewHomeworkSubject(''); setNewHomeworkDueDate(''); setHomeworkFile(''); setHomeworkFileName('')
    if (fileInputRef.current) fileInputRef.current.value = ''
    alert('تکلیف ثبت شد!')
  }

  const deleteHomework = (id: number) => {
    const updatedHomework = homeworkDataState.filter(item => item.id !== id)
    setHomeworkDataState(updatedHomework)
    localStorage.setItem('homework', JSON.stringify(updatedHomework))
  }

  const submitHomeworkAnswer = (homeworkId: number) => {
    if (!answerFile) { alert('فایل پاسخ را انتخاب کنید!'); return }
    const updatedHomework = homeworkDataState.map(hw => hw.id === homeworkId ? { ...hw, status: 'done', answerData: answerFile, answerFileName: answerFileName, answeredBy: user.fullName, answeredAt: new Date().toLocaleDateString('fa-IR') } : hw)
    setHomeworkDataState(updatedHomework)
    localStorage.setItem('homework', JSON.stringify(updatedHomework))
    setAnswerFile(''); setAnswerFileName('')
    if (answerInputRef.current) answerInputRef.current.value = ''
    alert('پاسخ ارسال شد!')
  }

  const addGradeForStudent = () => {
    if (!selectedStudent || !gradeSubject || !gradeValue) { alert('همه فیلدها را پر کنید!'); return }
    const newGrade = { id: Date.now(), studentId: parseInt(selectedStudent), subject: gradeSubject, grade: parseFloat(gradeValue), description: gradeDescription, teacherName: user.fullName, date: new Date().toLocaleDateString('fa-IR'), status: 'approved' }
    const updatedGrades = [...studentGrades, newGrade]
    setStudentGrades(updatedGrades)
    localStorage.setItem('studentGrades', JSON.stringify(updatedGrades))
    fetch('/api/grades', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentId: parseInt(selectedStudent), subject: gradeSubject, grade: parseFloat(gradeValue), teacherName: user.fullName }) }).catch(err => console.error(err))
    setSelectedStudent(''); setGradeSubject(''); setGradeValue(''); setGradeDescription('')
    alert('نمره ثبت شد!')
  }

  const submitComplaint = () => {
    if (!complaintGradeId || !complaintReason) { alert('دلیل را بنویسید!'); return }
    const grade = studentGrades.find(g => g.id === complaintGradeId)
    const newComplaint = { id: Date.now(), gradeId: complaintGradeId, studentId: user.id, studentName: user.fullName, subject: grade?.subject || '', grade: grade?.grade || 0, teacherName: grade?.teacherName || '', reason: complaintReason, status: 'pending', response: '', date: new Date().toLocaleDateString('fa-IR') }
    const updatedComplaints = [...complaints, newComplaint]
    setComplaints(updatedComplaints)
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints))
    fetch('/api/complaints', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentId: user.id, studentName: user.fullName, subject: grade?.subject || '', reason: complaintReason }) }).catch(err => console.error(err))
    setComplaintGradeId(null); setComplaintReason('')
    alert('اعتراض ثبت شد!')
  }

  const respondToComplaint = (complaintId: number, gradeId: number, accepted: boolean) => {
    const updatedComplaints = complaints.map(c => c.id === complaintId ? { ...c, status: accepted ? 'responded' : 'rejected', response: complaintResponse } : c)
    setComplaints(updatedComplaints)
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints))
    if (accepted && newGradeAfterComplaint) {
      const updatedGrades = studentGrades.map(g => g.id === gradeId ? { ...g, grade: parseFloat(newGradeAfterComplaint) } : g)
      setStudentGrades(updatedGrades)
      localStorage.setItem('studentGrades', JSON.stringify(updatedGrades))
    }
    setComplaintResponse(''); setNewGradeAfterComplaint('')
    alert(accepted ? 'پذیرفته شد!' : 'رد شد!')
  }

  const sendMessage = () => {
    if (!messageRecipient || !messageText) { alert('گیرنده و متن را وارد کنید!'); return }
    const recipient = users.find(u => u.id === parseInt(messageRecipient))
    const newMessage = { id: Date.now(), senderId: user.id, senderName: user.fullName, senderRole: user.role, recipientId: parseInt(messageRecipient), recipientName: recipient?.fullName || '', recipientRole: recipient?.role || '', text: messageText, date: new Date().toLocaleDateString('fa-IR'), time: new Date().toLocaleTimeString('fa-IR'), isRead: false, reply: '' }
    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    localStorage.setItem('messages', JSON.stringify(updatedMessages))
    fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ senderId: user.id, senderName: user.fullName, recipientId: parseInt(messageRecipient), text: messageText }) }).catch(err => console.error(err))
    setMessageRecipient(''); setMessageText('')
    alert('پیام ارسال شد!')
  }

  const sendReply = (messageId: number) => {
    if (!replyText) { alert('پاسخ را بنویسید!'); return }
    const updatedMessages = messages.map(m => m.id === messageId ? { ...m, isRead: true, reply: replyText } : m)
    setMessages(updatedMessages)
    localStorage.setItem('messages', JSON.stringify(updatedMessages))
    setReplyText('')
    alert('پاسخ ارسال شد!')
  }

  const updateApplicationStatus = (id: number, status: string) => {
    const updatedApps = applications.map(app => app.id === id ? { ...app, status: status } : app)
    setApplications(updatedApps)
    localStorage.setItem('applications', JSON.stringify(updatedApps))
  }

  const deleteApplication = (id: number) => {
    const updatedApps = applications.filter(app => app.id !== id)
    setApplications(updatedApps)
    localStorage.setItem('applications', JSON.stringify(updatedApps))
  }

  const deleteUser = (id: number) => {
    const updatedUsers = users.filter(u => u.id !== id)
    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  const saveSettings = () => {
    if (!settingsFullName) { alert('نام را وارد کنید!'); return }
    if (settingsPassword && settingsPassword !== settingsConfirmPassword) { alert('رمزها مطابقت ندارند!'); return }
    const updatedUser = { ...user, fullName: settingsFullName, phone: settingsPhone, password: settingsPassword ? btoa(settingsPassword) : user.password, photo: settingsPhoto || user.photo }
    const usersList = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsersList = usersList.map((u: any) => u.id === user.id ? updatedUser : u)
    localStorage.setItem('users', JSON.stringify(updatedUsersList))
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    setUser(updatedUser)
    setUsers(updatedUsersList)
    alert('تغییرات ذخیره شد!')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">در حال بارگذاری...</div>
      </div>
    )
  }

  const allMenuItems = [
    { id: 'home', label: 'خانه', icon: Home, roles: ['student', 'parent', 'teacher', 'admin'] },
    { id: 'grades', label: 'کارنامه', icon: BarChart3, roles: ['student', 'parent', 'admin'] },
    { id: 'grading', label: 'ثبت نمرات', icon: Edit, roles: ['teacher'] },
    { id: 'complaints', label: 'اعتراضات', icon: MessageSquare, roles: ['student', 'parent', 'teacher'] },
    { id: 'schedule', label: 'برنامه هفتگی', icon: Calendar, roles: ['student', 'parent', 'teacher', 'admin'] },
    { id: 'homework', label: 'تکالیف', icon: BookOpen, roles: ['student', 'parent', 'teacher', 'admin'] },
    { id: 'messages', label: 'پیام‌ها', icon: Mail, roles: ['student', 'parent', 'teacher', 'admin'] },
    { id: 'surveys', label: 'نظرسنجی‌ها', icon: MessageSquare, roles: ['admin', 'teacher', 'student'] },
    { id: 'exams', label: 'آزمون‌ها', icon: Award, roles: ['admin', 'teacher', 'student'] },
    { id: 'pending-users', label: 'کاربران در انتظار تایید', icon: AlertCircle, roles: ['admin'] },
    { id: 'news', label: 'مدیریت اخبار', icon: Newspaper, roles: ['admin'] },
    { id: 'gallery', label: 'مدیریت گالری', icon: Image, roles: ['admin'] },
    { id: 'achievements', label: 'مدیریت دستاوردها', icon: Award, roles: ['admin'] },
    { id: 'teachers-management', label: 'مدیریت کادر آموزشی', icon: Users, roles: ['admin'] },
    { id: 'testimonials', label: 'مدیریت نظرات', icon: Star, roles: ['admin'] },
    { id: 'applications', label: 'درخواست‌های ثبت‌نام', icon: ClipboardList, roles: ['admin'] },
    { id: 'users', label: 'مدیریت کاربران', icon: Users, roles: ['admin'] },
    { id: 'settings', label: 'تنظیمات', icon: Settings, roles: ['student', 'parent', 'teacher', 'admin'] },
  ]

  const menuItems = allMenuItems.filter(item => item.roles.includes(user.role))

  const sidebarClass = isSidebarOpen 
    ? 'fixed inset-y-0 right-0 w-64 bg-blue-800 text-white transform transition-transform duration-300 z-50 translate-x-0 lg:translate-x-0 lg:static lg:z-0'
    : 'fixed inset-y-0 right-0 w-64 bg-blue-800 text-white transform transition-transform duration-300 z-50 translate-x-full lg:translate-x-0 lg:static lg:z-0'

  const getRoleIcon = () => {
    if (user.role === 'student') return <GraduationCap className="w-10 h-10" />
    if (user.role === 'parent') return <User className="w-10 h-10" />
    if (user.role === 'teacher') return <User className="w-10 h-10" />
    return <User className="w-10 h-10" />
  }

  const getRoleLabel = () => {
    if (user.role === 'student') return 'دانش‌آموز'
    if (user.role === 'parent') return 'والدین'
    if (user.role === 'teacher') return 'معلم'
    return 'مدیر'
  }

  const getStatusBadge = (status: string) => {
    if (status === 'pending') return <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"><AlertCircle className="w-4 h-4" /> در انتظار</span>
    if (status === 'approved') return <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"><CheckCircle className="w-4 h-4" /> تایید شده</span>
    if (status === 'responded') return <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"><MessageSquare className="w-4 h-4" /> پذیرفته شده</span>
    if (status === 'rejected') return <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"><XCircle className="w-4 h-4" /> رد شده</span>
    if (status === 'done') return <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"><CheckCircle className="w-4 h-4" /> انجام شده</span>
    return null
  }

  const getResponseClass = (status: string) => {
    if (status === 'responded') return 'p-4 rounded-lg bg-green-50'
    return 'p-4 rounded-lg bg-red-50'
  }

  const pendingApplications = applications.filter(app => app.status === 'pending').length
  const myGrades = studentGrades.filter(g => g.studentId === user.id)
  const myComplaints = complaints.filter(c => c.studentId === user.id)
  const complaintsForTeacher = complaints.filter(c => c.teacherName === user.fullName)
  const myReceivedMessages = messages.filter(m => m.recipientId === user.id)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className={sidebarClass}>
        <div className="p-6">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-3 overflow-hidden border-2 border-white" style={{ backgroundColor: '#e8f0fe' }}>
              {user.photo ? <img src={user.photo} alt={user.fullName} className="w-full h-full object-cover" /> : getRoleIcon()}
            </div>
            <h2 className="text-xl font-bold">{user.fullName}</h2>
            <p className="text-blue-300 text-sm mt-1">{getRoleLabel()}</p>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              const buttonClass = activeTab === item.id ? 'w-full text-right px-4 py-3 rounded-lg transition-colors flex items-center gap-3 bg-blue-600' : 'w-full text-right px-4 py-3 rounded-lg transition-colors flex items-center gap-3 hover:bg-blue-700'
              return (
                <button key={item.id} onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false) }} className={buttonClass}>
                  <IconComponent className="w-5 h-5" /><span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="flex-1">
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden"><Menu className="w-6 h-6" /></button>
              <h1 className="text-lg font-bold text-gray-800">{menuItems.find(item => item.id === activeTab)?.label}</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-xs"><Clock className="w-4 h-4" />{new Date().toLocaleDateString('fa-IR')}</div>
          </div>
        </header>

        <main className="p-6">
          {activeTab === 'home' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {user.role === 'student' || user.role === 'parent' ? (
                <>
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center"><BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-3" /><h3 className="text-xl font-bold mb-2">معدل کل</h3><p className="text-3xl font-bold text-blue-600">18.95</p></div>
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center"><BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-3" /><h3 className="text-xl font-bold mb-2">تکالیف انجام شده</h3><p className="text-3xl font-bold text-blue-600">{homeworkDataState.filter(h => h.status === 'done' && h.answeredBy === user.fullName).length}</p></div>
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center"><Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" /><h3 className="text-xl font-bold mb-2">پیام‌های جدید</h3><p className="text-3xl font-bold text-blue-600">{myReceivedMessages.filter(m => !m.isRead).length}</p></div>
                </>
              ) : null}
              <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">اطلاعات حساب</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><p className="text-gray-500">نام کامل</p><p className="font-bold">{user.fullName}</p></div>
                  <div><p className="text-gray-500">نام کاربری</p><p className="font-bold">{user.username}</p></div>
                  <div><p className="text-gray-500">موبایل</p><p className="font-bold">{user.phone || '-'}</p></div>
                  <div><p className="text-gray-500">وضعیت</p><p className="font-bold">{user.status === 'active' ? 'فعال' : user.status === 'pending' ? 'در انتظار' : 'تایید شده'}</p></div>
                </div>
              </div>
              {user.role === 'admin' && (
                <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4">آمار کلی</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center"><p className="text-3xl font-bold text-blue-600">{users.length}</p><p className="text-gray-600 mt-1">کاربران</p></div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center"><p className="text-3xl font-bold text-blue-600">{applications.length}</p><p className="text-gray-600 mt-1">درخواست‌ها</p></div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center"><p className="text-3xl font-bold text-blue-600">{pendingUsers.length}</p><p className="text-gray-600 mt-1">در انتظار تایید</p></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'pending-users' && (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">کاربران در انتظار تایید</h3>
                {pendingUsers.length === 0 ? <p className="text-gray-500 text-center py-8">کاربری در انتظار نیست</p> : (
                  <div className="space-y-4">
                    {pendingUsers.map((u) => (
                      <div key={u.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                        <div><p className="font-bold">{u.fullName}</p><p className="text-sm text-gray-500">کد ملی: {u.nationalId}</p><p className="text-sm text-gray-500">موبایل: {u.phone}</p></div>
                        <button onClick={() => approveUser(u.id)} className="px-4 py-2 rounded-lg font-bold text-white text-sm" style={{ backgroundColor: '#28a745' }}>Approve</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {approvedToken && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="font-bold text-green-800 mb-2">لینک فعال‌سازی:</p>
                  <p className="text-sm text-green-600 break-all">{approvedToken}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'grades' && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-800 text-white"><tr><th className="px-4 py-3 text-right">درس</th><th className="px-4 py-3 text-right">نمره</th><th className="px-4 py-3 text-right">معلم</th><th className="px-4 py-3 text-right">توضیحات</th>{(user.role === 'student' || user.role === 'parent') && <th className="px-4 py-3 text-right">عملیات</th>}</tr></thead>
                  <tbody>
                    {myGrades.map((grade) => (
                      <tr key={grade.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-bold">{grade.subject}</td>
                        <td className="px-4 py-3 text-blue-600 font-bold">{grade.grade}</td>
                        <td className="px-4 py-3">{grade.teacherName}</td>
                        <td className="px-4 py-3">{grade.description || '-'}</td>
                        {(user.role === 'student' || user.role === 'parent') && <td className="px-4 py-3"><button onClick={() => { setComplaintGradeId(grade.id); setActiveTab('complaints') }} className="flex items-center gap-1 bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm"><MessageSquare className="w-4 h-4" />اعتراض</button></td>}
                      </tr>
                    ))}
                    {myGrades.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">نمره‌ای ثبت نشده</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'grading' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">ثبت نمره</h3>
                <div className="space-y-4">
                  <div><label className="block font-bold mb-2">دانش‌آموز</label><select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="w-full px-4 py-3 border rounded-lg"><option value="">انتخاب...</option>{studentList.map(s => <option key={s.id} value={s.id}>{s.fullName}</option>)}</select></div>
                  <div><label className="block font-bold mb-2">درس</label><input type="text" value={gradeSubject} onChange={(e) => setGradeSubject(e.target.value)} className="w-full px-4 py-3 border rounded-lg" /></div>
                  <div><label className="block font-bold mb-2">نمره</label><input type="number" value={gradeValue} onChange={(e) => setGradeValue(e.target.value)} className="w-full px-4 py-3 border rounded-lg" /></div>
                  <button onClick={addGradeForStudent} className="px-6 py-2 rounded-lg text-white font-bold" style={{ backgroundColor: '#0a4a8f' }}>ثبت نمره</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'complaints' && (
            <div className="space-y-6">
              {(user.role === 'student' || user.role === 'parent') && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4">ثبت اعتراض</h3>
                  <div className="space-y-4">
                    <select value={complaintGradeId || ''} onChange={(e) => setComplaintGradeId(parseInt(e.target.value))} className="w-full px-4 py-3 border rounded-lg"><option value="">انتخاب نمره...</option>{myGrades.map(g => <option key={g.id} value={g.id}>{g.subject} - {g.grade}</option>)}</select>
                    <textarea value={complaintReason} onChange={(e) => setComplaintReason(e.target.value)} rows={3} placeholder="دلیل اعتراض" className="w-full px-4 py-3 border rounded-lg"></textarea>
                    <button onClick={submitComplaint} className="px-6 py-2 rounded-lg text-white font-bold" style={{ backgroundColor: '#0a4a8f' }}>ثبت</button>
                  </div>
                </div>
              )}
              {user.role === 'teacher' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">اعتراضات به شما</h3>
                  {complaintsForTeacher.length === 0 ? <p className="text-gray-500">اعتراضی نیست</p> : complaintsForTeacher.map(c => (
                    <div key={c.id} className="bg-white p-4 rounded-lg shadow-lg">
                      <p className="font-bold">{c.studentName}</p>
                      <p>{c.subject} - {c.reason}</p>
                      <input type="number" value={newGradeAfterComplaint} onChange={(e) => setNewGradeAfterComplaint(e.target.value)} placeholder="نمره جدید" className="w-full px-4 py-2 border rounded-lg mt-2" />
                      <div className="flex gap-2 mt-2"><button onClick={() => respondToComplaint(c.id, c.gradeId, true)} className="px-4 py-2 bg-green-600 text-white rounded-lg">پذیرش</button><button onClick={() => respondToComplaint(c.id, c.gradeId, false)} className="px-4 py-2 bg-red-600 text-white rounded-lg">رد</button></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              {user.role === 'admin' && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4">افزودن درس</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="px-4 py-3 border rounded-lg">{scheduleDataState.map((day: any) => <option key={day.day} value={day.day}>{day.day}</option>)}</select>
                    <input type="text" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} placeholder="نام درس" className="px-4 py-3 border rounded-lg" />
                  </div>
                  <button onClick={addSubjectToSchedule} className="mt-4 px-6 py-2 rounded-lg text-white font-bold" style={{ backgroundColor: '#0a4a8f' }}>افزودن</button>
                </div>
              )}
              {scheduleDataState.map((day: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#0a4a8f' }}>{day.day}</h3>
                  <div className="flex flex-wrap gap-2">
                    {day.subjects.map((subject: string, subIndex: number) => (
                      <span key={subIndex} className="px-4 py-2 rounded-lg flex items-center gap-2" style={{ backgroundColor: '#e8f0fe', color: '#0a4a8f' }}>
                        {subject}
                        {user.role === 'admin' && <button onClick={() => removeSubjectFromSchedule(day.day, subIndex)} className="text-red-600"><XCircle className="w-4 h-4" /></button>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'homework' && (
            <div className="space-y-4">
              {user.role === 'teacher' && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4">افزودن تکلیف</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <input type="text" value={newHomeworkTitle} onChange={(e) => setNewHomeworkTitle(e.target.value)} placeholder="عنوان" className="px-4 py-3 border rounded-lg" />
                    <input type="text" value={newHomeworkSubject} onChange={(e) => setNewHomeworkSubject(e.target.value)} placeholder="درس" className="px-4 py-3 border rounded-lg" />
                    <input type="date" value={newHomeworkDueDate} onChange={(e) => setNewHomeworkDueDate(e.target.value)} className="px-4 py-3 border rounded-lg" />
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="w-full px-4 py-3 border rounded-lg mt-4" />
                  <button onClick={addHomework} className="mt-4 px-6 py-2 rounded-lg text-white font-bold" style={{ backgroundColor: '#0a4a8f' }}>افزودن</button>
                </div>
              )}
              {homeworkDataState.map((homework: any) => (
                <div key={homework.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div><h3 className="font-bold text-lg">{homework.title}</h3><p className="text-gray-500 text-sm">{homework.subject} - مهلت: {homework.dueDate}</p></div>
                    <span className={homework.status === 'done' ? 'px-3 py-1 rounded-full text-sm bg-green-100 text-green-800' : 'px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800'}>{homework.status === 'done' ? 'انجام شده' : 'در انتظار'}</span>
                  </div>
                  {homework.fileData && <a href={homework.fileData} download={homework.fileName} className="text-sm" style={{ color: '#0a4a8f' }}>📎 دانلود فایل</a>}
                  {user.role === 'student' && homework.status !== 'done' && (
                    <div className="space-y-3 mt-4">
                      <input type="file" ref={answerInputRef} onChange={handleAnswerUpload} className="w-full px-4 py-3 border rounded-lg" />
                      <button onClick={() => submitHomeworkAnswer(homework.id)} className="px-4 py-2 rounded-lg text-white font-bold text-sm" style={{ backgroundColor: '#28a745' }}>ارسال پاسخ</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">ارسال پیام</h3>
                <div className="space-y-4">
                  <select value={messageRecipient} onChange={(e) => setMessageRecipient(e.target.value)} className="w-full px-4 py-3 border rounded-lg"><option value="">انتخاب گیرنده...</option>{users.filter(u => u.id !== user.id).map(u => <option key={u.id} value={u.id}>{u.fullName}</option>)}</select>
                  <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} rows={4} className="w-full px-4 py-3 border rounded-lg" placeholder="متن پیام"></textarea>
                  <button onClick={sendMessage} className="px-6 py-2 rounded-lg text-white font-bold" style={{ backgroundColor: '#0a4a8f' }}>ارسال</button>
                </div>
              </div>
              <div className="space-y-4">
                {myReceivedMessages.map(msg => (
                  <div key={msg.id} className="bg-white p-4 rounded-lg shadow-lg">
                    <p className="font-bold">{msg.senderName}</p>
                    <p className="text-gray-600">{msg.text}</p>
                  </div>
                ))}
                {myReceivedMessages.length === 0 && <p className="text-gray-500">پیامی نیست</p>}
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">افزودن خبر</h3>
                <div className="space-y-4">
                  <input type="text" value={newNewsTitle} onChange={(e) => setNewNewsTitle(e.target.value)} placeholder="عنوان" className="w-full px-4 py-3 border rounded-lg" />
                  <textarea value={newNewsContent} onChange={(e) => setNewNewsContent(e.target.value)} rows={3} placeholder="متن" className="w-full px-4 py-3 border rounded-lg"></textarea>
                  <input type="file" accept="image/*" ref={newsImageInputRef} onChange={handleNewsImageUpload} className="w-full px-4 py-3 border rounded-lg" />
                  <button onClick={addNews} className="px-6 py-2 rounded-lg text-white font-bold" style={{ backgroundColor: '#0a4a8f' }}>افزودن</button>
                </div>
              </div>
              <div className="space-y-4">
                {newsItems.map(n => (
                  <div key={n.id} className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
                    <div><h3 className="font-bold">{n.title}</h3><p className="text-sm text-gray-500">{n.content}</p></div>
                    <button onClick={() => deleteNews(n.id)} className="px-3 py-1 bg-red-600 text-white rounded-lg">حذف</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">افزودن تصویر</h3>
                <div className="space-y-4">
                  <input type="text" value={newGalleryTitle} onChange={(e) => setNewGalleryTitle(e.target.value)} placeholder="عنوان" className="w-full px-4 py-3 border rounded-lg" />
                  <input type="text" value={newGalleryDescription} onChange={(e) => setNewGalleryDescription(e.target.value)} placeholder="توضیحات" className="w-full px-4 py-3 border rounded-lg" />
                  <input type="file" accept="image/*" ref={galleryImageInputRef} onChange={handleGalleryImageUpload} className="w-full px-4 py-3 border rounded-lg" />
                  <button onClick={addGalleryItem} className="px-6 py-2 rounded-lg text-white font-bold" style={{ backgroundColor: '#0a4a8f' }}>افزودن</button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {galleryItems.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg">
                    {item.imageData && <img src={item.imageData} alt={item.title} className="h-24 w-full object-cover rounded mb-2" />}
                    <h3 className="font-bold text-sm">{item.title}</h3>
                    <button onClick={() => deleteGalleryItem(item.id)} className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm mt-2">حذف</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">افزودن دستاورد</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" value={newAchievementTitle} onChange={(e) => setNewAchievementTitle(e.target.value)} placeholder="عنوان" className="px-4 py-3 border rounded-lg" />
                  <input type="text" value={newAchievementValue} onChange={(e) => setNewAchievementValue(e.target.value)} placeholder="مقدار" className="px-4 py-3 border rounded-lg" />
                </div>
                <button onClick={addAchievement} className="mt-4 px-6 py-2 rounded-lg text-white font-bold" style={{ backgroundColor: '#0a4a8f' }}>افزودن</button>
              </div>
              <div className="space-y-4">
                {achievements.map(a => (
                  <div key={a.id} className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
                    <div><h3 className="font-bold">{a.title}</h3><p className="font-bold" style={{ color: '#0a4a8f' }}>{a.value}</p></div>
                    <button onClick={() => deleteAchievement(a.id)} className="px-3 py-1 bg-red-600 text-white rounded-lg">حذف</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'teachers-management' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">افزودن معلم</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" value={newTeacherName} onChange={(e) => setNewTeacherName(e.target.value)} placeholder="نام" className="px-4 py-3 border rounded-lg" />
                  <input type="text" value={newTeacherSubject} onChange={(e) => setNewTeacherSubject(e.target.value)} placeholder="درس" className="px-4 py-3 border rounded-lg" />
                  <input type="text" value={newTeacherEducation} onChange={(e) => setNewTeacherEducation(e.target.value)} placeholder="تحصیلات" className="px-4 py-3 border rounded-lg" />
                  <input type="text" value={newTeacherExperience} onChange={(e) => setNewTeacherExperience(e.target.value)} placeholder="سابقه" className="px-4 py-3 border rounded-lg" />
                </div>
                <input type="file" accept="image/*" ref={teacherImageInputRef} onChange={handleTeacherImageUpload} className="w-full px-4 py-3 border rounded-lg mt-4" />
                <button onClick={addTeacher} className="mt-4 px-6 py-2 rounded-lg text-white font-bold" style={{ backgroundColor: '#0a4a8f' }}>افزودن</button>
              </div>
              <div className="space-y-4">
                {teachers.map(t => (
                  <div key={t.id} className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {t.imageData && <img src={t.imageData} alt={t.name} className="w-10 h-10 rounded-full object-cover" />}
                      <div><h3 className="font-bold">{t.name}</h3><p className="text-sm">{t.subject}</p></div>
                    </div>
                    <button onClick={() => deleteTeacher(t.id)} className="px-3 py-1 bg-red-600 text-white rounded-lg">حذف</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-4">
              {testimonials.length === 0 ? <p className="text-gray-500">نظری نیست</p> : testimonials.map(t => (
                <div key={t.id} className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
                  <div><h3 className="font-bold">{t.userName}</h3><p>{t.comment}</p></div>
                  <button onClick={() => deleteTestimonial(t.id)} className="px-3 py-1 bg-red-600 text-white rounded-lg">حذف</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-4">
              {applications.length === 0 ? <p className="text-gray-500">درخواستی نیست</p> : applications.map(a => (
                <div key={a.id} className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
                  <div><h3 className="font-bold">{a.fullName}</h3><p className="text-sm">{a.nationalId} - {a.parentMobile}</p></div>
                  <div className="flex gap-2"><button onClick={() => updateApplicationStatus(a.id, 'approved')} className="px-3 py-1 bg-green-600 text-white rounded-lg">تایید</button><button onClick={() => deleteApplication(a.id)} className="px-3 py-1 bg-red-600 text-white rounded-lg">حذف</button></div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-800 text-white"><tr><th className="px-4 py-3">نام</th><th className="px-4 py-3">نام کاربری</th><th className="px-4 py-3">موبایل</th><th className="px-4 py-3">نقش</th><th className="px-4 py-3">وضعیت</th><th className="px-4 py-3">عملیات</th></tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b">
                      <td className="px-4 py-3 font-bold">{u.fullName}</td>
                      <td className="px-4 py-3">{u.username}</td>
                      <td className="px-4 py-3">{u.phone || '-'}</td>
                      <td className="px-4 py-3">{u.role === 'student' ? 'دانش‌آموز' : u.role === 'teacher' ? 'معلم' : u.role === 'parent' ? 'والدین' : 'مدیر'}</td>
                      <td className="px-4 py-3">{u.status || '-'}</td>
                      <td className="px-4 py-3"><button onClick={() => deleteUser(u.id)} className="px-3 py-1 bg-red-600 text-white rounded-lg">حذف</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
              <h3 className="text-xl font-bold mb-6">تنظیمات حساب</h3>
              <div className="space-y-4">
                <div><label className="block font-bold mb-2">نام کامل</label><input type="text" value={settingsFullName} onChange={(e) => setSettingsFullName(e.target.value)} className="w-full px-4 py-3 border rounded-lg" /></div>
                <div><label className="block font-bold mb-2">شماره موبایل</label><input type="text" value={settingsPhone} onChange={(e) => setSettingsPhone(e.target.value)} className="w-full px-4 py-3 border rounded-lg" /></div>
                <div><label className="block font-bold mb-2">رمز عبور جدید</label><input type="password" value={settingsPassword} onChange={(e) => setSettingsPassword(e.target.value)} placeholder="رمز جدید" className="w-full px-4 py-3 border rounded-lg" /></div>
                <div><label className="block font-bold mb-2">تکرار رمز عبور</label><input type="password" value={settingsConfirmPassword} onChange={(e) => setSettingsConfirmPassword(e.target.value)} placeholder="تکرار رمز" className="w-full px-4 py-3 border rounded-lg" /></div>
                <div><label className="block font-bold mb-2">عکس پروفایل</label><input type="file" accept="image/*" onChange={handleSettingsPhotoUpload} className="w-full px-4 py-3 border rounded-lg" /></div>
                <button onClick={saveSettings} className="px-6 py-2 rounded-lg font-bold text-white" style={{ backgroundColor: '#0a4a8f' }}>ذخیره تغییرات</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}