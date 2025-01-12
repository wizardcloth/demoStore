import mongoose from "mongoose";
import Product from "../models/product.model.js";
export const getProduct =  async (req, res) => {
    try {
        let products = await Product.find({});
        return res.status(200).json({ success: true, message: products });
    } catch (error) {
        return res.status(500).json({ success: false, message: "server error" });
    }
}
export const createProduct =  async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "please provide all feilds" });
    }
    const newproduct = new Product(product);

    try {
        await newproduct.save();
        return res.status(200).json({ success: true, message: newproduct });
    } catch (error) {
        console.log("error occured", error.message);
        return res.status(500).json({ success: false, message: "server error" });
    }
}
export const deleteProduct = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, message: "product is not valid" });
    }
    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "server error" });
    }
}
export const updateProduct =  async (req, res) => {
    let { id } = req.params;
    let updatedproduct = req.body;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, message: "product is not valid" });
    }
    try {
        let product = await Product.findByIdAndUpdate(id, updatedproduct, { new: true });
        res.status(200).json({ success: true, message: product });
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" });
    }
}