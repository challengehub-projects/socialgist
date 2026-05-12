export default function Home() {
  return (
    <div className="max-w-xl mx-auto space-y-5">

      <h2 className="text-2xl font-bold text-gray-800">
        Home Feed
      </h2>

      {/* Post Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border">
        <p className="font-semibold text-gray-800">John Doe</p>
        <p className="text-gray-600 mt-2">
          Just joined Social Gist! 🚀
        </p>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border">
        <p className="font-semibold text-gray-800">Sarah</p>
        <p className="text-gray-600 mt-2">
          Beautiful day today 🌿✨
        </p>
      </div>

    </div>
  );
}