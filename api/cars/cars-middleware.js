const Cars = require('./cars-model')
const db = require('../../data/db-config')
const vin = require('vin-validator');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
 try {
   const car = await Cars.getById(req.params.id)
   if (!car){
    next({ status: 404, message: 'not found'})
   } else {
     req.car = car
     next()
   }
 } catch (err) {
   next(err)
 }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.vin) {
    return next({ status: 400, message: "vin is missing" });
  } else if (!req.body.make) {
    return next({ status: 400, message: "make is missing" });
  } else if (!req.body.model) {
    return next({ status: 400, message: "model is missing" });
  } else if (!req.body.mileage) {
    return next({ status: 400, message: "mileage is missing" });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  {
    if(vin.validate(req.body.vin)){
      next()
    }else{
      next({
        status: 400, 
        message: `vin ${req.body.vin} is invalid`
      })
    }
}
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
try{
  const existing = await Cars.getByVin(req.body.vin)
  if (!existing){
    next()
  }else{
   next({status: 400, message: `vin ${req.body.vin} already exists`})
  }
} catch (err){
  next(err)
}}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}