export default async function handler(req, res) {
  if (req.method === 'POST') {
    const event = req.body;

    console.log('✅ Webhook received:', event);

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

