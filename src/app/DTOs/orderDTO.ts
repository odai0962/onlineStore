import { Products } from "./productsDTO"


export class Order {

    orderId!: number
    totalPrice!: number
    paymentmethods!: string
    orderStatus!: string
    orderDate!: Date
    quantity!: number
    shippingAddress!: string
    customerName!: string
    productId!: number
    product!: Products
}