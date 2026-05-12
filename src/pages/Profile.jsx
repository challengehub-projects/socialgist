export default function Profile() {
  return (
    <div className="max-w-xl mx-auto">

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
        
        <div className="w-20 h-20 mx-auto rounded-full bg-green-500 text-white flex items-center justify-center text-3xl font-bold">
          S
        </div>

        <h2 className="text-xl font-bold mt-3">
          Social User
        </h2>

        <p className="text-gray-500">
          socialgist@email.com
        </p>

      </div>

      {/* Settings */}
      <div className="mt-5 bg-white p-5 rounded-2xl border space-y-3">

        <button className="w-full text-left hover:text-green-500">
          Edit Profile
        </button>

        <button className="w-full text-left hover:text-green-500">
          Privacy Settings
        </button>

        <button className="w-full text-left text-red-500">
          Logout
        </button>

      </div>

    </div>
  );
}