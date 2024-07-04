import { BsArrowLeft } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

const BackButton = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="flex">
      <button 
        onClick={handleBackClick} 
        className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit flex items-center"
      >
        <BsArrowLeft className="text-2xl" />
        Back
      </button>
    </div>
  )
}

export default BackButton