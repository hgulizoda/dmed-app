const DELAY_MS = 400;

function delay(ms: number = DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function simulateApi<T>(data: T, ms: number = DELAY_MS): Promise<T> {
  await delay(ms);
  return data;
}

export async function simulateApiError(message: string, ms: number = DELAY_MS): Promise<never> {
  await delay(ms);
  throw new Error(message);
}
