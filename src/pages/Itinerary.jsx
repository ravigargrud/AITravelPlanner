import { useContext } from 'react';
import { ItineraryContext } from '../store/ItineraryStore';
import "bootstrap/dist/css/bootstrap.min.css";
import destPlaceholder from '../assets/destPlaceholder.jpg';
import HotelCard from '../components/HotelCard';
import ItineraryTimeline from '../components/ItineraryTimeline';

const Itinerary = () => {
    const { jsonResponse } = useContext(ItineraryContext);
    
    console.log(jsonResponse);

    const { tripDetails, accommodationOptions, itinerary } = jsonResponse;

    // Enable scrolling
    document.body.style.overflow = 'auto';

    return (
        <div className="container mt-4">
          <h1 className="text-center mb-4">Trip to {tripDetails.destination}</h1>
          
          {/* Trip Details */}
          <div className="mb-5">
            <h3>Trip Details</h3>
            <ul className="list-group">
              <li className="list-group-item"><strong>Travel Dates:</strong> {tripDetails.travelDates}</li>
              <li className="list-group-item"><strong>Travel Mode:</strong> {tripDetails.travelMode}</li>
              <li className="list-group-item"><strong>Accommodation:</strong> {tripDetails.accommodationType}</li>
              <li className="list-group-item"><strong>Budget:</strong> {tripDetails.budget}</li>
              <li className="list-group-item"><strong>Traveler Type:</strong> {tripDetails.travelerType}</li>
              <li className="list-group-item"><strong>Activities:</strong> {tripDetails.activities.join(", ")}</li>
            </ul>
          </div>
    
          {/* Accommodation Options */}
          <div className="mb-5">
            <h3>Accommodation Options</h3>
            <div className="row">
              {accommodationOptions.map((option, index) => (
                // <HotelCard key={index} image={option.imageURL} destination={option.name} price={option.price} duration={option.reviews} />
                <HotelCard key={index} image={destPlaceholder} destination={option.name} price={option.price} duration={option.reviews} />
              ))}
            </div>
          </div>
    
          {/* Itinerary */}
          <div>
            <h3>Itinerary</h3>
            <ItineraryTimeline itinerary={itinerary} />
        </div>
        </div>
      );
    };

export default Itinerary;