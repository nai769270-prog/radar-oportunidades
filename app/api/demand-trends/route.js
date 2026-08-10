import {NextResponse} from 'next/server';
import {getDemandTrends} from '../../../lib/demand-history';
export async function GET(){return NextResponse.json({data:getDemandTrends(),meta:{meaning:{rising:'score subiu 8 pontos ou mais desde a observação anterior',falling:'score caiu 8 pontos ou mais',stable:'variação menor que 8 pontos',new:'primeira observação'}}})}
