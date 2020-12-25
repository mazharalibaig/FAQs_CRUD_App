const express = require('express');
const router = express.Router();
const monk = require('monk');

const db = monk(process.env.MONGO_URI);
const faqs = db.get('faqs');
const joi = require('@hapi/joi');
const schema = joi.object({

    question: joi.string().trim().required(),
    answer: joi.string().trim().required(),
    video_url: joi.string().uri()

});

//READ ALL
router.get('/', async (req,res,next) => {

    try {
        
        const items = await faqs.find({});

        res.json(items);

    } catch (error) {
        
        next(error);

    }

});

//READ ONE
router.get('/:id', async (req,res,next) => {

    try {

        console.log(req.params);

        const {id} = req.params;

        const items = await faqs.findOne({
            _id: id
        });

        if(!items) return next();

        return res.json(items); 

    } catch (error) {
        
        next(error);

    }

});

//Create One
router.post('/', async (req,res,next) => {

    try {
        
        console.log(req.body);

        const value = await schema.validateAsync(req.body); 
        const inserted = await faqs.insert(value);

        res.json(value);

    } catch (error) {   
        
        next(error);

    }

});

//Update One
router.put('/:id', async (req,res,next) => {


});

//Delete One
router.delete('/:id', (req,res,next) => {

    res.json({
        message: "Hey Delete One!"
    });

});

module.exports = router;