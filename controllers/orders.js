const orderModel = require('../models/orders')

const getAllOrders = async (req, res)=> {
try {
    const orderList = await orderModel.find()
    if (!orderList) {
      return res.status(404).send({ sucess: false, message: "no order found" });
    }
    return res.status(200).send(orderList);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error,
    });
  }

} 

// create an order
const createOrder = async (req, res)=> {
    try {

        // create the orders
        let order = new orderModel({
    
        });
    
        
      } catch (error) {
        res.status(500).send({ success: false, error });
      }
    };
    






