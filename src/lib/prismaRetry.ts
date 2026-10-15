/**
 * Executes a Prisma query with exponential back-off retry.
 *
 * Retries on Prisma Accelerate / Postgres connection errors (P5xxx, P6xxx)
 * and generic network faults (ECONNREFUSED, ETIMEDOUT, fetch failed).
 *
 * @param fn          - The async thunk wrapping the Prisma query.
 * @param maxAttempts - Total attempts before giving up. Default: 4
 * @param baseDelayMs - Initial delay ms; doubles every retry.  Default: 400
 */
export async function withPrismaRetry<T>(
  fn: () => Promise<T>,
  {
    maxAttempts = 4,
    baseDelayMs = 400,
  }: { maxAttempts?: number; baseDelayMs?: number } = {}
): Promise<T> {
  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (err: unknown) {
      attempt++;

      const code = (err as { code?: string })?.code ?? "";
      const message = (err as { message?: string })?.message ?? "";

      const isRetryable =
        code.startsWith("P5") ||
        code.startsWith("P6") ||
        code === "ECONNREFUSED" ||
        code === "ETIMEDOUT" ||
        message.includes("Can't reach database server") ||
        message.includes("fetch failed") ||
        message.includes("ECONNRESET") ||
        message.includes("UnknownJsonError");

      if (!isRetryable || attempt >= maxAttempts) {
        throw err;
      }

      const delay = baseDelayMs * Math.pow(2, attempt - 1); // 400 ? 800 ? 1600 ms
      console.warn(
        `[PrismaRetry] Attempt ${attempt}/${maxAttempts} failed — retrying in ${delay}ms. Code: ${code || "n/a"}`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
