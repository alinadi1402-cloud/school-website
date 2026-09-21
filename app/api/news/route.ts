import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ success: true, news })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const news = await prisma.news.create({
      data: {
        title: body.title,
        content: body.content,
        imageData: body.imageData || '',
      }
    })
    return NextResponse.json({ success: true, news })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}