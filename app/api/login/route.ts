import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password
      }
    })
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'نام کاربری یا رمز عبور اشتباه است' }, { status: 401 })
    }
    
    return NextResponse.json({ success: true, user })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}