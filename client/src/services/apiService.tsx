import { Trip } from "../types/Trip";

// const url = "http://localhost:3000";

const mockUrl = "https://d5c1edd4-13c7-496b-a7d7-fbcbfc009602.mock.pstmn.io"

export async function postTrip(addTripObj: Trip) {
    try {
        const data = await fetch(`${mockUrl}/trip`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(addTripObj),
        });
        const response = await data.json(); 
        console.log('response server', response)
        return response; 
    } catch (err) {
        console.log(err)
    }
}

