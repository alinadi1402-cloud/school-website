import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const user = await prisma.user.create({
      data: {
        fullName: body.fullName,
        username: body.username,
        email: body.email,
        password: body.password || '',
        role: body.role,
        status: 'pending',
      }
    })
    
    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ success: false, error: 'خطا در ثبت‌نام' }, { status: 500 })
  }
}