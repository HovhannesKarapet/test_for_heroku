const Ads = require('../models/Advertisement');

module.exports = {

    getAllAds: async(req, res) => {
        try {
            const ads = await Ads.find();

            res.status(200).json(ads);
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    },
    getAdsBySize: async (req, res) => {
        try {
            const ads = await Ads.find({size: req.params.size}).select(['img', 'size', 'name', 'count']);

            res.status(200).json(ads);
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    },
    createAd: async (req, res) => {
        try {
            const file = req.file;
            const image = `${req.protocol}://${req.headers.host}/uploads/${file.filename}`;

            const category = new Ads({
                name: req.body.name,
                img: image,
                size: req.body.size,
                count: 0
            });

            await category.save();

            res.status(201).json(category);
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    },

    deleteAd: async (req, res) => {
        try {
            await Ads.findByIdAndDelete(req.params.id);

            res.status(204).json('success!');
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    }
};