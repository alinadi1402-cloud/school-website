import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    const exams = await prisma.exam.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ success: true, exams })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const exam = await prisma.exam.create({
      data: {
        title: body.title,
        subject: body.subject,
        questions: body.questions,
        createdBy: body.createdBy
      }
    })
    return NextResponse.json({ success: true, exam })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}