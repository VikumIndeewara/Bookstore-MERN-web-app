import React,{ useEffect,useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowBook = () => {
  const [book,setBook]=useState([]);
  const [loading,setLoading]=useState(false);
  const { id } = useParams(); 
  useEffect(()=>{
    setLoading(true);
    axios
    .get(`http://localhost:5555/book/${id}`)
    .then((res)=>{
      setBook(res.data);
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
    });
  },[id]);
  return (

    <div className='p-4'>
      <div className='flex flex-col'>
        <BackButton className='mr-10'/>
        <div className='flex justify-center items-center'>
          <h1 className='text-3xl my-8'>Book Details</h1>
        </div>        
      </div>
      {loading ? (
        <Spinner/>
      ):(
        <div className='flex justify-center items-center'>
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-grey-500'>ID</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className='text-xl mr-4 text-grey-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className='text-xl mr-4 text-grey-500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className='text-xl mr-4 text-grey-500'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
        </div>
        </div>
      )};
    </div>
    
  )
}

export default ShowBook