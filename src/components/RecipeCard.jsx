import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { deleteRecipe } from "../services/api";
import SuccessToastMessage from "./SuccessToastMessage";

function RecipeCard({recipe}) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [showSuccessToastMsg, setShowSuccessToastMsg] = useState(false);
    const [toastKey, setToastKey] = useState(0);

    const handleDelete = () => {
        try {
            deleteRecipe(recipe.id).then(data => {
                if (data.isDeleted) {
                    setOpenDeleteModal(false);
                    setShowSuccessToastMsg(true);
                    setToastKey(prevKey => prevKey + 1);
                    console.log(`Data Successfully deleted`);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
   
    return (
        <>
            <div className="p-2 border border-gray-300 hover:bg-white hover:border hover:border-gray-300 hover:shadow-xl hover:rounded-xl transition duration-300 hover:scale-101">
                <img src={recipe.image} alt={recipe.name} className="w-60 h-60 mx-auto rounded-2xl border border-gray-300"></img>
                <h1 className="text-center font-semibold text-xl my-2">{recipe.name}</h1>
                <h1 className="text-center my-2">Rating: {recipe.rating}/5</h1>
                <div className="flex items-center justify-center gap-3 my-3">
                    <button onClick={() => setOpenDeleteModal(true)} className="bg-red-500 text-xl text-white py-1 px-2 rounded-xl hover:bg-black">
                        Delete
                    </button>
                    <button className="bg-blue-500 text-xl text-white py-1 px-3 rounded-xl hover:bg-black">
                        <Link to={`/singlerecipe/${recipe.id}`}>View</Link>
                    </button>
                </div>
            </div>            
            
            <DeleteModal openModal={openDeleteModal} closeModal={() => setOpenDeleteModal(false)}>
                <img className="mx-auto" width="50" height="50" src="https://img.icons8.com/fluency-systems-filled/48/filled-trash.png" alt="filled-trash"/>
                <div className="text-center mx-auto w-48 my-4">
                    <h3 className="text-xl font-black text-gray-800">Confirm Delete</h3>
                    <p className="text-gray-600">Are you sure you want to delete this recipe?</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={handleDelete} className="shadow rounded-xl text-lg bg-red-300 hover:bg-red-600 hover:text-white w-full">Delete</button>
                    <button onClick={() => setOpenDeleteModal(false)} className="shadow rounded-xl text-lg bg-white hover:bg-blue-500 hover:text-white w-full">Cancel</button>
                </div>
            </DeleteModal>

            {showSuccessToastMsg && <SuccessToastMessage message="Recipe successfully Deleted!" key={toastKey} onClose={() => setShowSuccessToastMsg(false)} />}
        </>
    )
}

export default RecipeCard