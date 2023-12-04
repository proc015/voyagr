import { Trip } from "../../types/Trip";
import { Buttonbar } from "../Buttonbar";
import DetailedTripbox from "./DetailedTripbox";
import { Profilebar } from "../Profilebar";
import DetailedActivitybox from "./DetailedActivitybox";

interface Props {
    detailedTrip: Trip;
    onClose: () => void;
  }
  

const DetailedTrip = ({ detailedTrip, onClose }: Props) => {
  
  console.log('DetailedTrip:', detailedTrip)
  if (!detailedTrip) return null;

  
    
    return (
      <div className="dev-styling absolute mt-24 mb-4 inset-0 flex flex-col h-fit m-5 overflow-auto bg-white">
        <button onClick={onClose} className="relative top-2 right-2 z-10"> CLOSE BUTTON X </button>
        <div className="flex-grow overflow-auto">
        <Profilebar />
        <DetailedTripbox 
          detailedTrip={detailedTrip} />
        <Buttonbar />
        <DetailedActivitybox detailedActivity={detailedTrip} />
      </div>
      </div>
    );
  };

export default DetailedTrip
