import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany()
    return NextResponse.json({ success: true, teachers })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const teacher = await prisma.teacher.create({
      data: {
        name: body.name,
        subject: body.subject,
        education: body.education || '',
        experience: body.experience || '',
        imageData: body.imageData || ''
      }
    })
    return NextResponse.json({ success: true, teacher })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}
