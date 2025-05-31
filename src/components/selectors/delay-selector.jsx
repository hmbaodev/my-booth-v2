import { useState } from "react";
import { PiClockCountdownLight } from "react-icons/pi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { usePhotoBooth } from "../../context/PhotoBoothProvider";
import { delayOptions } from "../../utils/delayOptions";

const DelaySelector = () => {
  const [openOptions, setOpenOptions] = useState(false);
  const { selectedDelay, setSelectedDelay } = usePhotoBooth();
  const currentOption = selectedDelay

  return (
    <button
      className="border border-gray-300 p-3 rounded-md flex items-center gap-2 relative"
      onClick={() => setOpenOptions(!openOptions)}
    >
      <div className="flex items-center gap-1">
        <PiClockCountdownLight size={20} />
        <p>{currentOption}s Delay</p>
      </div>
      {openOptions ? (
        <MdKeyboardArrowUp size={20} />
      ) : (
        <MdKeyboardArrowDown size={20} />
      )}
      {openOptions && (
        <div className="absolute w-full border border-gray-300 p-3 rounded-md bg-white top-13 left-0 flex flex-col z-10">
          {delayOptions.map((delay) => (
            <div
              key={delay}
              className="flex items-center py-2 hover:bg-gray-100 rounded-md gap-1"
              onClick={() => {
                setSelectedDelay(delay);
                setOpenOptions(false);
              }}
            >
              <PiClockCountdownLight size={20} />
              <p>{delay}s Delay</p>
            </div>
          ))}
        </div>
      )}
    </button>
  );
};

export default DelaySelector;
