import { Trip } from "../types/Trip";

interface Props {
    trip: Trip;
    onClose: () => void;
  }
  

const DetailedTrip = ({ trip, onClose }: Props) => {
    if (!trip) return null;
  
    
    return (
      <div className="detailed-trip-overlay">
        
        <button onClick={onClose}>Close</button>
      </div>
    );
  };

export default DetailedTrip
