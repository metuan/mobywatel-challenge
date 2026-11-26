import { describe, expect, it } from 'vitest';
import { R, TABOF, TABS, isRoute } from '@/app/routes';
import { BEATS, CHAPTERS, beatOf, chapterOf } from '@/story/chapters';
import { TECH } from '@/tech/techData';

describe('guided story', () => {
  it('has a beat list for every chapter', () => {
    expect(BEATS).toHaveLength(CHAPTERS.length);
    BEATS.forEach(beats => expect(beats.length).toBeGreaterThan(0));
  });

  it('only points at screens that exist', () => {
    for (const ch of CHAPTERS) {
      ch.r.forEach(r => expect(isRoute(r), `chapter "${ch.t}" route ${r}`).toBe(true));
      ch.x.forEach(([, r]) => expect(isRoute(r), `chapter "${ch.t}" link ${r}`).toBe(true));
    }
    BEATS.flat().forEach(([r]) => expect(isRoute(r), `beat route ${r}`).toBe(true));
  });

  it('opens each chapter on its first beat', () => {
    CHAPTERS.forEach((ch, i) => expect(ch.r[0]).toBe(BEATS[i][0][0]));
  });

  it('finds the chapter and beat for a route', () => {
    expect(chapterOf('move-2')).toBe(2);
    expect(beatOf(2, 'move-2')).toBe(1);
    expect(beatOf(2, 'today')).toBe(-1);
  });
});

describe('routes', () => {
  it('has a screen for every tab', () => {
    TABS.forEach(([r]) => expect(typeof R[r]).toBe('function'));
  });

  it('highlights the owning tab for deep screens', () => {
    expect(TABOF('move-3')).toBe('matters');
    expect(TABOF('visit-2')).toBe('family');
    expect(TABOF('alert-red')).toBe('safety');
    expect(TABOF('doc-id')).toBe('docs');
    expect(TABOF('profile')).toBe('today');
  });

  it('explains only screens that exist', () => {
    Object.keys(TECH).forEach(k => expect(isRoute(k), `TECH entry ${k}`).toBe(true));
  });
});
