import { describe, expect, it } from 'vitest';
import { fmt, norm } from '@/lib/env';
import { howFor } from '@/story/howto';

describe('norm', () => {
  it('ignores case and Polish diacritics', () => {
    expect(norm('Zażółć GĘŚLĄ jaźń')).toBe('zazolc gesla jazn');
  });
});

describe('fmt', () => {
  it('uses a space as the thousands separator', () => {
    expect(fmt(1234567).replace(/\s/g, ' ')).toBe('1 234 567');
  });
});

describe('howFor', () => {
  it('answers how-to questions typed without diacritics', () => {
    expect(howFor('jak pokazac ze mam 18 lat')?.r).toBe('docs');
  });

  it('ignores queries that are too short', () => {
    expect(howFor('ab')).toBeNull();
  });
});
