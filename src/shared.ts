
export function isUndefined(item: unknown): item is undefined {
  return typeof item == 'undefined';
}