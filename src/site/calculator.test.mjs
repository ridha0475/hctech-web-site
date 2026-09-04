/** node src/site/calculator.test.mjs */
import assert from 'node:assert/strict';
import { estimate } from './calculator.js';

const r = estimate(12000, 2.525); // station médiane, prix pompe actuel

assert.equal(r.liters.day, 60); // 12 000 L × 5 ‰
assert.equal(r.liters.year, 60 * 365);
assert.equal(r.share.day.toFixed(2), '60.60'); // 60 L × 2,525 DT × 40 %
assert.equal(r.vat.day.toFixed(2), '9.68'); // TVA 19 % comprise dans le TTC

// la TVA est incluse dans la part, jamais ajoutée par-dessus
assert.ok(r.vat.year < r.share.year);
assert.equal((r.share.year - r.vat.year).toFixed(2), (r.share.year / 1.19).toFixed(2));

// tout est linéaire : doubler le volume double la part
assert.equal(estimate(24000, 2.525).share.year, r.share.year * 2);

console.log('ok');
