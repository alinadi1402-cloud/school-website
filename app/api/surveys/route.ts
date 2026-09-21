import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    const surveys = await prisma.survey.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ success: true, surveys })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const survey = await prisma.survey.create({
      data: {
        title: body.title,
        question: body.question,
        options: body.options,
        createdBy: body.createdBy
      }
    })
    return NextResponse.json({ success: true, survey })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}