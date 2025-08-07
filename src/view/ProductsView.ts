import { Router } from "express";
import ProductController from "../controller/ProductController";

export default class ProductView{
    router: Router

constructor(private readonly productController: ProductController) {
    this.router = Router()
    this.routes()
}

    readonly routes = (): void => {
        this.router.get('/products/discounted', this.productController.getDiscountedProducts);
        this.router.get('/products/img/:id', this.productController.getProductImageById);
        this.router.get('/products/:id', this.productController.getProductById);
        this.router.get('/products', this.productController.getProduct); 
        this.router.post('/products', this.productController.getProduct);
        //de las mas detalladas hasta la raiz 
        //this.router.get('/products/discounted/q', this.productController.getDiscountedProducts) para el query!!!
    }
}