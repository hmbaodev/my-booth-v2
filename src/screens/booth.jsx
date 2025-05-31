import { useEffect } from "react";
import Capture from "../components/capture";
import { usePhotoBooth } from "../context/PhotoBoothProvider";

const Booth = () => {
  const { aspect } = usePhotoBooth();

  useEffect(() => {
    alert(aspect);
  }, [])

  return (
    <div>
      <Capture />
    </div>
  );
};

export default Booth;
