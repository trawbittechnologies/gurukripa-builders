import { NextResponse } from 'next/server';
import { getInquiries, saveInquiries } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  try {
    const isAuth = await verifyAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const inquiries = getInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const isAuth = await verifyAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status, notes } = await request.json();
    const inquiries = getInquiries();
    const index = inquiries.findIndex((inq) => inq.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    if (status !== undefined) inquiries[index].status = status;
    if (notes !== undefined) inquiries[index].notes = notes;

    saveInquiries(inquiries);
    return NextResponse.json({ message: 'Inquiry updated', inquiry: inquiries[index] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const isAuth = await verifyAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    let inquiries = getInquiries();
    inquiries = inquiries.filter((inq) => inq.id !== id);
    saveInquiries(inquiries);

    return NextResponse.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
