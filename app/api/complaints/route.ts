import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    const complaints = await prisma.complaint.findMany()
    return NextResponse.json({ success: true, complaints })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const complaint = await prisma.complaint.create({
      data: {
        studentId: body.studentId,
        studentName: body.studentName,
        subject: body.subject,
        reason: body.reason,
        status: 'pending',
        response: ''
      }
    })
    return NextResponse.json({ success: true, complaint })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}