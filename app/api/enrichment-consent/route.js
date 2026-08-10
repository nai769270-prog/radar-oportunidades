import {NextResponse} from 'next/server';
import {buildEnrichmentConsent,validApolloPersonId} from '../../../lib/enrichment-consent';

export async function POST(request){
 const candidate=await request.json();
 if(!validApolloPersonId(candidate.id))return NextResponse.json({error:'valid_apollo_person_id_required'},{status:400});
 return NextResponse.json({data:buildEnrichmentConsent(candidate),meta:{executesEnrichment:false}});
}
