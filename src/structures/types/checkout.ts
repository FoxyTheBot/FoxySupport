export interface Checkout {
    checkoutId: string,
    userId: string,
    itemId: string,
    date: Date,
    isApproved: boolean,
    paymentId: string,
}