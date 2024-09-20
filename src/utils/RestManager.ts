import { BigString } from "discordeno/types";
import { FoxyClient } from "../structures/types/foxy";
import { User } from "../structures/types/user";
import config from '../../config.json';
import axios from "axios";

export class FoxyRestManager {
    public bot: FoxyClient;
    public api: any;
    public valorantAPI: any;

    constructor(bot) {
        this.bot = bot;
        this.valorantAPI = axios.create({
            baseURL: 'https://api.henrikdev.xyz',
            headers: {
                "Authorization": config.valorantAPI
            }
        });
    }

    /* Requests to Discord API */

    async getUserDisplayName(userId: BigString) {
        const user = await this.bot.rest.runMethod(this.bot.rest, "GET", this.bot.constants.routes.USER(userId));
        return user.global_name || user.username;
    }

    async getUser(userId: string): Promise<User> {
        return await this.bot.rest.runMethod(this.bot.rest, "GET", this.bot.constants.routes.USER(userId));
    }


    /* Valorant API */
    
    async getValMatchHistoryByUUID(puuid: string, mode?: string, map?: string) {
        let url = `valorant/v1/by-puuid/lifetime/matches/br/${puuid}?size=12`;

        if (mode) url += `&mode=${mode}`;

        if (map) url += `&map=${map}`;

        return (await this.valorantAPI.get(url)).data;
    }

    async getAllValMatchHistoryByUUID(puuid: string, mode?: string) {
        let url = `valorant/v1/by-puuid/lifetime/matches/br/${puuid}`;
        if (mode) url += `?&mode=${mode}`;

        return (await this.valorantAPI.get(url)).data;
    }

    async getValPlayerByUUID(puuid: string): Promise<any> {
        return (await this.valorantAPI.get(`valorant/v1/by-puuid/account/${puuid}`)).data;
    }

    async getMMR(puuid: string) {
        return (await this.valorantAPI.get(`valorant/v2/by-puuid/mmr/na/${puuid}`)).data;
    }

    async getValMatch(matchId: string) {
        return (await this.valorantAPI.get(`valorant/v2/match/${matchId}`)).data;
    }
}