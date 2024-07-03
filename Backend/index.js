import express from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './Models/bookModel.js';
import booksRoute from './Routes/booksRoute.js';
import cors from 'cors';
import path from 'path';

const __dirname = path.resolve();

const app = express();

app.use(express.json()); //middleware for parse reques tbody

app.use(cors());//allows everything /we can specify the allowed information to user by using cors({origin:''localhost,methods:['GET','DELETE','PUT']})

app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'Frontend','dist','index.html'))
})

app.get('/',(req,res)=>{
    return res.status(234).send('Welcome');
});

app.use('/book',booksRoute);


// // save a new book
// app.post('/book',async (req,res)=>{
//     try{
//         if(!req.body.title || !req.body.author || !req.body.publishYear){
//             return response.status(400).send({
//                 message: 'Send all required fields: title, author, publishYear',
//             });
//         }
//         const newBook = {
//             title: req.body.title,
//             author: req.body.author,
//             publishYear: req.body.publishYear,

//         }
//         const book = await Book.create(newBook);
//         return res.status(201).send(book);

//     }catch(error){
//         console.log(error.message);
//         res.status(500).send({message:error.message});
//     }

// });

// //to get all the books
// app.get('/book',async(req,res)=>{
//     // console.log(req)
//     try{
//         console.log("hii");
//         const books = await Book.find({});
//         return res.status(200).json({
//             count:books.length,
//             data:books
//         });
//     }catch(err){
//         console.log(err);
//         return res.status(500).send(err.message);
//     }
// });

// //to get one book by it's ID
// app.get('/book/:id',async(req,res)=>{
//     try{
//         const { id } = req.params;//const id = req.params.id;
//         const book = await Book.findById(id);
//         return res.status(200).json(book);
//     }catch(err){
//         console.log(err);
//         return res.status(500).send(err.message);
//     }
// });

// // update a book
// app.put('/book/:id',async (req,res)=>{
//     try{
//         if(!req.body.title || !req.body.author || !req.body.publishYear){
//             return response.status(400).send({
//                 message: 'Send all required fields: title, author, publishYear',
//             });
//         }
//         const { id } = req.params;
//         const result = await Book.findByIdAndUpdate(id, req.body);
//         if(!result){
//             return res.status(400).json({message:'Book not found'});
//         }
//         return res.status(200).send({message:'Bookk updated!'});

//     }catch(error){
//         console.log(error.message);
//         res.status(500).send({message:error.message});
//     }

// });

// // delete a book
// app.delete('/book/:id',async (req,res)=>{
//     try{
//         const { id } = req.params;
//         const result = await Book.findByIdAndDelete(id);
//         if(!result){
//             return res.status(400).json({message:'Book not found'});
//         }
//         return res.status(200).send({message:'Book deleted!'});

//     }catch(error){
//         console.log(error.message);
//         res.status(500).send({message:error.message});
//     }

// });

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("Successfully connected.");
        app.listen(PORT,()=>{
            console.log(`App is runing on port: ${PORT}`);
        });
    })
    .catch((err)=>{
        console.log(err);
    });