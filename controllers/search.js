Category_items = require('../models/Category-items');

module.exports = {

    search: async (req, res) => {
        if(req.body.search.length < 2) {
            return res.status(400).json('too short word');
        }

        const value = { $regex: '.*' + req.body.search + '.*' };
        const result = await Category_items.find({$or: [{'name.en': value}, {'name.ru': value}, {'name.am': value}]});

        res.status(200).json(result);
    }

}
;