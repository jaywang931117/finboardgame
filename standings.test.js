import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,playerStandings,issueLoan} from './engine.js';

const game=()=>createGame({players:[{name:'甲',roleId:'auto'},{name:'乙',roleId:'technology'},{name:'丙',roleId:'bank'}],seed:42});

test('排行榜按淨資產排序、同額並列，且不變更玩家回合順序',()=>{
  const state=game();state.companies.auto.cash=500;state.companies.bank.cash=1200;
  const before=JSON.stringify(state);
  const rows=playerStandings(state);
  assert.deepEqual(rows.map(x=>x.player.name),['乙','丙','甲']);
  assert.deepEqual(rows.map(x=>x.rank),[1,1,3]);
  assert.equal(JSON.stringify(state),before);
});

test('借款不提高排行榜淨資產；達標與負資產進度限制在 0–100',()=>{
  const state=game();state.phase='manage';
  const before=playerStandings(state).find(x=>x.player.roleId==='auto').netWorth;
  issueLoan(state,state.players[0].id,100);
  assert.equal(playerStandings(state).find(x=>x.player.roleId==='auto').netWorth,before);
  state.companies.auto.cash=6000;state.companies.technology.cash=-1000;
  const rows=playerStandings(state);
  assert.equal(rows.find(x=>x.player.roleId==='auto').progress,100);
  assert.equal(rows.find(x=>x.player.roleId==='auto').remaining,0);
  assert.equal(rows.find(x=>x.player.roleId==='technology').progress,0);
});
