const WINDOW_MS = 60_000;
const SWEEP_THRESHOLD = 500;

export function createRateLimiter(perIp: number, globalMax: number) {
  const hits = new Map<string, number[]>();
  let all: number[] = [];

  return function isLimited(ip: string): boolean {
    const now = Date.now();

    all = all.filter((t) => now - t < WINDOW_MS);
    all.push(now);

    if (hits.size > SWEEP_THRESHOLD) {
      for (const [key, times] of hits) {
        if (now - times[times.length - 1] >= WINDOW_MS) hits.delete(key);
      }
    }

    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);

    return all.length > globalMax || recent.length > perIp;
  };
}

export function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local"
  );
}
