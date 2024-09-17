import MoonLoader from "react-spinners/MoonLoader";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-200">
      <MoonLoader color="#ffffff" size={40} />
    </div>
  );
};

export default Loading;
