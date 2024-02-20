"use client";

import useStore from "@/store";

const LoadingScreen = () => {
  const { isLoading, setIsLoading } = useStore();

  if (!isLoading) {
    return null;
  }

  return (
    <div className="bg-gray-600 fixed bg-opacity-50 h-screen w-screen z-[999] top-0 flex items-center">
      <div className="custom-loader m-auto"></div>
    </div>
  );
};

export default LoadingScreen;
