import React from "react";

import FrameSelector from "./frame-selector";
import DelaySelector from "./delay-selector";
// import ImageSelector from "./image-selector";

const Selectors = () => {
  return (
    <div className="flex items-center gap-2">
      <FrameSelector />
      <DelaySelector />
      {/* <ImageSelector /> */}
    </div>
  );
};

export default Selectors;
