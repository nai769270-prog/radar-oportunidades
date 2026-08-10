import {NextResponse} from 'next/server';
import {buildApolloSearchPlan} from '../../../lib/apollo-plan';
export async function POST(request){const opportunity=await request.json();return NextResponse.json({data:buildApolloSearchPlan(opportunity),meta:{executesApollo:false}})}
