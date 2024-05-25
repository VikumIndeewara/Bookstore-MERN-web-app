import express from 'express';

import { Book } from '../Models/bookModel.js';


const router = express.Router();
// save a new book
router.post('/',async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,

        }
        const book = await Book.create(newBook);
        return res.status(201).send(book);

    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }

});

//to get all the books
router.get('/',async(req,res)=>{
    // console.log(req)
    try{

        const books = await Book.find({});
        return res.status(200).json({
            count:books.length,
            data:books
        });
    }catch(err){
        console.log(err);
        return res.status(500).send(err.message);
    }
});

//to get one book by it's ID
router.get('/:id',async(req,res)=>{
    try{
        const { id } = req.params;//const id = req.params.id;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    }catch(err){
        console.log(err);
        return res.status(500).send(err.message);
    }
});

// update a book
router.put('/:id',async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(400).json({message:'Book not found'});
        }
        return res.status(200).send({message:'Bookk updated!'});

    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }

});

// delete a book
router.delete('/:id',async (req,res)=>{
    try{
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(400).json({message:'Book not found'});
        }
        return res.status(200).send({message:'Book deleted!'});

    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }

});

export default router;