const Category_items = require('../models/Category-items');

module.exports = {

    getCategoryItems: async (req, res) => {
        try {
            const category_items = await Category_items.find({category_id: req.params.category_id});

            res.status(200).json(category_items);
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    },

    getBestSellers: async (req, res) => {
        try {
            const best_sellers = await Category_items.find({best_seller: true});
            console.log('bst');
            res.status(200).json(best_sellers);
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    },

    createCategoryItem: async (req, res) => {
        try {
            const file = req.file;
            const image = `${req.protocol}://${req.headers.host}/uploads/${file.filename}`;

            const category_item = new Category_items({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                img: image,
                category_id: req.params.category_id
            });

            await category_item.save();

            return res.status(201).json(category_item);
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    },

    updateCategoryItem: async (req, res) => {
        try {
            const file = req.file ? req.file : null, update = {};

            if(file) {
                const image = `${req.protocol}://${req.headers.host}/uploads/${file.filename}`;
                update.img = image;
            }

            console.log(req.body);

            for(let key in req.body) {
                if(req.body[key] || req.body[key] === 0) update[key] = req.body[key];
            }

            const category_item = await Category_items.findOneAndUpdate({_id: req.params.category_item_id}, update, {new: true});

            res.status(200).json(category_item);
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    },

    removeCategoryItem: async (req, res) => {
        try {
            await Category_items.findByIdAndDelete(req.params.category_item_id);

            res.status(204).json('success!');
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    },
};
