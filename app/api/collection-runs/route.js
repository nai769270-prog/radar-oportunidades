import {NextResponse} from 'next/server';
import {listCollectionRuns} from '../../../lib/collection-runs';
export async function GET(){return NextResponse.json({data:listCollectionRuns()})}
