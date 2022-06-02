import 'dotenv/config'

import { ExpressConfig } from '../types/ExpressConfig';

export default {
	EXPRESS_PORT: parseInt(process.env.EXPRESS_PORT || '3000')
} as ExpressConfig;
