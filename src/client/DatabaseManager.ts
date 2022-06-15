import { Schema, connect, model } from 'mongoose';

export default class DatabaseManager {
    private user: any;
    private client: any;
    public guild: any;
    private key: any;

    constructor(auth: string, params: Object, client: any) {
        connect(auth, params, (err) => {
            if (err) return console.error('Ocorreu um erro ao se conectar no Atlas do MongoDB!', err);
        });

        const keySchema = new Schema({
            _id: String,
            key: String
        }, { versionKey: false, id: false });

        const userSchema = new Schema({
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
            locale: "pt-BR",
        }, { versionKey: false, id: false });

        this.client = client;
        this.user = model('user', userSchema);
        this.key = model('key', keySchema);
    }
    async getUser(userId: string): Promise<void> {
        const user = await this.client.users.fetch(userId);

        if (!user) return null;

        let document = await this.user.findOne({ _id: userId });

        if (!document) return null;

        return document;
    }

    async registerKey(key: string, userId: string): Promise<void> {
        let document = await this.key.findOne({ _id: userId });

        if (!document) {
            document = new this.key({ _id: userId, key: key });
            await document.save();
        } else {
            document.key = key;
            await document.save();
        }
    }

    async removeKey(userId: String) {
        await this.key.deleteOne({ _id: userId });
    }
}