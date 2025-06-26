import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRecipe } from "../services/api";
import AccordianHolder from "../components/AccordianHolder";
import RecipeInfoCard from "../components/AdditionalRecipeInfoCard";
import DeleteModal from "../components/DeleteModal";
import { deleteRecipe } from "../services/api";
import SuccessToastMessage from "../components/SuccessToastMessage";

function SingleRecipe() {
    const params = useParams();         // Gets parameter setup in <Route path=""/> 
    const [recipe, setRecipe] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [showSuccessToastMsg, setShowSuccessToastMsg] = useState(false);
    const [toastKey, setToastKey] = useState(0);

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                const getRecipe = await fetchRecipe(params.recipeID);
                setRecipe(getRecipe);
            } catch (error) {
                console.log(error);
                setError("Failed to load Recipe");
            } finally {
                setLoading(false);
            }
        }
        
        loadRecipe();
    }, [params.recipeID]);      // Monitoring for any changes to recipeID 

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
    
    const loadingHTML = <div className="text-center text-4xl">Getting Recipe...</div>
    const recipeHTML = recipe && ( <>
        <div className="grid grid-cols-1 sm:grid-cols-2 p-2 mt-6 gap-3">
            <div>
                <img src={recipe.image} className="mt-10 contain rounded-xl shadow-2xl h-120 w-120 mx-auto border border-gray-300" alt={recipe.name}/>
            </div>
            <div>
                <h1 className="text-4xl text-center underline">{recipe.name}</h1>
                
                {/* Accordian Helper Function */}
                <AccordianHolder title={"Ingredients"} listName={recipe.ingredients} />
                <AccordianHolder title={"Instructions"} listName={recipe.instructions} />
                <AccordianHolder title={"Meal Tags"} listName={recipe.tags} />
                <AccordianHolder title={"Meal Type"} listName={recipe.mealType} />

                {/* Additional Recipe Info */}
                <div className="mt-4 grid grid-cols-4 gap-2 gap-y-4 text-center">
                    <RecipeInfoCard title={"Calories"} recipeData={recipe.caloriesPerServing} imgSrc={"https://img.icons8.com/ios-filled/50/caloric-energy--v1.png"} imgAlt={"caloric-energy--v1"} />
                    <RecipeInfoCard title={"Cook Time"} recipeData={<span>{recipe.cookTimeMinutes}<small>/mins</small></span>} imgSrc={"https://img.icons8.com/ios-filled/50/time_2.png"} imgAlt={"time_2"} />
                    <RecipeInfoCard title={"Cuisine"} recipeData={recipe.cuisine} imgSrc={"https://img.icons8.com/ios-filled/50/chef-hat.png"} imgAlt={"chef-hat"} />
                    <RecipeInfoCard title={"Difficulty"} recipeData={recipe.difficulty} imgSrc={"https://img.icons8.com/sf-black-filled/64/rubiks-cube.png"} imgAlt={"rubiks-cube"} />
                    <RecipeInfoCard title={"rating"} recipeData={<span>{recipe.rating}<small>/5</small></span>} imgSrc={"https://img.icons8.com/ios-filled/50/rating.png"} imgAlt={"rating"} />
                    <RecipeInfoCard title={"Prep Time"} recipeData={<span>{recipe.prepTimeMinutes}<small>/mins</small></span>} imgSrc={"https://img.icons8.com/ios-filled/50/time_2.png"} imgAlt={"time_2"} />
                    <RecipeInfoCard title={"Reviews"} recipeData={recipe.reviewCount} imgSrc={"https://img.icons8.com/ios-filled/50/thumbs-up-down.png"} imgAlt={"thumbs-up-down"} />
                    <RecipeInfoCard title={"Servings"} recipeData={recipe.servings} imgSrc={"https://img.icons8.com/windows/50/group-foreground-selected.png"} imgAlt={"user-group-man-woman"} />
                </div>
            </div>
        </div>
    </>)
    
    
    return (
        <>
        {error && <div>{error}</div>}

        {loading ? loadingHTML : recipeHTML}

        <div className=" flex justify-center items-center gap-3 my-3">
            <button onClick={() => setOpenDeleteModal(true)} className="bg-red-500 text-xl text-white py-1 px-2 rounded-xl hover:bg-black">
                    Delete
            </button>
            <button className="bg-gray-500 text-xl text-white py-1 px-4 rounded-xl hover:bg-black">
                Edit
            </button>
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

export default SingleRecipe