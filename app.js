const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const productSchema = require('./model/user')
const cartSchema = require("./model/cart.js")
app.use(express.json());
require("./database/database.js").connect();

app.use(bodyParser.json())

// Add product

app.post("/addProduct", async (req, res) => {
  const { productName,
    description,
    quantity, unitPrice } = req.body;
  try {
    if (productName &&
      description &&
      quantity &&
      unitPrice) {
      const newUser = productSchema({
        productName,
        description,
        quantity,
        unitPrice
      });
      const saved_User = await newUser.save();
      if (saved_User) {
        return res.status(201).json(saved_User);
      } else {
        return res.status(400).json({ "message": "something wrong!" });
      }
    } else {
      return res.status(400).json({ "message": "all fields are required" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
})




// "List products"

app.get('/products', async (req, res) => {
  try {
    const data = await productSchema.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
})


// ADD TO CART


app.post("/cart/:id", async (req, res) => {

  try {
    const user = await productSchema.findById(req.params.id);
    
    const cartId = await cartSchema.find();
  
    const { _id } = user;
    // const {_id,quantity}= cartId._id;
    console.log(req.params.id);
    // console.log(cartId)

    const productIDs = cartId.filter(({ productID }) => ( _id === productID ));

    const checkID = productIDs._id;

    console.log(productIDs[0].quantity);
    // const view = await Video.findByIdAndUpdate(req.params.id, {
    //   $inc: { views: 1 },
    // });
    
    if(checkID) {
      const see = await cartSchema.findByIdAndUpdate(checkID, {
              $inc: {quantity: 1},
        })
        res.json(see);
    } else {
      const newUser = cartSchema({
                productID: _id,
      
              });
              const saved_User = await newUser.save();
              if (saved_User) {
                return res.status(201).json(saved_User);
              } else {
                return res.status(400).json({ "message": "something wrong!" });
              }
    }

    // console.log(productIDs);

  //   try {
  //     if (_id) {
  //       if(checkID) {
  //         const see = await cartSchema.findByIdAndUpdate(checkID, {
  //           $inc: {quantity: 1},
  //         })
  //       } else {

        
  //       const newUser = cartSchema({

  //         productID: _id,

  //       });
  //       const saved_User = await newUser.save();
  //       if (saved_User) {
  //         return res.status(201).json(saved_User);
  //       } else {
  //         return res.status(400).json({ "message": "something wrong!" });
  //       }
  //       }
  //     }
  //      else {
  //       return res.status(400).json({ "message": "ID not found" });
  //     }
      
  //   } catch (error) {
  //     return res.status(400).json(error);
  //   }
  } catch (err) {
    console.log(err);
  }
});


/// UPDATE CART 


app.patch("/updateCart/:id", async (req, res) => {

  try {

    const user = await productSchema.findById(req.params.id);
    const Quantity = req.body.quantity;
    const cartID = req.params.id;

    try {
      if (cartID) {

        cartSchema.updateOne({ _id: cartID }, { quantity: Quantity }, (error) => {
          if (error) {
            return res.status(500).json({ error: 'Error updating cart item' });
          }

          // Return a success response
          res.json({ message: 'Cart item updated successfully' });

        })
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  } catch (err) {
    console.log(err);
  }


})



// SHOW ALL CART ITEMS

app.get('/getCart', async (req, res) => {
  try {
    const data = await cartSchema.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
})


// Server running status 


app.listen(3200, () => {
  console.log(`Server is running on ${3200}`);
})