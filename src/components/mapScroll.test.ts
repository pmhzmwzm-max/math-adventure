import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getHighestUnlockedLevel,
  getLevelProgressRatio,
  getScrollTopForLevel,
} from './mapScroll';

test('maps lower level numbers toward the bottom of the scroll area', () => {
  assert.equal(getLevelProgressRatio(-82), 0);
  assert.equal(getLevelProgressRatio(240), 1);
});

test('centers a mid-map level instead of jumping to the top', () => {
  const scrollTop = getScrollTopForLevel({
    levelTop: 79,
    scrollHeight: 4000,
    containerHeight: 1000,
  });

  assert.equal(scrollTop, 1500);
});

test('keeps the first level near the bottom edge when centering would overflow', () => {
  const scrollTop = getScrollTopForLevel({
    levelTop: 240,
    scrollHeight: 4000,
    containerHeight: 1000,
  });

  assert.equal(scrollTop, 3000);
});

test('finds the current unlocked level from the provided level list', () => {
  const level = getHighestUnlockedLevel(
    [1, 2, 7],
    [
      { id: 1, top: 240 },
      { id: 7, top: 194 },
      { id: 50, top: -82 },
    ],
  );

  assert.deepEqual(level, { id: 7, top: 194 });
});
