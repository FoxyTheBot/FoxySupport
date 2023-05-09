import mongoose, { ConnectOptions } from 'mongoose';
import { mongouri } from '../../../config.json';
import { bot } from '../..';
import { FoxySupportClient } from '../../types/foxy';

export default class DatabaseConnection {
    private client: FoxySupportClient;
    private user: any;

    constructor(client: FoxySupportClient) {
        mongoose.set("strictQuery", true);
        mongoose.connect(mongouri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions).catch((error) => {
            console.error(error);
        });
        console.info(`[Database] Connected to MongoDB!`);

        const userSchema = new mongoose.Schema({
            _id: String,
            userCreationTimestamp: Date,
            premium: Boolean,
            premiumDate: Date,
            isBanned: Boolean,
            banData: Date,
            banReason: String,
            aboutme: String,
            balance: Number,
            lastDaily: Date,
            marriedWith: String,
            marriedDate: Date,
            repCount: Number,
            lastRep: Date,
            background: String,
            backgrounds: Array,
            premiumType: String,
            language: String,
            mask: String,
            masks: Array,
            layout: String
        }, { versionKey: false, id: false });

        this.user = mongoose.model("user", userSchema);
        this.client = client;
    }

    async getUser(userId: BigInt): Promise<void> {
        const user = await bot.helpers.getUser(String(userId))

        if (!user) return null;

        let document = await this.user.findOne({ _id: userId });

        if (!document) {
            document = new this.user({
                _id: userId,
                userCreationTimestamp: Date.now(),
                premium: false,
                premiumDate: null,
                isBanned: false,
                banData: null,
                banReason: null,
                aboutme: null,
                balance: 0,
                lastDaily: null,
                marriedWith: null,
                marriedDate: null,
                repCount: 0,
                lastRep: null,
                background: "default",
                backgrounds: ["default"],
                premiumType: null,
                language: 'pt-BR',
                mask: null,
                masks: [],
                layout: "default"
            }).save();
        }

        return document;
    }
}