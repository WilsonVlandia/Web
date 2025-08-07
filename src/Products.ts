import ProductController from "./controller/ProductController"
import Server from "./express/Server"
import ProductModel from "./model/ProductModel"
import ProductView from "./view/ProductsView"

const productModel = new ProductModel()
const productController = new ProductController(productModel)
const productView = new ProductView(productController)

const server = new Server(productView)
server.start()