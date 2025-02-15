type TableProps = {
    todo: number[];
    preparing: number[];
    ready: number[];
  };
  
  function Table({ todo, preparing, ready }: TableProps) {
    return (
      <div className="overflow-x-auto ml-2 mr-2 rounded-xl h-[40vh] border-4 border-orange-500">
        <div className="flex h-full">
          {/* To-Do Column */}
          <div className="flex-1 border-r-2 border-orange-500 flex flex-col">
            <div className="h-12 border-b-2 border-orange-500 flex items-center justify-center sticky top-0 z-10">
              <span className="font-bold text-black">To-Do</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ul className="text-black list-disc list-inside p-2">
                {todo.map((item, index) => (
                  <li key={index} className="py-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Preparing Column */}
          <div className="flex-1 border-r-2 border-orange-500 flex flex-col">
            <div className="h-12 border-b-2 border-orange-500 flex items-center justify-center sticky top-0 z-10">
              <span className="font-bold text-black">Preparing</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ul className="text-black list-disc list-inside p-2">
                {preparing.map((item, index) => (
                  <li key={index} className="py-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Ready Column */}
          <div className="flex-1 flex flex-col">
            <div className="h-12 border-b-2 border-orange-500 flex items-center justify-center sticky top-0 z-10">
              <span className="font-bold text-black">Ready</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ul className="text-black list-disc list-inside p-2">
                {ready.map((item, index) => (
                  <li key={index} className="py-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Table;