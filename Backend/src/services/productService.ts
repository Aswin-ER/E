import productModel from "../models/productModel";
import { product } from "../models/types/productModel.types";

class Product {
  async addProduct(
    title: string,
    description: string,
    price: number,
    image: string[],
    category: string,
    featured: boolean
  ): Promise<any> {
    try {
      const addedProduct = await productModel.create({
        title,
        description,
        category,
        image,
        price,
        featured,
      });

      return addedProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async editProduct(
    title: string,
    description: string,
    price: number,
    image: string[],
    category: string,
    id: string,
    featured: boolean
  ): Promise<product | undefined> {
    try {
      await productModel.findByIdAndUpdate(
        {
          _id: id,
        },
        { $set: { title, description, category, image, price, featured } }
      );

      const editedProduct: product | any = await productModel.findById(id);

      return editedProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProducts(): Promise<product[] | undefined> {
    try {
      const allProducts: product[] | undefined = await productModel.find();

      return allProducts;
    } catch (error) {
      console.log(error);
    }
  }

  async getSingleProduct(id: number): Promise<product | undefined> {
    try {
      const product: product | any = await productModel.findById(id);
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id: number): Promise<string | undefined> {
    try {
      await productModel.findByIdAndDelete(id);
      return "Product deleted successfully...!";
    } catch (error) {
      console.log(error);
    }
  }

  async getAllFeaturedProducts(): Promise<product[] | undefined> {
    try {
      const allFeaturedProducts: product[] | undefined = await productModel.find({
        featured: true,
      });

      return allFeaturedProducts;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Product;
