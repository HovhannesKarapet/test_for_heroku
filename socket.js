module.exports = (io) => {
    io.on('connection', socket => {
        socket.on('order', order => {
            io.emit('new_order', order)
        });

        socket.on('want_bill', login => {
            console.log(`login: ${login}`);
            io.emit('bill', login)
        });

        socket.on('call_waiter', login => {
            io.emit('waiter', login);
        });

        socket.on('disconnect', (id) => {
            console.log('disconnect');
        });
    })
};