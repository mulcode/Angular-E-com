export interface signUp{
    name:string,
    email:string,
    password:string
}
export interface login{
    email:string,
    password:string
}
export interface product {
    name:string,
    price:number,
    color:string,
    catagory:string,
    description:string,
    image:string,
    id:number,
    quantity: string | number
    productId: number
}
export interface cart {
    name:string,
    price:number,
    color:string,
    catagory:string,
    description:string,
    image:string,
    id: undefined | number,
    quantity: string | number,
    userId:number,
    productId:number
}
export interface priceSummery{
    price:number,
    tax:number,
    discount:number,
    delivery:number,
    total:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    id:number|undefined
}