// تابع هش کردن رمز عبور (نسخه ساده)
export function hashPassword(password: string): string {
  let hash = 0
  const salt = 'school-salt-2024'
  const combined = password + salt
  
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  
  // تبدیل به رشته هگزادسیمال
  let hashString = Math.abs(hash).toString(16)
  
  // اضافه کردن طول رمز برای پیچیدگی بیشتر
  hashString = hashString + password.length.toString(16)
  
  return hashString
}

// تابع بررسی رمز عبور
export function verifyPassword(password: string, hashedPassword: string): boolean {
  const newHash = hashPassword(password)
  return newHash === hashedPassword
}