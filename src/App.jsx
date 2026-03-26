import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecipeError from "./components/recipe/RecipeError";
import ReviewRecipe from "./pages/ReviewRecipe";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/recipes/:recipeId" element={<ReviewRecipe />} />

        <Route path="*" element={<RecipeError />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
