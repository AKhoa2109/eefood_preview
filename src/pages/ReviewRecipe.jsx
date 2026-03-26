import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeError from "../components/recipe/RecipeError";
import RecipeFooter from "../components/recipe/RecipeFooter";
import RecipeHero from "../components/recipe/RecipeHero";
import RecipeIngredients from "../components/recipe/RecipeIngredients";
import RecipeSkeleton from "../components/recipe/RecipeSkeleton";
import RecipeSteps from "../components/recipe/RecipeSteps";
import { getRecipeDetail } from "../services/recipeService";

export default function ReviewRecipe() {
  const { recipeId } = useParams(); // lấy :recipeId từ route /posts/:recipeId
  const hasRecipeId = Boolean(recipeId);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    loadRecipe();
  }, [recipeId]); // re-fetch nếu ID thay đổi

  const loadRecipe = async () => {
    setLoading(true);
    setError(null);

    try {
      if (hasRecipeId) {
        const data = await getRecipeDetail(recipeId);
        setRecipe(data);
        updateMetaAndTitle(data);

        // Auto deep-link redirect sau 1.5s
        setIsRedirecting(true);
        setTimeout(() => {
          window.location.href = `eefood://eefood.app/recipes/${recipeId}`;
          // Nếu sau 3s không redirect được (chưa cài app), tắt spinner
          setTimeout(() => setIsRedirecting(false), 3000);
        }, 1500);
      } else {
        updateFallbackMeta();
        setLoading(false);
      }
    } catch (err) {
      updateFromUrlParams();
      setError(err?.message || "Không tìm thấy công thức");
      setLoading(false);
    }
  };

  /* ─── Meta helpers ─── */

  const updateMetaAndTitle = (data) => {
    const title = data.title ?? "EEFood - Khám phá ẩm thực";
    const desc = data.description ?? "Khám phá các món ăn hấp dẫn trên EEFood";
    const img =
      data.imageUrl ??
      "https://fohlafood.vn/cdn/shop/articles/bun-bo-hue.jpg?v=1709633070";
    setMetaTags(title, desc, img);
    setLoading(false);
  };

  const updateFromUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    const title = decodeURIComponent(
      params.get("title") || "EEFood - Khám phá ẩm thực",
    );
    const desc = decodeURIComponent(
      params.get("desc") || "Khám phá các món ăn hấp dẫn trên EEFood",
    );
    const img = decodeURIComponent(
      params.get("img") ||
        "https://fohlafood.vn/cdn/shop/articles/bun-bo-hue.jpg?v=1709633070",
    );
    setMetaTags(title, desc, img);
  };

  const updateFallbackMeta = () => {
    setMetaTags(
      "EEFood - Khám phá ẩm thực Việt Nam",
      "Khám phá hàng nghìn công thức món ăn hấp dẫn trên EEFood",
      "https://fohlafood.vn/cdn/shop/articles/bun-bo-hue.jpg?v=1709633070",
    );
  };

  const setMetaTags = (title, desc, img) => {
    document.title = title;
    const tags = [
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:image", content: img },
      { property: "og:url", content: window.location.href },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: img },
      { name: "description", content: desc },
    ];
    tags.forEach(({ property, name, content }) => {
      const selector = property
        ? `meta[property="${property}"]`
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        if (property) meta.setAttribute("property", property);
        if (name) meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    });
  };

  /* ─── Deep link handler ─── */

  const handleOpenApp = () => {
    if (hasRecipeId) {
      window.location.href = `eefood://eefood.app/posts/${recipeId}`;
    }
  };

  /* ─── Render ─── */

  if (loading) return <RecipeSkeleton />;
  if (error) return <RecipeError message={error} onRetry={loadRecipe} />;
  if (!recipe) return null;

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <RecipeHero
        recipe={recipe}
        onOpenApp={handleOpenApp}
        isRedirecting={isRedirecting}
      />

      <div className="flex items-center gap-4 max-w-4xl mx-auto px-6 md:px-12 pt-10">
        <div className="h-px flex-1 bg-stone-200" />
        <span className="text-xs text-stone-400 uppercase tracking-widest font-semibold">
          Chi tiết công thức
        </span>
        <div className="h-px flex-1 bg-stone-200" />
      </div>

      <RecipeIngredients ingredients={recipe.ingredients ?? []} />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="h-px bg-stone-200" />
      </div>

      <RecipeSteps steps={recipe.steps ?? []} />

      <RecipeFooter onOpenApp={handleOpenApp} isRedirecting={isRedirecting} />
    </div>
  );
}
