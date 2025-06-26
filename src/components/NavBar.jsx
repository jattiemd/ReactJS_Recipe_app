import { Link } from "react-router-dom";

function NavBar() {

    return (
      <nav className="flex justify-between px-2 sm:px-20 py-6 items-center bg-rose-200">
        <h1 className="text-xl sm:text-4xl text-gray-800 font-bold">Recipe App</h1>
        <div className="flex items-center sm:gap-4">
          <ul className="flex items-center space-x-6">
            <li className="sm:text-2xl text-center py-1 px-2 underline underline-offset-4 rounded-xl hover:bg-black hover:text-white hover:shadow-2xl">
                <Link to={"/"}>Recipes</Link>
            </li>
            <li>
              <button className="sm:text-2xl underline underline-offset-4 hover:text-white hover:bg-black py-1 px-4 rounded-xl hover:shadow-2xl">
                <Link to={"/addrecipe"}>Add recipe</Link>                
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
}

export default NavBar