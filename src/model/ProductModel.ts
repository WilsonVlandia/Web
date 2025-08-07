import ProductsDataBase from '../../database/products.json'
import ProductInterface from '../types/ProductInterface'
import { promises as fs } from 'fs'
import path from 'path'


export default class ProductModel{

    readonly retrieveProducts = async (): Promise<ProductInterface[]> => {
        return new Promise((resolve) => {
            try {
                const products = ProductsDataBase as ProductInterface[]
                resolve(products)
            } catch (error) {
                resolve([])
            }
        })
    }

    readonly retrieveProductByIdMine = async (id: string): Promise<ProductInterface | null> => {
    return new Promise((resolve) => {
        try {
            const products = ProductsDataBase as ProductInterface[];
            const numericId = Number(id);

            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                if (product && product.id === numericId) {
                    resolve(product);
                    return;
                }
            }

            resolve(NullProduct); // Producto no encontrado
        } catch (error) {
            resolve(NullProduct); // Error al buscar
        }
    });
    }

    readonly retrieveProductById = async (
            id:string
        ): Promise<ProductInterface>=>{
            // Reject devolver la exepcion, Resolve devolver un valor
            // No creo una nueva promesa
            try{
                const productList = await this.retrieveProducts();
                const product = productList.find(p => p.id.toString() == id)
                if(!product){
                    return NullProduct ;
                }else{
                    return product
                }
                    
                }catch(error){
                    console.error("Error retrineving products: ", error)
                    return NullProduct
                }
        
        }

        readonly retrieveDiscountedProducts = async (): Promise<ProductInterface[]> => {
    try {
        const productList: ProductInterface[] = await this.retrieveProducts();

        return productList.filter(
            product => product.discount === true && product.discountPer < 10
        );
    } catch (error) {
        console.error("Error retrieving discounted products:", error);
        return [];
    }
} //este no se hizo con query, la diferencia es que con el query es para cuando quiero valores especificos de 
// los atributos, mientras que el param es solo para el atributo que tenga ese valor

    readonly retrieveProductImageById = async (id: string): Promise<string> => {
    const file = `${id}.jpg`
    const absolutePath = path.join(__dirname, `../../assets/img/`) //variable de entorno para ubicarnos en una carpeta
    const defaultImage = 'not-icon.png'
    try {
      await fs.access(absolutePath + file, fs.constants.F_OK)
      const stats = await fs.stat(absolutePath + file)
      if (stats.isFile()) {
        return absolutePath + file
      }
      console.log(absolutePath)
      return absolutePath + defaultImage
    } catch (err) {
      console.error('Image not found, returning default image:', err)
      return absolutePath + defaultImage
    }
  }

readonly createProduct = async (newProduct: ProductInterface): Promise<ProductInterface> => {
  try {
    const filePath = path.join(__dirname, '../../database/products.json');
    
    // Leer productos actuales
    const data = await fs.readFile(filePath, 'utf-8');
    const products: ProductInterface[] = JSON.parse(data);

    // Asignar un nuevo ID si es necesario
    const maxId = products.reduce((max, p) => p.id > max ? p.id : max, 0);
    newProduct.id = maxId + 1;

    // Agregar nuevo producto
    products.push(newProduct);

    // Escribir productos actualizados en el archivo
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));

    return newProduct;

  } catch (error) {
    console.error('Error creating product:', error);
    return NullProduct;
  }
}

} 

    

export const NullProduct: ProductInterface = {
    id: 0,
    title: '',
    amount: '',
    price: 0,
    description: "",
    favorite: false,
    discount: false,
    discountPer: 0,
    discountUni: ""
}