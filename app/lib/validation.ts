export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^09[0-9]{9}$/
  return phoneRegex.test(phone.replace(/[\s-]/g, ''))
}

export function isStrongPassword(password: string): boolean {
  const minLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  return minLength && hasUpperCase && hasLowerCase && hasNumber
}

export function limitLength(input: string, maxLength: number): string {
  return input.slice(0, maxLength)
}

export function isValidGrade(grade: string): boolean {
  const gradeNum = parseFloat(grade)
  return !isNaN(gradeNum) && gradeNum >= 0 && gradeNum <= 20
}