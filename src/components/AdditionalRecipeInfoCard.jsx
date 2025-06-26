import { useState } from "react"

function RecipeInfoCard({imgSrc, imgAlt, title, recipeData}) {

    return (
        <div>
            <div className="bg-rose-400 p-2 border border-black rounded-xl pb-8 sm:pb-2">
                <img className="flex mx-auto" width="40" height="40" src={imgSrc} alt={imgAlt}/>
                <p className="text-white">{title}</p>
            </div>
            <span className="rounded-xl bg-stone-600 text-white py-1 px-4">{recipeData}</span>
        </div>
    )
}

export default RecipeInfoCard