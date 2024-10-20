import MercadoPagoConfig, { Payment, Preference } from "mercadopago";

export default class MercadoPagoClient {
    public client: MercadoPagoConfig;
    public payment: Payment;
    public preference: Preference;

    constructor(token: string) {
        this.client = new MercadoPagoConfig({
            accessToken: token,
            options: {
                timeout: 10000
            }
        });
        this.payment = new Payment(this.client);
    }

    public async getPayment(paymentId: string) {
        return this.payment.get({ id: paymentId });
    }
}