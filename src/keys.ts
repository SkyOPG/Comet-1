/* eslint-disable @typescript-eslint/naming-convention */
import {getEnvVar} from './utils/env.js';

export const Keys = {
	clientToken: getEnvVar('CLIENT_TOKEN'),
	mongoURI: getEnvVar('MONGO'),
	prefix: getEnvVar('PREFIX'),
	secret: getEnvVar('SECRET'),
} as const;

export default Keys;
