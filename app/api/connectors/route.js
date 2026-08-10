import { NextResponse } from 'next/server';
import { connectorStatus } from '../../../lib/connectors';

export async function GET(){
  const data = connectorStatus();
  return NextResponse.json({ data, meta: { ready: data.filter(item => ['ready','configured','workspace-connected'].includes(item.status)).length, total: data.length } });
}
