import{Request, Response} from 'express'
import ProductModel from '../model/ProductModel'
//import Product from '../types/ProductInterface'

export default class ProductController{

    constructor(private readonly productModel: ProductModel){

    }

    readonly getProduct = async(
        _req: Request, 
        res: Response
    ): Promise<void> => {
        const productList = await this.productModel.retrieveProducts()
        if (!productList){
            res.status(204).json({message: 'No products Found'})
        }
        res.status(200).json(productList)
        
    }

     readonly getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params['id'];

  if (!id) {
    res.status(400).json({ message: 'Missing product ID' });
    return;
  }

    const product = await this.productModel.retrieveProductById(id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  
};

    readonly getDiscountedProducts = async (
        _req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const discountedProducts = await this.productModel.retrieveDiscountedProducts();

            if (!discountedProducts || discountedProducts.length === 0) {
                res.status(204).json({ message: 'No discounted products found' });
                return;
            }

            res.status(200).json(discountedProducts);
        } catch (error) {
            console.error('Error retrieving discounted products:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

      readonly getProductImageById = async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const id = req.params['id'];

      if (!id) {
        res.status(400).json({ message: 'Missing product ID' });
        return;
      }

        const path = await this.productModel.retrieveProductImageById(id);

        if (!path) {
          res.status(404).json({ message: 'Product not found' });
          return;
        }

        res.status(200).sendFile(path); 
        //la variable path coge el path de la imagen para mandarla de una vez
        //json y sendfile
      
    };

  readonly createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newProduct = req.body;

  // Validación básica
  if (!newProduct.title || !newProduct.price) {
    res.status(400).json({ message: 'Missing required fields: name or price' });
    return;
  }

  try {
    const savedProduct = await this.productModel.createProduct(newProduct);

    if (!savedProduct) {
      res.status(500).json({ message: 'Failed to save product' });
      return;
    }

    res.status(201).json({ message: 'Product created', product: savedProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
    //en el modelo crear un utilitario que use el filesistem para un metodo de escribir y un metodo de leer, debe quedar afuera a nivel de archivos y esto es la utils


}