import express from "express";
import {
  validateProduct,
  validateProductEdit,
  validateSigleProduct,
} from "../middleware/express-validator";
import homePageContoller from "../controllers/homePageController";
import uploadImage from "../utils/multer";

const homePageRouter = express.Router();

homePageRouter.post(
  "/addProduct",
  uploadImage,
  validateProduct,
  homePageContoller.addProduct
);

homePageRouter.put(
  "/editProduct",
  uploadImage,
  validateProductEdit,
  homePageContoller.editProduct
);

homePageRouter.get("/getAllProducts", homePageContoller.getProducts);

homePageRouter.get(
  "/getSingleProduct/:id",
  validateSigleProduct,
  homePageContoller.getSingleProduct
);

homePageRouter.delete(
  "/removeProduct/:id",
  validateSigleProduct,
  homePageContoller.removeProduct
);

export default homePageRouter;
