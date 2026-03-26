import { ShoppingBasket } from "lucide-react";

export default function RecipeIngredients({ ingredients = [] }) {
  if (!ingredients.length) return null;

  return (
    <section className="py-14 px-6 md:px-12 max-w-4xl mx-auto">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-orange-100 text-orange-600">
          <ShoppingBasket size={20} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-0.5">
            Nguyên liệu
          </p>
          <h2
            className="text-2xl font-black text-stone-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Chuẩn bị gì?
          </h2>
        </div>
        <div className="ml-auto text-sm text-stone-400 font-medium">
          {ingredients.length} nguyên liệu
        </div>
      </div>

      {/* Ingredients grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ingredients.map((item, idx) => (
          <IngredientRow key={item.id ?? idx} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
}

function IngredientRow({ item, index }) {
  const { ingredient, quantity, unit } = item;

  return (
    <div
      className="group flex items-center gap-4 p-4 rounded-2xl border border-stone-100 bg-white hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-200 cursor-default"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Ingredient image or placeholder */}
      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
        {ingredient?.image ? (
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xl">${getEmoji(ingredient.name)}</div>`;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xl">
            {getEmoji(ingredient?.name)}
          </div>
        )}
      </div>

      {/* Name & description */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-stone-800 text-sm leading-tight">
          {ingredient?.name ?? "Nguyên liệu"}
        </p>
        {ingredient?.description && (
          <p className="text-xs text-stone-400 mt-0.5 truncate">
            {ingredient.description}
          </p>
        )}
      </div>

      {/* Quantity */}
      <div className="flex-shrink-0 text-right">
        <span className="inline-flex items-baseline gap-1 bg-stone-900 text-white text-xs font-bold px-3 py-1.5 rounded-full">
          <span className="text-sm">{quantity ?? ""}</span>
          {unit && <span className="text-stone-300 font-normal">{unit}</span>}
        </span>
      </div>
    </div>
  );
}

// Simple heuristic emoji mapper
function getEmoji(name = "") {
  const n = name.toLowerCase();
  if (
    n.includes("thịt") ||
    n.includes("gà") ||
    n.includes("bò") ||
    n.includes("heo")
  )
    return "🥩";
  if (n.includes("cá") || n.includes("tôm") || n.includes("mực")) return "🦐";
  if (n.includes("trứng")) return "🥚";
  if (n.includes("sữa") || n.includes("phô mai")) return "🧀";
  if (n.includes("cà chua")) return "🍅";
  if (n.includes("hành") || n.includes("tỏi")) return "🧅";
  if (n.includes("ớt")) return "🌶️";
  if (n.includes("rau") || n.includes("cải") || n.includes("xà lách"))
    return "🥬";
  if (n.includes("nấm")) return "🍄";
  if (n.includes("chanh")) return "🍋";
  if (n.includes("gừng")) return "🫚";
  if (
    n.includes("nước mắm") ||
    n.includes("muối") ||
    n.includes("đường") ||
    n.includes("dầu")
  )
    return "🫙";
  if (n.includes("bún") || n.includes("mì") || n.includes("phở")) return "🍜";
  if (n.includes("gạo") || n.includes("cơm")) return "🍚";
  return "🌿";
}
