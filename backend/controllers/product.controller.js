import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/ProductModal.js'

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, sizes, bestseller } = req.body


        console.log(req.files);

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]



        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )
        console.log(imagesUrl);

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true' ? true : false,
            image: imagesUrl,
            date: Date.now()
        }
        console.log(productData);


        const product = new productModel(productData)
        await product.save()
        res.json({ success: true, message: 'Prodduct added' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }


}

const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({})
        return res.json({ success: true, products })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body
        await productModel.findByIdAndDelete(id)
        return res.json({ success: true, message: "Product deleted" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const singleProduct = async (req, res) => {
    try {
        const productId = req.body
        const product = await productModel.findById(productId)
        return res.json({ success: true, product })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export { addProduct, listProduct, removeProduct, singleProduct }