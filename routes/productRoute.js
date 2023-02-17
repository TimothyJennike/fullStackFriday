const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
    try{
        con.query("SELECT * FROM product", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.get('/:id', (req, res) => {
    try{
        con.query(`SELECT * FROM product WHERE product_id=${req.params.id}`, (err, result)=>{
            if(err) throw err;
            res.send(result);
        });
    } catch(error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.post('/', (req, res)=> {
    try{
        con.query(`INSERT INTO product (product_name, product_price)VALUES('${req.body.product_name}', '${req.body.product_price}')`, (err, res) =>{
            if(err){
                console.log(err);
                return;
            }
            console.log("Created Product: ", {id:res.insertId, ...req.body});
        });
        res.status(200).send({
            message: "Added to Product"
        })
    } catch(error){
        console.log(error);
        res.status(400).send(error)
    }
});

router.put('/:id', (req, res)=> {
    try {
          con.query("UPDATE product SET product_name = ?, product_price = ? WHERE product_id = ?", [req.body.product_name, req.body.product_price, req.params.id], (err, res) =>{
            if(err){
                console.log(err);
                return;
            }
            console.log("Product is Updated: ", {id:req.params.id,});
          })
          res.status(200).send({
            message: "Product is Updated"
          })
    } catch(error){
        console.log(error);
        res.status(400).send(error)
    }
});

router.delete('/:id', (req, res) =>{
    try{
        con.query("DELETE FROM product WHERE product_id = ?", req.params.id, (err, res) =>{
            if(err){
                console.log(err);
                return;
            }
            if(res.affectedRows == 0) {
                console.log("Product has not been found");
                return;
            }
            console.log("Deleted product with id:", req.params.id);
        })
        res.status(200).send({
            message: "Product has been Deleted"
        })
    } catch(error){
        console.log(error);
        res.status(400).send(error)
    }
});


module.exports = router;