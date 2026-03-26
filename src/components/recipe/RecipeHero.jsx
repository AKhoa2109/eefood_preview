import { ChefHat, Clock, ExternalLink, Flame, MapPin } from "lucide-react";
import { difficultyMap, formatTotalTime } from "../../services/recipeService";

export default function RecipeHero({ recipe, onOpenApp, isRedirecting }) {
  const diff = difficultyMap[recipe.difficulty] ?? difficultyMap.EASY;
  const totalTime = formatTotalTime(recipe.prepTime, recipe.cookTime);

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover scale-105 transition-transform duration-[2000ms]"
          style={{ transformOrigin: "center" }}
          onError={(e) => {
            e.target.src =
              "https://fohlafood.vn/cdn/shop/articles/bun-bo-hue.jpg?v=1709633070";
          }}
        />
        {/* Layered gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 to-transparent" />
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 pt-8 z-10">
        {/* Logo */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
          <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-rose-500 rounded-full flex items-center justify-center">
            <Flame size={14} className="text-white" />
          </div>
          <span className="text-white font-bold tracking-wide text-sm">
            EEFood
          </span>
        </div>

        {/* Region badge */}
        {recipe.region && (
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 rounded-full">
            <MapPin size={13} className="text-orange-300" />
            <span className="text-white/90 text-xs font-medium">
              {recipe.region}
            </span>
          </div>
        )}
      </div>

      {/* Hero content */}
      <div className="relative z-10 px-6 pb-10 md:px-12 md:pb-14 max-w-4xl">
        {/* Categories */}
        {recipe.categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {recipe.categories.map((cat) => (
              <span
                key={cat.id}
                className="flex items-center gap-1.5 bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 text-orange-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider"
              >
                {cat.iconUrl && (
                  <img
                    src={cat.iconUrl}
                    alt=""
                    className="w-3.5 h-3.5 object-contain"
                  />
                )}
                {cat.description}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1
          className="text-4xl md:text-6xl font-black text-white leading-[1.05] mb-4 tracking-tight"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            textShadow: "0 4px 40px rgba(0,0,0,0.4)",
          }}
        >
          {recipe.title}
        </h1>

        {/* Description */}
        {recipe.description && (
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-xl font-light">
            {recipe.description}
          </p>
        )}

        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <StatPill
            icon={<Clock size={15} />}
            label="Chuẩn bị"
            value={`${recipe.prepTime ?? 0} phút`}
          />
          <StatPill
            icon={<Flame size={15} />}
            label="Nấu"
            value={`${recipe.cookTime ?? 0} phút`}
          />
          <StatPill
            icon={<Clock size={15} />}
            label="Tổng thời gian"
            value={totalTime}
            accent
          />
          {recipe.difficulty && (
            <span
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-semibold backdrop-blur-sm ${diff.bg} ${diff.border} ${diff.color}`}
            >
              <span className={`w-2 h-2 rounded-full ${diff.dot}`} />
              <ChefHat size={14} />
              {diff.label}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={onOpenApp}
          disabled={isRedirecting}
          className="group flex items-center gap-3 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 disabled:opacity-60 text-white font-bold px-7 py-4 rounded-2xl shadow-2xl shadow-orange-900/40 transition-all duration-300 hover:scale-[1.03] hover:shadow-orange-800/50 text-sm"
        >
          {isRedirecting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Đang chuyển hướng...
            </>
          ) : (
            <>
              <ExternalLink size={17} />
              Xem trong ứng dụng
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </>
          )}
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col items-center gap-1 opacity-60">
        <span className="text-white/60 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

function StatPill({ icon, label, value, accent }) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-sm text-sm font-medium ${
        accent
          ? "bg-orange-500/90 border-orange-400 text-white shadow-lg shadow-orange-900/30"
          : "bg-white/10 border-white/20 text-white/90"
      }`}
    >
      <span className={accent ? "text-orange-100" : "text-orange-300"}>
        {icon}
      </span>
      <span className="text-xs opacity-70">{label}:</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
