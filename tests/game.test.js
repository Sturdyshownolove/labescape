const test = require('node:test');
const assert = require('node:assert');
const {
    levels,
    generateCardData,
    shuffleCards,
    checkMatch,
    calculateMatchScore,
    isLevelComplete
} = require('../game-logic.js');

test('Lab Escape - Level Configurations', (t) => {
    assert.strictEqual(levels[1].matchSize, 2, 'Level 1 requires 2-card matches');
    assert.strictEqual(levels[2].matchSize, 3, 'Level 2 requires 3-card matches');
    assert.strictEqual(levels[1].items.length, 8, 'Level 1 has 8 chemical compound pairs');
    assert.strictEqual(levels[2].items.length, 4, 'Level 2 has 4 chemical compound trios');
});

test('Lab Escape - Card Generation', (t) => {
    const level1Cards = generateCardData(1);
    assert.strictEqual(level1Cards.length, 16, 'Level 1 generates 16 total cards (8 x 2)');
    
    const level2Cards = generateCardData(2);
    assert.strictEqual(level2Cards.length, 12, 'Level 2 generates 12 total cards (4 x 3)');
});

test('Lab Escape - Shuffling preserves items and order randomness', (t) => {
    const initial = generateCardData(1);
    const shuffled = shuffleCards(initial);
    assert.strictEqual(shuffled.length, initial.length, 'Shuffled deck preserves length');
    
    const initialIds = initial.map(c => c.setId).sort();
    const shuffledIds = shuffled.map(c => c.setId).sort();
    assert.deepStrictEqual(initialIds, shuffledIds, 'All set IDs remain present after shuffle');
});

test('Lab Escape - Matching Engine', (t) => {
    const matchingPair = [{ setId: 1, text: 'NaCl' }, { setId: 1, text: 'Yemek tuzu' }];
    assert.strictEqual(checkMatch(matchingPair), true, 'Identical set IDs should match');

    const mismatchedPair = [{ setId: 1, text: 'NaCl' }, { setId: 2, text: 'CaCO3' }];
    assert.strictEqual(checkMatch(mismatchedPair), false, 'Different set IDs should fail');

    const matchingTrio = [
        { setId: 3, text: 'NaOH' },
        { setId: 3, text: 'Sud kostik' },
        { setId: 3, text: 'Sabun yapımında' }
    ];
    assert.strictEqual(checkMatch(matchingTrio), true, 'Trio with matching set IDs should succeed');
});

test('Lab Escape - Score Calculation', (t) => {
    // Fast match at 5 seconds gives 100 - 5 = 95 points
    assert.strictEqual(calculateMatchScore(5), 95);
    // Fast match at 0 seconds gives 100 points
    assert.strictEqual(calculateMatchScore(0), 100);
    // Slow match after 120 seconds has a floor of 10 points
    assert.strictEqual(calculateMatchScore(120), 10);
});

test('Lab Escape - Win Condition Evaluation', (t) => {
    assert.strictEqual(isLevelComplete(7, 1), false, 'Level 1 not complete with 7 matches');
    assert.strictEqual(isLevelComplete(8, 1), true, 'Level 1 complete with 8 matches');
    assert.strictEqual(isLevelComplete(4, 2), true, 'Level 2 complete with 4 matches');
});
