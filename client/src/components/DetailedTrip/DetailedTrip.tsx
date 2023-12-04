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
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <button onClick={onClose}> CLOSE BUTTON X </button>
        <Profilebar />
        <DetailedTripbox 
          detailedTrip={detailedTrip} />
        <Buttonbar />
        <DetailedActivitybox detailedActivity={detailedTrip} />
      </div>
    );
  };

export default DetailedTrip
