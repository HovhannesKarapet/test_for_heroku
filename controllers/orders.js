const Orders = require('../models/Orders');

module.exports = {
    getAllOrders: async (req, res) => {
        try {
            const orders = await Orders.find();

            res.status(200).json(orders);
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    },

    makeOrder: async (req, res) => {
        try {
            // const order = await Orders.create({
            //     from: req.params.id,
            //     name: req.body.name,
            //     comment: req.body.comment,
            //     quantity: req.body.quantity,
            //     price: req.body.price,
            //     total_price: req.body.total_price,
            // });

            const io = req.app.get('io');
            const order = {
                from: req.params.id,
                name: req.body.name,
                comment: req.body.comment,
                quantity: req.body.quantity,
                price: req.body.price,
                total_price: req.body.total_price,
            };

            io.emit('order');

            res.status(201).json(order);
        } catch (e) {
            res.status(400).json('oops!')
        }
    }
};
