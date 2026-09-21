import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    const grades = await prisma.studentGrade.findMany()
    return NextResponse.json({ success: true, grades })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const grade = await prisma.studentGrade.create({
      data: {
        studentId: body.studentId,
        subject: body.subject,
        grade: body.grade,
        teacherName: body.teacherName
      }
    })
    return NextResponse.json({ success: true, grade })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}