const { create_invoice, view_invoice } = require('../Routers/InvoiceRouter');

const InvoiceRouter = require("express").Router()

InvoiceRouter.post("/invoices", create_invoice);
InvoiceRouter.get("/invoice-data", view_invoice);

module.exports = InvoiceRouter;
