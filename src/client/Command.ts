import { Helper } from './RoxyClient';

export interface Run {
    (client: Helper, ...args: any[]): any;
}

export interface RoxyCommands {
    name: string;
    run: Run;
}