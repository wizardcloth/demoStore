import express from "express";
const router = express.Router();
import {getProduct,createProduct,deleteProduct,updateProduct} from "../controller/product.controller.js"

router.get("/",getProduct)
router.post("/",createProduct)
router.delete("/:id",deleteProduct)
router.put("/:id",updateProduct)

export default router;