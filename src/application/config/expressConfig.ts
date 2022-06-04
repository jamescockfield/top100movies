import 'dotenv/config'

import { ExpressConfig } from '../types/ExpressConfig';

export default {
	EXPRESS_PORT: parseInt(process.env.EXPRESS_PORT || '3000'),
	TMDB_ACCESS_TOKEN: process.env.TMDB_ACCESS_TOKEN || '',
	TMDB_API_URL: process.env.TMDB_API_URL || ''
} as ExpressConfig;
