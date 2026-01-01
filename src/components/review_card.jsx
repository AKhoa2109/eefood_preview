import React, { useEffect, useState } from "react";
import { Share2, ExternalLink, ArrowRight } from "lucide-react";

export default function EEFoodPreview() {
  const [postData, setPostData] = useState({
    title: "EEFood - Khám phá ẩm thực",
    desc: "Khám phá các món ăn hấp dẫn trên EEFood",
    img: "https://fohlafood.vn/cdn/shop/articles/bun-bo-hue.jpg?v=1709633070",
    recipeId: null,
  });
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const pathSegments = window.location.pathname.split("/");
    const recipeId = pathSegments[pathSegments.length - 1];

    const title = decodeURIComponent(
      urlParams.get("title") || "EEFood - Khám phá ẩm thực"
    );
    const desc = decodeURIComponent(
      urlParams.get("desc") || "Khám phá các món ăn hấp dẫn trên EEFood"
    );
    const img = decodeURIComponent(
      urlParams.get("img") ||
        "https://fohlafood.vn/cdn/shop/articles/bun-bo-hue.jpg?v=1709633070"
    );

    setPostData({ title, desc, img, recipeId });

    // Update meta tags
    document.title = title;
    updateMetaTags(title, desc, img);

    // Auto redirect to app
    if (recipeId && recipeId !== "posts") {
      setIsRedirecting(true);
      const deepLink = `eefood://eefood.app/posts/${recipeId}`;
      setTimeout(() => {
        window.location.href = deepLink;
      }, 1500);
    }
  }, []);

  const updateMetaTags = (title, desc, img) => {
    const metaTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:image", content: img },
      { property: "og:url", content: window.location.href },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: img },
    ];

    metaTags.forEach(({ property, name, content }) => {
      const selector = property
        ? `meta[property="${property}"]`
        : `meta[name="${name}"]`;
      const meta = document.querySelector(selector);
      if (meta) meta.content = content;
    });
  };

  const handleOpenApp = () => {
    if (postData.recipeId) {
      window.location.href = `eefood://eefood.app/posts/${postData.recipeId}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .shimmer {
          background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="relative max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden group">
            <img
              src={postData.img}
              alt={postData.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.target.src =
                  "https://fohlafood.vn/cdn/shop/articles/bun-bo-hue.jpg?v=1709633070";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Logo Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                <img src="/logoEEFood.JPG"/>
              </div>
              <span className="font-bold text-gray-800">EEFood</span>
            </div>

            {/* Share Icon */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg cursor-pointer hover:bg-orange-500 hover:text-white transition-colors duration-300 float">
              <Share2 size={20} />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {postData.title}
            </h1>

            <p className="text-gray-600 leading-relaxed">{postData.desc}</p>

            {/* Decorative divider */}
            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="h-1 flex-1 bg-gradient-to-l from-orange-500 to-transparent rounded-full"></div>
            </div>

            {/* Open App Button */}
            <button
              onClick={handleOpenApp}
              disabled={isRedirecting}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRedirecting ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang chuyển hướng...
                </>
              ) : (
                <>
                  <ExternalLink size={20} />
                  Mở trong ứng dụng
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="text-center p-3 bg-orange-50 rounded-xl">
                <div className="text-2xl mb-1">🍜</div>
                <div className="text-xs text-gray-600 font-medium">Đa dạng</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-xl">
                <div className="text-2xl mb-1">⭐</div>
                <div className="text-xs text-gray-600 font-medium">
                  Chất lượng
                </div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-xl">
                <div className="text-2xl mb-1">💚</div>
                <div className="text-xs text-gray-600 font-medium">Dễ dàng</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-500">
            © 2025 EEFood — Chia sẻ hương vị Việt
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <span>Được tạo với</span>
            <span className="text-red-500">❤️</span>
            <span>tại Việt Nam</span>
          </div>
        </div>
      </div>
    </div>
  );
}
