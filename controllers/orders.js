const orderModel = require('../models/orders')
const orderItemsmodel = require('../models/orderItems')

const getAllOrders = async (req, res)=> {
try {
    const orderList = await orderModel.find().populate('users', 'name').sort({'dateOrdered':-1}) //to sort by date from newest to oldest and populate the user also to display users name on the admin panel on the frontend
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
const placeOrder = async (req, res)=> {
    try {
//here we loop into the array of order items the user is sending from the front end
const orderItemsIds = promise.all(req.body.orderItems.map( async orderItem => {
  let newOrderItem = await orderItemsmodel({
quantity: orderItem.quantity,
product:orderItem.product
  })

  newOrderItem = await newOrderItem.save()

  return newOrderItem._id
}))
const orderItemsIdsResolved = await orderItemsIds

// calculate the totalprice of orders and let it come from the database not from the client side for security 

const totalPrices = await promise.all(orderItemsIdsResolved.map( async(orderItemId)=>{
  const orderItem = await orderItemsmodel.findById(orderItemId).populate('product', 'price')
  const totalPrice = orderItem.product.price * orderItem.quantity

  return totalPrice
}))

// to return the sum of the total prices of the order
const totalPrice = totalPrices.reduce((a,b) => a+b, 0)

        // create the orders
        let order = new orderModel({
        orderItems:orderItemsIdsResolved,
        shippingAddress1:req.body.shippingAddress1,
        shippingAddress2:req.body.shippingAddress2,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,                                           
        phone:req.body.phone,
        status:req.body.status,
        totalPrice:totalPrice,
        user:req.body.user
        
        });
    
        order = await order.save()
        return res.status(201).send({success:true, order})
      } catch (error) {
        res.status(500).send({ success: false, error });
      }
    };
    

    // to get a single order
    const getOneOrder = async (req, res)=> {
      try {
          const order = await orderModel.findById(req.params.id).populate('users', 'name')
          //this will display the product and the quantity
          .populate('orderItems')
          // this will populate the product in a way we will see the product details inside the array of orderItems
          .populate(
            {path:"orderItems", populate:'product'}
          )
          // this will populate the category inside the product object
          .populate(
            {path:"orderItems", 
              populate:{path:'product', populate:'category'}}
            )
          if (!order) {
            return res.status(404).send({ sucess: false, message: "no order found" });
          }
          return res.status(200).send(order);
        } catch (error) {
          res.status(500).json({
            sucess: false,
            error,
          });
        }
      } 


      //admin upddates order status
      const updateOrderStatus = async (req, res) => {
        try {
          const order = await orderModel.findByIdAndUpdate(
            req.params.id,
            {
              status : req.body.status
            },
            { new: true }
          );
          if (!order) {
            return res.status(404).send({
              sucess: false,
              message: "the order cannot be updated",
            });
          }
          return res.status(201).send(order);
        } catch (error) {
          res.status(500).json({
            sucess: false,
            error,
          });
        }
      };
    
    
//deleting the order
const deleteOrder = async (req, res) => {
  try {
    await orderModel
      .findByIdAndRemove(req.params.id)
      .then( async order=> {
        if (order) {
          await order.orderItemsModel.map( async orderItems => {
           await findByIdAndRemove(orderItems)
          })
          res
            .status(200)
            .json({ sucess: true, message: "order deleted successfully" });
        } else {
          return res
            .status(404)
            .json({ sucess: false, message: "order not found" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ sucess: false, err });
      });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error,
    });
  }
};

// to show to the admin panel how much total sales made in the E-shop for statistics reasons
const getTotalSales = async (req, res) => {
try{
const totalSales = await orderModel.aggregate([
  {$group:  { _id : null, totalsales : {$sum: "$totalPrice"}}}
])

if(!totalSales){
  res.status(400).send('total sales cannot be generated')
}
 res.status(200).send({totalsales : totalSales.pop().totalsales}) // this will return the last elemnt in this group array

}

  catch (error) {
    res.status(500).json({
      sucess: false,
      error,
    });
  }
}


// to show the number of orders made in the E-shop
const getOrderCount = async (req, res) => {
  try {
    const orderCount = await orderModel.countDocuments((count) => count);
    if (!orderCount) {
      return res.status(500).send({ success: false });
    }

   return res.status(200).send({
      ordercount: orderCount,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error,
    });
  }
};

// to get users orders on the client side from the database
const getUserOrders = async (req, res)=> {
  try {
      const orderList = await orderModel.find()
      .populate(
        {path:"orderItems", 
          populate:{path:'product', populate:'category'}}
        )
        .sort({'dateOrdered' : -1})
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
  
  



module.exports = {
  getAllOrders,
  getOneOrder,
  placeOrder,
  updateOrderStatus,
  deleteOrder,
  getTotalSales,
  getOrderCount,
  getUserOrders
}


