import { sha1 } from 'crypto-hash';
import type { NextApiRequest, NextApiResponse } from 'next';

const BEAUTIFUL_TRENDY_COLORS = [
	'#ff9a9e', // Pink
	'#fad0c4', // Peach
	'#f8b195', // Coral
	'#f67280', // Red
	'#c06c84', // Burgundy
	'#6c567b', // Purple
	'#355c7d', // Teal
	'#2e86de', // Blue
	'#00b894', // Mint
	'#f5d76e', // Yellow
	'#eccc68', // Mustard
	'#a3e4d7', // Turquoise
	'#54a0ff', // Sky Blue
	'#2d3436', // Charcoal
] as const;

async function generateSVG(name: string) {
	const hash = await sha1(name);
	const colorIndex = parseInt(hash.slice(0, 2), 16) % BEAUTIFUL_TRENDY_COLORS.length;
	const color = BEAUTIFUL_TRENDY_COLORS[colorIndex];
	const initial = name.charAt(0).toUpperCase();

	const svg = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="12" fill="${color}" />
  <text x="12" y="16" text-anchor="middle" fill="#ffffff" font-size="14" font-family="sans-serif">${initial}</text>
</svg>
  `.trim();

	return svg;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET']);
		return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
	}

	const { name } = req.query;

	if (name == null || typeof name !== 'string') {
		return res.status(400).json({ error: 'Invalid request' });
	}

	try {
		const svg = await generateSVG(name);

		res.setHeader('Content-Type', 'image/svg+xml');
		res.setHeader(
			'Cache-Control',
			`public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
		);
		res.statusCode = 200;
		res.send(svg);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}
