/**
 * Lab Escape - Core Pure Game Logic
 * Provides testable pure functions for level configuration, card generation,
 * match verification, and score computation.
 */

const levels = {
    1: {
        id: 1,
        matchSize: 2,
        gridClass: 'grid-4x4',
        items: [
            { id: 1, texts: ["NaCl", "Yemek tuzu"] },
            { id: 2, texts: ["CaCO3", "Kireç taşı"] },
            { id: 3, texts: ["NaHCO3", "Yemek sodası"] },
            { id: 4, texts: ["Ca(OH)2", "Sönmüş kireç"] },
            { id: 5, texts: ["HNO3", "Kezzap"] },
            { id: 6, texts: ["KOH", "Potas kostik"] },
            { id: 7, texts: ["CaO", "Sönmemiş kireç"] },
            { id: 8, texts: ["NH3", "Amonyak"] }
        ],
        storyWin: "Sector 1 doors open... The lab gets darker."
    },
    2: {
        id: 2,
        matchSize: 3,
        gridClass: 'grid-4x3',
        items: [
            { id: 1, texts: ["HCl", "Tuz ruhu", "Temizlik dolabında"] },
            { id: 2, texts: ["H2SO4", "Zaç yağı", "Akü sıvısı"] },
            { id: 3, texts: ["NaOH", "Sud kostik", "Sabun yapımında"] },
            { id: 4, texts: ["CH3COOH", "Sirke asidi", "Salata sosu"] }
        ],
        storyWin: "Main terminal accessed. You are free."
    }
};

function generateCardData(levelIndex) {
    const level = levels[levelIndex];
    if (!level) throw new Error(`Invalid level: ${levelIndex}`);
    const cardData = [];
    level.items.forEach(item => {
        item.texts.forEach(text => {
            cardData.push({ setId: item.id, text: text });
        });
    });
    return cardData;
}

function shuffleCards(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function checkMatch(selectedCards) {
    if (!selectedCards || selectedCards.length === 0) return false;
    const firstId = selectedCards[0].setId ?? selectedCards[0].dataset?.setId;
    return selectedCards.every(card => {
        const id = card.setId ?? card.dataset?.setId;
        return id === firstId;
    });
}

function calculateMatchScore(timeElapsed) {
    return Math.max(100 - timeElapsed, 10);
}

function isLevelComplete(matchedSets, levelIndex) {
    const level = levels[levelIndex];
    if (!level) return false;
    return matchedSets >= level.items.length;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        levels,
        generateCardData,
        shuffleCards,
        checkMatch,
        calculateMatchScore,
        isLevelComplete
    };
}
