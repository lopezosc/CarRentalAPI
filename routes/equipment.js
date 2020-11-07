var express = require('express');
var router = express.Router();
const pool = require('../db');
const db = require('../db2');
const equip = require('../models/equipment');


/* GET users listing. */
router.get('/', async(req, res, next) =>{
  
  const newRecord = await equip.create({ make:'Ford', model:'Falcon'});
  console.log(newRecord);

   try{
    equip.findAll()
      .then(results => {
        console.log('good!');
        res.json(results)
      });

    const items = await pool.query("SELECT * FROM EQUIPMENT");
    //res.json(items.rows);
     
   }catch(err){
      console.error(err.message);
   }
});


// GET EQUIPMENT BY ID
router.get('/:id', async(req, res)=>{
    try{
      console.log(req.params);
      const item = await pool.query("SELECT * FROM EQUIPMENT WHERE ID = $1 ", [req.params.id])
      res.json(item.rows);
    }catch(err){

    }
});

//INSERT RECORD
router.post('/', async(req,res)=>{
  try{
    //POST WITH SEQUELIZER
    const newitem = await equip.create( {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year ,
        Tag: req.body.tag,
        Avail: req.body.avail
    });
    res.json(newitem);
    return;
     const newEquipment = await pool.query("INSERT INTO EQUIPMENT(MAKE, MODEL) VALUES($1,$2) RETURNING * ",
      [req.body.make, req.body.model])
     res.json(newEquipment.rows[0])
     console.log("done inserting record");
  }catch(err){
    console.log(err.message);
  }
});


//UPDATE RECORD
router.put('/:id', async(req, res)=>{

  equip.update(
    { make: req.body.make },
    { where: { id: req.params.id } }
  )
    .then(result =>{
      res.json("done!");
    }
      //handleResult(result)
    )
    .error(err =>{}
     // handleError(err)
    )
    res.json('Updated!');

    
  
});


// DELETE RECORD
router.delete('/:id', async(req, res)=>{
  equip.destroy({
    where: {
        id: req.params.id
    }
})
.then(function (deletedRecord) {
    if(deletedRecord === 1){
        res.status(200).json({message:"Deleted successfully"});          
    }
    else
    {
        res.status(404).json({message:"record not found"})
    }
})
.catch(function (error){
    res.status(500).json(error);
});
  
  
  
});

module.exports = router;



