
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceInfo: {
        type: Object,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },


});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
