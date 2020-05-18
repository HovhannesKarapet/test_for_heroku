const Categories = require('../models/Categories');
const Category_items = require('../models/Category-items');

module.exports = {

    getAllCategories: async (req, res) => {
        try {
            const categories = await Categories.find();

            res.status(200).json(categories);
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    },

    getCategoryNames: async (req, res) => {
        try {
            const categories = await Categories.find().select('name');

            res.status(200).json(categories);
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    },

    createCategory: async (req, res) => {
        try {
            const file = req.file;
            const image = `${req.protocol}://${req.headers.host}/uploads/${file.filename}`;

            const category = new Categories({
                name: req.body.name,
                img: image
            });

            await category.save();

            res.status(201).json(category);
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    },

    updateCategory: async (req, res) => {
        try {
            const file = req.file ? req.file : null, update = {};

            if(req.body.name) update.name = req.body.name;
            if(file) {
                const image = `${req.protocol}://${req.headers.host}/uploads/${file.filename}`;
                update.img = image;
            }

            const category = await Categories.findOneAndUpdate({_id: req.params.category_id}, update, {new: true});

            res.status(201).json(category);
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    },

    removeCategory: async (req, res) => {
        try {
            await Categories.findByIdAndDelete(req.params.category_id);
            await Category_items.deleteMany({category_id: req.params.category_id});

            res.status(204).json('success!');
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    },
};
