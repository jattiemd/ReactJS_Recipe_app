import RecipeCard from "../components/RecipeCard";
import { fetchRecipes } from "../services/api";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";


function Home() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);    // Paginatation

    // API call
    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const recipeList = await fetchRecipes();
                setRecipes(recipeList);
            } catch (error) {
                console.log(error);
                setError("Failed to load recipes...");
            } finally {
                setLoading(false);
            }
        }
        
        loadRecipes();
    }, []); 
    
    const loadingHTML = <div className="text-center text-4xl">Getting Recipes...</div>

    // Pagination
    const recipesPerPage = 12;
    const pagesVisited = pageNumber * recipesPerPage;       // assist with correct start point for every page 

    const displayRecipes = recipes.slice(pagesVisited, pagesVisited + recipesPerPage).map(
        recipe => <RecipeCard recipe={recipe} key={recipe.id} />
    )

    const pageCount = Math.ceil(recipes.length / recipesPerPage)    // 51 / 12 = 4.25 => 5

    // Track number of current page to identify next and previous pages
    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    return (
        <div>
            {error && <p className="text-4xl text-center shad">{error}</p>}
            <div className="flex items-center justify-center mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pt-0.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input className="ml-2 outline-none rounded bg-rose-200 text-xl" type="text" placeholder="Search Recipe..." />
            </div>
            <div className="mt-6 mx-4 grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading ? loadingHTML : displayRecipes}
            </div>
                {displayRecipes && ( 
                    <ReactPaginate 
                        previousLabel={"Previous"} 
                        nextLabel={"Next"} 
                        pageCount={pageCount} 
                        onPageChange={changePage}
                        containerClassName={"list-none flex flex items-center justify-center my-10 gap-5"}                          // Pagination buttons container
                        pageLinkClassName={"cursor-pointer p-2 rounded-xl border border-black hover:bg-black hover:text-white"}     // Each button in pagination
                        activeClassName={"cursor-pointer p-2 rounded-2xl bg-black text-white "}                                      // Active pagination button
                        previousLinkClassName={"cursor-pointer p-2 bg-black text-white hover:shadow-2xl rounded-l-full"}                   // Pagination previous button
                        nextLinkClassName={"cursor-pointer p-2 bg-black text-white hover:shadow-2xl rounded-r-full"}                       // Pagination next button
                    />
                )}
        </div>
    )
}

export default Home