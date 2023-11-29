import { insertDevice } from '$db/sqllite/devices.js';

export async function POST({ request }) {
    const device = await request.json();

    console.log('SERVER:', device);

    const createdDevice = await insertDevice(device);

    // return success
    return new Response(JSON.stringify({ success: true, device: createdDevice }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    // it's common to return JSON, so SvelteKit has a helper
    // return json({ success: true })
  }