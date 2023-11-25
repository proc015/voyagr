import { useAppDispatch } from '../app/hooks'
import { Trip } from "../types/Trip";

import { postTrip } from "../services/apiService";
import { addTrip } from "../redux/addTripSlice";
import { ChangeEvent, FormEvent, useState} from "react";


const AddTrip = () => {

    const dispatch = useAppDispatch(); 
    const [newTrip, setNewTrip] = useState<Trip>({
        trip_name: '',
        start_loc: '', 
        destination: '', 
        start_date: '',
        end_date: '',
    });


  
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setNewTrip(prevTrip => ({
            ...prevTrip,
            [id]: value
        }));
    };

    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        postTrip(newTrip).then((createdTrip)=>
        dispatch(addTrip(createdTrip)));
        setNewTrip({
            trip_name: '',
        start_loc: '', 
        destination: '', 
        start_date: '',
        end_date: '',
        });
        };

        // console.log(newTrip)

  
    return (
    <form onSubmit={handleSubmit} className="add-trip-form-container">
        <label> Trip Name: 
            <input
                id="trip_name"
                type="text"
                required={true}
                placeholder=""
                value={newTrip.trip_name}
                onChange={handleInputChange}
                />
        </label>

        <label> Start Location: 
            <input
                id="start_loc"
                type="text"
                required={true}
                placeholder=""
                value={newTrip.start_loc}
                onChange={handleInputChange}
                />
        </label>
        
        <label> Destination: 
            <input
                id="destination"
                type="text"
                required={true}
                placeholder=""
                value={newTrip.destination}
                onChange={handleInputChange}
                />
        </label>
        
        <label> Start Date: 
            <input
                id="start_date"
                type="text"
                required={true}
                value ={newTrip.start_date}
                onChange={handleInputChange}
                />
        </label>

        <label> End Date: 
            <input
                id="end_date"
                type="text"
                value={newTrip.end_date}
                onChange={handleInputChange}
                />
        </label>
        <input type="submit" value="Submit" />
      
    </form>
  )
}



export default AddTrip
