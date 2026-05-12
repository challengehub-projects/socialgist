export default function CreatePost() {
  return (
    <div className="max-w-xl mx-auto">

      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Create Post
      </h2>

      <div className="bg-white p-5 rounded-2xl shadow-sm border space-y-4">

        <textarea
          className="w-full h-32 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200"
          placeholder="What's on your mind?"
        />

        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold">
          Post
        </button>

      </div>
    </div>
  );
}