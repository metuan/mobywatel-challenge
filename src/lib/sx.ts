import type { CSSProperties } from 'react';

/** Turns a CSS declaration string ("width:10px;--i:2") into a React style object. */
export function sx(css: string | false | null | undefined): CSSProperties | undefined {
  if (!css) return undefined;
  const out: Record<string, string> = {};
  for (const decl of css.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    out[k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())] = decl
      .slice(i + 1)
      .trim();
  }
  return out as CSSProperties;
}
