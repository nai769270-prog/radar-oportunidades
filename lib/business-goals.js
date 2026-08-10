import {readState,writeState} from './persistence';
const KEY='business-goals';const fallback={monthlyRevenue:1000,monthlySales:20,monthlyProducts:4,updatedAt:null};
export async function getBusinessGoals(){return await readState(KEY,fallback)}
export async function saveBusinessGoals(input={}){const current=await getBusinessGoals();const goals={monthlyRevenue:Math.max(0,Number(input.monthlyRevenue??current.monthlyRevenue)||0),monthlySales:Math.max(0,Number(input.monthlySales??current.monthlySales)||0),monthlyProducts:Math.max(0,Number(input.monthlyProducts??current.monthlyProducts)||0),updatedAt:new Date().toISOString()};await writeState(KEY,goals);return goals}
