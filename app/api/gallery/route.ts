import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    const gallery = await prisma.gallery.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ success: true, gallery })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const gallery = await prisma.gallery.create({
      data: {
        title: body.title,
        imageData: body.imageData || '',
        description: body.description || '',
        category: body.category || 'عمومی'
      }
    })
    return NextResponse.json({ success: true, gallery })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}