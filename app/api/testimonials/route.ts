import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ success: true, testimonials })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const testimonial = await prisma.testimonial.create({
      data: {
        userName: body.userName,
        comment: body.comment,
        rating: body.rating || 5
      }
    })
    return NextResponse.json({ success: true, testimonial })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}