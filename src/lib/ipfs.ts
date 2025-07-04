import { create } from 'ipfs-http-client';

/** Anonymous gateway – fine for a demo */
export const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' }); // :contentReference[oaicite:2]{index=2}
