import {type Event} from '../utils/index.js';
import ready from './ready.js';
import message from './message.js';
import interaction from './interaction.js';
import counting from './counting.js';
import ticket from './ticket.js';

export default [
	ready,
	message,
	interaction,
	counting,
	ticket
] as Event[];
