import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateFields = (fields: any[]) => {
  return [
    ...fields,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      next();
    },
  ];
};

export const validateSignup = validateFields([
  //validate username
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),

  // Validate email
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),

  // Validate password
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]);

export const validateLogin = validateFields([
  // Validate email
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),

  // Validate password
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]);

export const validateProduct = validateFields([
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isString()
    .withMessage("Category must be a string"),
]);

export const validateProductEdit = validateFields([
  body("id").notEmpty().withMessage("Id is required").isString().withMessage("Id must be a String"),

  body("title").optional().isString().withMessage("Title must be a string"),

  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),
]);

export const validateSigleProduct = validateFields([
  param("id").isMongoId().withMessage("Invalid product ID"),
]);
