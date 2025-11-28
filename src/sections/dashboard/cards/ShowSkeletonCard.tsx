const ShowSkeletonCard: React.FC = () => {
    return (
      <div className="min-w-[186px] max-md:min-w-[160px] min-h-[300px] max-md:min-h-[262px] bg-white overflow-hidden animate-pulse rounded-[10px] flex flex-col shadow-[0_2px_6px_0_rgba(0,0,0,0.32)]">
        <div className="w-full h-[180px] max-md:h-[130px] bg-gray-300 rounded-t-md"></div>
  
        <div className="mt-4 mx-2">
          <div className="h-5 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-3 w-9/12"></div>
          <div className="h-4 bg-gray-300 rounded mb-3 w-9/12"></div>
        </div>
      </div>
    );
  };
  
  export default ShowSkeletonCard;
  