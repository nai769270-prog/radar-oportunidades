import { NextResponse } from 'next/server';
import { sourceRegistry } from '../../../lib/sources';
export async function GET(){return NextResponse.json({data:sourceRegistry,meta:{count:sourceRegistry.length}})}
