import { useState } from "react";
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form';
import * as yup from "yup"; 
import { yupResolver } from "@hookform/resolvers/yup";
import SuccessToastMessage from "../components/SuccessToastMessage";


function AddRecipe() {
    const [showSuccessToastMsg, setShowSuccessToastMsg] = useState(false);
    const [toastKey, setToastKey] = useState(0);

    const schema = yup.object().shape({
        recipeName: yup.string().required(),
        prepTime: yup.number().positive().required(),
        rating: yup.number().positive().required(),
        difficulty: yup.string().required()
    })

    const {register, handleSubmit, reset} = useForm({
        resolver: yupResolver(schema)
    });

    const addRecipe = (data) => {
        fetch('https://dummyjson.com/recipes/add', {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: data.recipeName,
                prepTimeMinutes: data.prepTime,
                rating: data.rating,
                difficulty: data.difficulty
            })
        })
        .then(response => response.json())
        .then((recipe) => {
            setShowSuccessToastMsg(true);
            setToastKey(prevKey => prevKey + 1);
            console.log(`Data Successfully added: ${recipe}`);
            reset();
        })
    }
    
    return (
        <div>
            <div className="text-4xl text-white bg-black rounded-2xl font-semibold text-center mx-auto my-2 w-[50%]">
                Add Recipe
            </div>
                <form onSubmit={handleSubmit(addRecipe)}>
                    <div className="grid grid-cols-2 items-center justify-center gap-3 mt-3">

                        <label className="text-xl text-right">Recipe Name: </label>
                        <input type="text" className="rounded sm:w-[50%] bg-gray-100 text-xl" placeholder="Enter here" required {...register("recipeName")}/>

                        <label className="text-xl text-right">Prep Time/mins:</label>
                        <input type="number" className="rounded sm:w-[50%] bg-gray-100 text-xl" min="0" step="0.1" placeholder="0" required {...register("prepTime")}/>

                        <label className="text-xl text-right">Rating: </label>
                        <input type="number" className="rounded sm:w-[50%] bg-gray-100 text-xl" min="0" max="5" step="0.1" placeholder="0" required {...register("rating")}/>

                        <label className="text-xl text-right">Difficulty: </label>
                        <select className="rounded sm:w-[50%] bg-gray-100 text-xl" {...register("difficulty")}>
                            <option value="easy" defaultValue>Easy</option>
                            <option value="medium">Medium</option>
                            <option value="difficult">Difficult</option>
                        </select>

                    </div>
                    <div className="flex items-center justify-center gap-x-3 mt-6">
                        <button className="w-30 bg-red-500 text-xl text-white py-1 px-2 rounded-xl hover:bg-black shadow-md">
                            <Link to={"/"}>Cancel</Link>
                        </button>
                        <button type="submit" className="w-30 bg-green-500 text-xl text-white py-1 px-2 rounded-xl hover:bg-black shadow-md" >
                            Add
                        </button>
                    </div> 
                </form>
                
                {showSuccessToastMsg && 
                <SuccessToastMessage message="Recipe successfully added!" key={toastKey} onClose={() => setShowSuccessToastMsg(false)}/> }

        </div>
    )
}

export default AddRecipe