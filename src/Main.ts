import { Intents } from 'discord.js';
import { Helper } from './client/HelperClient';
import * as Settings from '../settings.json';

require('../../src/FoxyReply.js');

const FoxyHelper = new Helper({ws:{intents: Intents.NON_PRIVILEGED}}, Settings);
FoxyHelper.start();