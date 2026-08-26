/**
 * Production visit counter (Vercel serverless).
 *
 * Local `npm run dev` does not run this file. The footer then uses localStorage.
 *
 * To enable a global count on Vercel:
 *   1. Create an Upstash Redis database.
 *   2. In the Vercel project, set:
 *        UPSTASH_REDIS_REST_URL
 *        UPSTASH_REDIS_REST_TOKEN
 *   3. Redeploy.
 *
 * COUNTER_KEY is the Redis key. Change it only if you want to reset the count.
 */
const COUNTER_KEY = 'portfolio:visits';

async function incrementRemoteCounter() {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    throw new Error('Missing Upstash Redis environment variables.');
  }

  const response = await fetch(`${redisUrl}/incr/${COUNTER_KEY}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${redisToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Upstash request failed with status ${response.status}`);
  }

  const payload = await response.json();
  const count = typeof payload.result === 'number' ? payload.result : Number(payload.result);

  if (Number.isNaN(count)) {
    throw new Error('Invalid counter value returned from Upstash.');
  }

  return count;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const count = await incrementRemoteCounter();
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({
      error: 'Visit counter is not configured.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
