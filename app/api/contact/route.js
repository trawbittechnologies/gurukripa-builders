import { NextResponse } from 'next/server';
import { addInquiry } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, location, budget } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and Phone number are required' },
        { status: 400 }
      );
    }

    const newInquiry = addInquiry({
      name,
      email: email || '',
      phone,
      service: service || 'General Inquiry',
      message: message || '',
      location: location || '',
      budget: budget || '',
    });

    return NextResponse.json(
      { message: 'Inquiry received successfully! Our team will contact you shortly.', inquiry: newInquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
