import express, { Application } from "express"
import ProductView from "../view/ProductsView"

export default class Server{
    private readonly app: Application

    constructor(private readonly productView: ProductView){ //la responsabilidad del 
        //constructor es crear el servidor mas no crear 
        this.app = express()
        this.routes()
    }

    readonly configure = (): void =>{
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
    }

    readonly routes = (): void => {
        this.app.use('/shop', this.productView.router)
    }

    readonly start = ():void => {
        this.app.listen(1802, ()=>{
            console.log("server started")
        })
    }

}

