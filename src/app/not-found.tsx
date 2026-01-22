import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-xl text-center">

        {/* 404 TEXT */}
        <h1 className="text-8xl font-extrabold text-[#00455D]">404</h1>

        <h2 className="text-2xl font-semibold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 mt-8">

          <Link
            href="/"
            className="flex items-center gap-2 bg-[#00455D] text-white px-6 py-2 rounded-lg hover:bg-[#00455D] transition"
          >
            <Home size={18} />
            Go Home
          </Link>

          <Link
            href="javascript:history.back()"
            className="flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </Link>

        </div>
      </div>
    </div>
  );
}
