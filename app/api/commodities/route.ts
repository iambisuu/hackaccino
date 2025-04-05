import { NextResponse } from 'next/server';
import { commodities, getCommodityDetail } from '@/lib/dummy-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (id) {
    const commodity = getCommodityDetail(id);
    
    if (!commodity) {
      return NextResponse.json(
        { error: 'Commodity not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(commodity);
  }
  
  // Optional filtering by category
  const category = searchParams.get('category');
  
  if (category && category !== 'All') {
    const filteredCommodities = commodities.filter(
      item => item.category.toLowerCase() === category.toLowerCase()
    );
    return NextResponse.json(filteredCommodities);
  }
  
  return NextResponse.json(commodities);
}