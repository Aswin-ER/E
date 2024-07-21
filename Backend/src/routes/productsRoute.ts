import express from "express";
import {
  validateProduct,
  validateProductEdit,
  validateSigleProduct,
} from "../middleware/express-validator";
import productsController from "../controllers/productsController";
import uploadImage from "../middleware/multer";
import verifyJwtToken from "../middleware/jwtVerifyUser";

const productsRouter = express.Router();

productsRouter.post(
  "/addProduct",
  uploadImage,
  validateProduct,
  verifyJwtToken,
  productsController.addProduct
);

productsRouter.put(
  "/editProduct",
  uploadImage,
  validateProductEdit,
  verifyJwtToken,
  productsController.editProduct
);

productsRouter.get("/getAllProducts", productsController.getProducts);

productsRouter.get(
  "/getSingleProduct/:id",
  validateSigleProduct,
  productsController.getSingleProduct
);

productsRouter.delete(
  "/removeProduct/:id",
  validateSigleProduct,
  verifyJwtToken,
  productsController.removeProduct
);

productsRouter.get(
  "/getFeaturedProducts",
  productsController.getFeaturedProducts
);

export default productsRouter;
