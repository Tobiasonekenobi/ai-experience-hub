import { useCallback, useEffect, useState } from 'react';

const PREFIX = 'aeh_';

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw == null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* storage kan være blokeret – appen virker stadig */
  }
}

export function remove(key: string) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    /* ignore */
  }
}

/** useState der spejles til localStorage. */
export function useStored<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => load(key, fallback));
  useEffect(() => save(key, value), [key, value]);
  const reset = useCallback(() => {
    remove(key);
    setValue(fallback);
  }, [key, fallback]);
  return [value, setValue, reset] as const;
}

export function useFavorites() {
  const [favs, setFavs] = useStored<string[]>('favs', []);
  const toggle = useCallback(
    (id: string) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [id, ...f])),
    [setFavs],
  );
  return { favs, toggle, isFav: (id: string) => favs.includes(id) };
}

export function pushRecent(id: string) {
  const r = load<string[]>('recent', []).filter((x) => x !== id);
  r.unshift(id);
  save('recent', r.slice(0, 6));
}

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
