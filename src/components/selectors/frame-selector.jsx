import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { usePhotoBooth } from "../../context/PhotoBoothProvider";
import { frameOptions } from "../../utils/frameOptions";

const FrameSelector = () => {
  const [openOptions, setOpenOptions] = useState(false);
  const { selectedFrame, setSelectedFrame } = usePhotoBooth();
  const currentOption = selectedFrame;

  return (
    <button
      className="border border-gray-300 p-3 rounded-md flex items-center gap-2 relative cursor-pointer"
      onClick={() => setOpenOptions(!openOptions)}
    >
      <div className="flex items-center">
        <img src={currentOption.image} alt="" className="object-cover size-6" />
        <p>{currentOption.name}</p>
      </div>
      {openOptions ? (
        <MdKeyboardArrowUp size={20} />
      ) : (
        <MdKeyboardArrowDown size={20} />
      )}
      {openOptions && (
        <div className="absolute w-full border border-gray-300 p-3 rounded-md bg-white top-13 left-0 flex flex-col z-10">
          {frameOptions.map((frame) => (
            <div
              key={frame.id}
              className="flex items-center py-2 hover:bg-gray-100 rounded-md cursor-pointer"
              onClick={() => {
                setSelectedFrame(frame);
                setOpenOptions(false);
              }}
            >
              <img src={frame.image} alt="" className="object-cover size-6" />
              <p>{frame.name}</p>
            </div>
          ))}
        </div>
      )}
    </button>
  );
};

export default FrameSelector;
