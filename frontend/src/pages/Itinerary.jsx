import { useContext, useEffect, useState } from 'react';
import { ItineraryContext } from '../store/ItineraryStore';
import "bootstrap/dist/css/bootstrap.min.css";
import destPlaceholder from '../assets/destPlaceholder.jpg';
import HotelCard from '../components/HotelCard';
import ItineraryTimeline from '../components/ItineraryTimeline';
import { GetPlaceDetails } from '../service/GlobalAPI';

const Itinerary = () => {
  const { jsonResponse } = useContext(ItineraryContext);
  const { tripDetails, accommodationOptions, itinerary } = jsonResponse;

  const getPhotoURL = "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

  const [accommodationPhotos, setAccommodationPhotos] = useState([]);

  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  const getAccomodationPhotos = async () => {
    try {
      const photoRequests = accommodationOptions.map(async (option) => {
        const data = { textQuery: option.name };
        const response = await GetPlaceDetails(data);
        const photoURL = getPhotoURL.replace("{NAME}", response.data.places[0].photos[0].name);
        return photoURL;
      });

      const photos = await Promise.all(photoRequests);
      setAccommodationPhotos(photos);
    } catch (error) {
      console.error("Error fetching accommodation photos:", error);
    }
  };

  useEffect(() => {
    getAccomodationPhotos();
  }, [accommodationOptions]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Trip to {tripDetails.destination}</h1>

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

      <div className="mb-5">
        <h3>Accommodation Options</h3>
        <div className="row">
          {accommodationOptions.map((option, index) => (
            <HotelCard
              key={index}
              image={accommodationPhotos[index] || destPlaceholder}
              destination={option.name}
              price={option.price}
              duration={option.reviews}
            />
          ))}
        </div>
      </div>

      <div>
        <h3>Itinerary</h3>
        <ItineraryTimeline itinerary={itinerary} />
      </div>
    </div>
  );
};

export default Itinerary;
