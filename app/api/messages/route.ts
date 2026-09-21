import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ success: true, messages })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const message = await prisma.message.create({
      data: {
        senderId: body.senderId,
        senderName: body.senderName,
        recipientId: body.recipientId,
        text: body.text,
        isRead: false,
        reply: ''
      }
    })
    return NextResponse.json({ success: true, message })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا' }, { status: 500 })
  }
}