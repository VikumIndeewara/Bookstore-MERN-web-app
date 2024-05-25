import {useEffect,useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai';

const UpdateBook = () => {
  const { id } = useParams();
  const [title,setTitle]=useState('');
  const [author,setAuthor]=useState('');
  const [publishYear,setPublishYear]=useState('');
  const [loading,setLoading]=useState(false);
  const [editTitle,setEditTitle]=useState(false);
  const [editAuthor,setEditAuthor]=useState(false);
  const [editPublishYear,setEditPublishYear]=useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    setLoading(true);
    axios
    .get(`http://localhost:5555/book/${id}`)
    .then((res)=>{
      setTitle(res.data.title);
      setAuthor(res.data.author);
      setPublishYear(res.data.publishYear);
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
    });
  },[id]);

  const changeEditTitle = () =>{
    setEditTitle(true);
  }
  const changeEditAuthor = () =>{
    setEditAuthor(true);
  }
  const changeEditYear =() =>{
    setEditPublishYear(true);
  }

  const handleUpdateBook = ()=>{
    const book = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
    .put(`http://localhost:5555/book/${id}`,book)
    .then(()=>{
      setLoading(false);
      navigate('/');
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
    })
  }

  return (
    <div className='p4'>
      <div className='flex flex-col'>
        <BackButton className='mr-10'/>
        <div className='flex justify-center items-center'>
          <h1 className='text-3xl my-8'>Edit Book Details</h1>
        </div>
      </div>
      {loading ? (
        <Spinner/>
      ):(
        <div className='flex justify-center items-center'>
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4'>
            <div className='my-4'>
              {editTitle ? (
                <div className='my-2'>
                  <label className='text-xl mr-4 text-gray-500'>Title</label>
                  <input type="text" value={title} placeholder='Enter Title' onChange={(e)=>setTitle(e.target.value)} className='border-2 border-gray-300 px-2 py-2 my-2 w-full'/>
                </div>
              ):(
                <div className='my-2'>
                  <span className='text-xl mr-4 text-gray-500'>Title</span>
                  <span>{title}</span>
                  <button className='mx-20' onClick={changeEditTitle}><AiOutlineEdit className='text-2xl text-yellow-600'/></button>
                </div>
                )}
            </div>
            {editAuthor ? (
              <div className='my-2'>
                <label className='text-xl mr-4 text-gray-500'>Author</label>
                <input type="text" value={author} placeholder='Enter Author' onChange={(e)=>setAuthor(e.target.value)} className='border-2 border-gray-300 px-2 py-2 my-2 w-full'/>
              </div>
            ):(
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Author</span>
                <span>{author}</span>
                <button className='mx-20' onClick={changeEditAuthor}><AiOutlineEdit className='text-2xl text-yellow-600'/></button>
              </div>
              )}
            {editPublishYear ? (
              <div className='my-2'>
                <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                <input type="text" value={publishYear} placeholder='Enter Publish Year' onChange={(e)=>setPublishYear(e.target.value)} className='border-2 border-gray-300 px-2 py-2 my-2 w-full'/>
              </div>
            ):(
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                <span>{publishYear}</span>
                <button className='mx-20' onClick={changeEditYear}><AiOutlineEdit className='text-2xl text-yellow-600'/></button>
              </div>
            )}
            <button className='p-2 bg-sky-300 m-8' onClick={handleUpdateBook}>Save</button>
          </div>
        </div>
      )};
    </div>
  )
}

export default UpdateBook