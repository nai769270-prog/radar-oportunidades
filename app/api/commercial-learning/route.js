import {NextResponse} from 'next/server';
import {getCommercialLearning} from '../../../lib/store';
export async function GET(){return NextResponse.json({data:getCommercialLearning(),meta:{description:'Resultados comerciais registrados diretamente nas oportunidades.',adjustment:'O aprendizado pode ajustar novas oportunidades entre -10 e +10 pontos quando existe amostra suficiente.'}})}
