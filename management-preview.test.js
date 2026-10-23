import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,previewManagement,applyManagement,companyPosition,financials} from './engine.js';

const game=()=>{const s=createGame({players:[{name:'甲',roleId:'auto'},{name:'乙',roleId:'bank'}],seed:42});s.phase='manage';return s};

test('預覽借款不變更狀態，確認後實際現金、債務與利息符合預覽',()=>{
  const s=game(),original=JSON.stringify(s),preview=previewManagement(s,s.players[0].id,'loan',100);
  assert.equal(JSON.stringify(s),original);
  assert.equal(preview.before.netWorth,preview.after.netWorth);
  assert.equal(preview.after.loanInterest,1);
  applyManagement(s,s.players[0].id,'loan',100);
  assert.equal(companyPosition(s,'auto').cash,preview.after.cash);
  assert.equal(companyPosition(s,'auto').debt,preview.after.debt);
  assert.equal(financials(s,'auto').profit,preview.after.profit);
});

test('裁員預覽包括資遣費、產能與淨利，還款預覽降低利息',()=>{
  const s=game(),p=s.players[0].id;
  const preview=previewManagement(s,p,'layoff',1);
  assert.ok(preview.after.cash<preview.before.cash);
  assert.equal(preview.after.headcount,preview.before.headcount-1);
  applyManagement(s,p,'layoff',1);
  assert.equal(companyPosition(s,'auto').netWorth,preview.after.netWorth);
  assert.equal(financials(s,'auto').profit,preview.after.profit);
  applyManagement(s,p,'loan',100);
  assert.equal(previewManagement(s,p,'repay',100).after.loanInterest,0);
});

test('非法金額、跨回合、超額借還款與裁員均不改動原對局',()=>{
  const s=game(),original=JSON.stringify(s),p=s.players[0].id;
  for(const amount of [0,-1,1.5,NaN,Infinity])assert.throws(()=>previewManagement(s,p,'loan',amount));
  assert.throws(()=>previewManagement(s,s.players[1].id,'loan',1));
  assert.throws(()=>previewManagement(s,p,'loan',99999));
  assert.throws(()=>previewManagement(s,p,'repay',1));
  assert.throws(()=>previewManagement(s,p,'layoff',99999));
  assert.equal(JSON.stringify(s),original);
});
