/**
 * Shared-element transitions: the outgoing screen stashes where an element was,
 * the incoming screen takes that rectangle once and animates from it.
 */
export interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

const pending = new Map<string, Box>();

export const stashBox = (key: string, el: Element | null) => {
  if (!el) return;
  const { left, top, width, height } = el.getBoundingClientRect();
  pending.set(key, { left, top, width, height });
};

export const takeBox = (key: string): Box | null => {
  const box = pending.get(key) ?? null;
  pending.delete(key);
  return box;
};
