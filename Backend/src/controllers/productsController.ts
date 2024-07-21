import { Request, Response } from "express";
import Product from "../services/productService";
import { product } from "../models/types/productModel.types";

const homePageContoller = {

  // Add products
  addProduct: async (
    req: Request<{
      price: number;
      title: string;
      description: string;
      category: string;
      featured: boolean;
    }>,
    res: Response<{ data: product | undefined; message: string }>
  ) => {
    try {
      const { price, title, description, category, featured } = req.body;

      const files: any = req.files;
      const image = files.map((file: any) => file.path);

      const productService = new Product();

      const product = await productService.addProduct(
        title,
        description,
        price,
        image,
        category,
        featured
      );

      if (!product) {
        return res.status(400).json({
          data: undefined,
          message: "Failed to Add products...!",
        });
      }

      if (product) {
        return res.status(200).json({
          data: product,
          message: "Added Product Successfully...!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: undefined,
        message: "Internal server Error!",
      });
    }
  },


  // Edit products
  editProduct: async (
    req: Request<{
      price: number;
      title: string;
      description: string;
      category: string;
      id: string;
      featured: boolean;
    }>,
    res: Response<{ data: product | undefined; message: string }>
  ) => {
    try {
      const { price, title, description, category, id, featured } = req.body;

      const files: any = req.files;
      const image = files.map((file: any) => file.path);

      const productService = new Product();

      const editedProduct: product | undefined =
        await productService.editProduct(
          title,
          description,
          price,
          image,
          category,
          id,
          featured
        );

      if (!editedProduct) {
        return res.status(400).json({
          data: undefined,
          message: "Failed to Edit products...!",
        });
      }

      if (editedProduct) {
        return res.status(200).json({
          data: editedProduct,
          message: "Edited Product Successfully...!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: undefined,
        message: "Internal server Error!",
      });
    }
  },


  // Get all products
  getProducts: async (
    req: Request<{}>,
    res: Response<{ data: product[] | undefined; message: string }>
  ) => {
    try {
      const productService = new Product();

      const getAllProducts = await productService.getAllProducts();

      if (!getAllProducts) {
        return res.status(400).json({
          data: undefined,
          message: "Failed to Get all products...!",
        });
      }

      if (getAllProducts) {
        return res.status(200).json({
          data: getAllProducts,
          message: "Fetched all Products Successfully...!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: undefined,
        message: "Internal server Error!",
      });
    }
  },


  // Get single product
  getSingleProduct: async (
    req: Request<{ id: number }>,
    res: Response<{ data: product | undefined; message: string }>
  ) => {
    try {
      const { id } = req.params;

      const productService = new Product();

      const singleProduct = await productService.getSingleProduct(id);

      if (!singleProduct) {
        return res.status(400).json({
          data: undefined,
          message: "Failed to Get product...!",
        });
      }

      if (singleProduct) {
        return res.status(200).json({
          data: singleProduct,
          message: "Fetched Product Successfully...!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: undefined,
        message: "Internal server Error!",
      });
    }
  },


  removeProduct: async (
    req: Request<{ id: number }>,
    res: Response<{ message: string }>
  ) => {
    try {
      const { id } = req.params;

      const productService = new Product();

      const deletedProduct = await productService.deleteProduct(id);

      if (!deletedProduct) {
        return res.status(400).json({
          message: "Failed to Delete product...!",
        });
      }

      if (deletedProduct) {
        return res.status(200).json({
          message: deletedProduct,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server Error!",
      });
    }
  },


  getFeaturedProducts: async (
    req: Request<{}>,
    res: Response<{ data: product[] | undefined; message: string }>
  ) => {
    try {
      const productService = new Product();

      const getAllFeaturedProducts =
        await productService.getAllFeaturedProducts();

      if (!getAllFeaturedProducts) {
        return res.status(400).json({
          data: undefined,
          message: "Failed to Get all Featured products...!",
        });
      }

      if (getAllFeaturedProducts.length > 0) {
        return res.status(200).json({
          data: getAllFeaturedProducts,
          message: "Fetched all Featured Products Successfully...!",
        });
      }else{
        return res.status(200).json({
          data: [],
          message: "No Featured Products to show...!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: undefined,
        message: "Internal server Error!",
      });
    }
  },
  
};

export default homePageContoller;
