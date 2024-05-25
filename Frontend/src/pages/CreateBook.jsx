import {useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateBook = () => {
  const [title,setTitle]=useState('');
  const [author,setAuthor]=useState('');
  const [publishYear,setPublishYear]=useState('');
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate=useNavigate();

  const handleSaveBook=()=>{
     if (!/^\d{4}$/.test(publishYear)) {
      setError('Please enter a valid 4-digit year.');
      return;
    }
    const book={
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
    .post('http://localhost:5555/book',book)
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
    <div className='p-4'>
      <div className='flex flex-col'>
        <BackButton className='mr-10'/>
        <div className='flex justify-center items-center'>
          <h1 className='text-3xl my-8'>Create Book</h1>
        </div>
      </div>
      {loading ? (
        <Spinner/>
      ):(
        <div className='flex justify-center items-center'>
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='my-2'>
              <label className='text-xl mr-4 text-gray-500'>Title</label>
              <input type="text" value={title} placeholder='Enter Title' onChange={(e)=>setTitle(e.target.value)} className='border-2 border-gray-300 px-2 py-2 my-2 w-full'/>
            </div>
            <div className='my-2'>
              <label className='text-xl mr-4 text-gray-500'>Author</label>
              <input type="text" value={author} placeholder='Enter Author' onChange={(e)=>setAuthor(e.target.value)} className='border-2 border-gray-300 px-2 py-2 my-2 w-full'/>
            </div>
            <div className='my-2'>
              <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
              <input type="text" value={publishYear} placeholder='Enter Publish Year' onChange={(e)=>setPublishYear(e.target.value)} className='border-2 border-gray-300 px-2 py-2 my-2 w-full'/>
              {error && <p className='text-red-500'>{error}</p>}
            </div>
            <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>Save</button>
          </div>
        </div>
      )};
    </div>

  )
}

export default CreateBook