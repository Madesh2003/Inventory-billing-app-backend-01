const Invoice = require('../Models/invoicemodel')

function create_invoice(req, res){
    try {
      const newInvoice = new Invoice(req.body);
      newInvoice.save();
      res.status(201).json(newInvoice);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  
function view_invoice(req,res){
    Invoice.find()
    .then((response) => {
        if(response.length > 0){
            return res.status(200).json(response);
        } else {
            return res.status(200).json({
                success: true,
                message: "No products found",
                data: []
            });
        }
    })
    .catch((error) =>
      res.status(500).json({
        success: false,
        error: error,
      })
    );
  }


  module.exports = {
    create_invoice,
    view_invoice
  }
  