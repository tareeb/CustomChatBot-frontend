const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-200 px-4">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">
                404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                Page Not Found
            </h2>
            <p className="text-gray-500 text-lg mb-6 text-center">
                The page you are looking for does not exist or has been moved.
            </p>
            <a href="/" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                Go Back Home
            </a>
        </div>
    );
};

export default NotFound;
