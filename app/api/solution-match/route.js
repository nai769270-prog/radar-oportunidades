import {NextResponse} from 'next/server';
import {matchSolutions} from '../../../lib/solutions';
export async function POST(request){const opportunity=await request.json();const matches=matchSolutions(opportunity);return NextResponse.json({data:matches,meta:{count:matches.length,bestMatch:matches[0]?.id||null}})}
