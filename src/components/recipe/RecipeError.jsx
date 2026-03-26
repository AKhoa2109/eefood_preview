import { AlertTriangle, RefreshCw } from "lucide-react";

export default function RecipeError({ message, onRetry }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-6">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-3xl bg-rose-100 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle size={28} className="text-rose-500" />
        </div>
        <h2
          className="text-xl font-black text-stone-900 mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Không tải được công thức
        </h2>
        <p className="text-stone-500 text-sm mb-6">
          {message || "Đã có lỗi xảy ra, vui lòng thử lại."}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-700 text-white font-semibold px-6 py-3 rounded-2xl transition-colors"
          >
            <RefreshCw size={16} />
            Thử lại
          </button>
        )}
      </div>
    </div>
  );
}
