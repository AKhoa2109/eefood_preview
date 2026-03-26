import { ExternalLink, Flame } from "lucide-react";

export default function RecipeFooter({ onOpenApp, isRedirecting }) {
  return (
    <footer className="bg-stone-950 text-white py-14 px-6 md:px-12 mt-14">
      <div className="max-w-4xl mx-auto">
        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-3xl p-8 md:p-10 mb-12 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.3) 10px, rgba(255,255,255,.3) 20px)`,
            }}
          />
          <p className="text-white/80 text-sm font-medium mb-2 uppercase tracking-widest">
            EEFood App
          </p>
          <h3
            className="text-2xl md:text-3xl font-black mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Khám phá thêm hàng nghìn
            <br />
            công thức ngon mỗi ngày
          </h3>
          <button
            onClick={onOpenApp}
            disabled={isRedirecting}
            className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-bold px-7 py-3.5 rounded-2xl shadow-xl transition-all hover:scale-[1.03] disabled:opacity-60 text-sm"
          >
            <ExternalLink size={16} />
            Mở ứng dụng EEFood
          </button>
        </div>

        {/* Footer meta */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-rose-500 rounded-full flex items-center justify-center">
              <Flame size={14} className="text-white" />
            </div>
            <span className="font-bold tracking-wide">EEFood</span>
          </div>
          <p className="text-stone-500 text-sm text-center">
            © 2025 EEFood — Chia sẻ hương vị Việt
          </p>
          <p className="text-stone-600 text-xs flex items-center gap-1.5">
            Được tạo với <span className="text-rose-400">❤️</span> tại Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
