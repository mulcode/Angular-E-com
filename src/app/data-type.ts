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
    id:number
}