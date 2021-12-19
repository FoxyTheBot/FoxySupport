import { Helper } from './RoxyClient';

export interface Run {
    (client: Helper, ...args: any[]): any;
}

export interface FoxyEvent {
    bind: string;
    run: Run;
}