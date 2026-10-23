// Generates a unique UPI QR reference for each transaction
export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { amount, purpose } = req.body;
  if (!amount || amount < 1) {
    return res.status(400).json({ error: 'Valid amount is required' });
  }

  // Unique reference per transaction
  const ref = `RASI${Date.now()}${Math.floor(Math.random() * 1000)}`;

  const upiVpa = process.env.UPI_VPA || process.env.NEXT_PUBLIC_UPI_VPA || '';
  const upiLink = `upi://pay?pa=${encodeURIComponent(upiVpa)}&pn=${encodeURIComponent('RASI Foundation')}&am=${amount}&cu=INR&tn=${encodeURIComponent(ref)}`;

  return res.status(200).json({ upiLink, ref });
}
