import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReviewRecipe from "./pages/ReviewRecipe";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/recipes/:recipeId" element={<ReviewRecipe />} />

        <Route path="*" element={<ReviewRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
