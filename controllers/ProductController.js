const { Product, Store } = require('../models'); // Import Store model

const createProduct = async (req, res) => {
    try {
        // Handle Image Uploads
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            const baseUrl = process.env.FILE_BASE_URL || `${req.protocol}://${req.get('host')}`;
            imageUrls = req.files.map(file => {
                // If S3/Cloudinary provides 'location' or public 'path'
                if (file.location) return file.location;
                if (file.path && file.path.startsWith('http')) return file.path;
                // Local fallback
                return `${baseUrl}/uploads/products/${file.filename}`;
            });
        } else if (req.file) {
            const baseUrl = process.env.FILE_BASE_URL || `${req.protocol}://${req.get('host')}`;
            const file = req.file;
            let url;
            if (file.location) url = file.location;
            else if (file.path && file.path.startsWith('http')) url = file.path;
            else url = `${baseUrl}/uploads/products/${file.filename}`;
            imageUrls.push(url);
        }

        const productData = {
            ...req.body,
            product_images: imageUrls.length > 0 ? imageUrls : req.body.product_images
        };

        const product = await Product.create(productData);
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error("Create Product Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const { store_id, city_id } = req.query;
        let whereClause = {};
        let includeClause = [];

        if (store_id) {
            whereClause.store_id = store_id;
        }

        // Always include Store details (Name, Logo, etc.) for display
        let storeInclude = {
            model: Store,
            attributes: ['store_id', 'store_name', 'store_logo', 'city_id'],
            required: true
        };

        // If City ID provided, filter Store by that city
        if (city_id) {
            storeInclude.where = { city_id: city_id };
        }

        includeClause.push(storeInclude);

        const products = await Product.findAll({
            where: whereClause,
            include: includeClause
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Handle Image Uploads
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            const baseUrl = process.env.FILE_BASE_URL || `${req.protocol}://${req.get('host')}`;
            imageUrls = req.files.map(file => {
                if (file.location) return file.location;
                if (file.path && file.path.startsWith('http')) return file.path;
                return `${baseUrl}/uploads/products/${file.filename}`;
            });
        } else if (req.file) {
            const baseUrl = process.env.FILE_BASE_URL || `${req.protocol}://${req.get('host')}`;
            const file = req.file;
            let url;
            if (file.location) url = file.location;
            else if (file.path && file.path.startsWith('http')) url = file.path;
            else url = `${baseUrl}/uploads/products/${file.filename}`;
            imageUrls.push(url);
        }

        const updateData = {
            ...req.body,
        };

        // Only update images if new ones are uploaded
        if (imageUrls.length > 0) {
            updateData.product_images = imageUrls;
        }

        const updatedProduct = await product.update(updateData);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        await product.destroy();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
