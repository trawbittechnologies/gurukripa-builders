import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  try {
    const data = getDbData();
    if (!data) {
      return NextResponse.json({ error: 'Database not found' }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const isAuth = await verifyAuth();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updatedData = await request.json();
    const success = saveDbData(updatedData);

    if (!success) {
      return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Data updated successfully', data: updatedData });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
