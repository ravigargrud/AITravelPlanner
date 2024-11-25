import React from "react";
import "./ItineraryTimeline.css";
import destPlaceholder from "../assets/destPlaceholder.jpg";
import { GetPlaceDetails } from '../service/GlobalAPI';
import { useState, useEffect } from "react";

const ItineraryTimeline = ({ itinerary }) => {
  const getPhotoURL = "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

  const [itineraryPhotos, setItinerartPhotos] = useState([]);

  const getItineraryPhotos = async () => {
    try {
      const photoRequests = itinerary.map(async (option) => {
        const data = { textQuery: option.placeName };
        const response = await GetPlaceDetails(data);
        const photoURL = getPhotoURL.replace("{NAME}", response.data.places[0].photos[0].name);
        return photoURL;
      });

      const photos = await Promise.all(photoRequests);
      setItinerartPhotos(photos);
    } catch (error) {
      console.error("Error fetching accommodation photos:", error);
    }
  };

  useEffect(() => {
    getItineraryPhotos();
  }, [itinerary]);

  return (
    <div className="timeline">
      {itinerary.map((item, index) => (
        <div className="timeline-item" key={index}>
          <div className="timeline-time">
            <span>🌤️</span>
            <h4>{item.time}</h4>
          </div>
          <div className={`timeline-card ${index % 2 === 0 ? "left" : "right"}`}>
            {/* <img src={item.image} alt={item.placeName} className="timeline-image" /> */}
            <img src={itineraryPhotos[index] || destPlaceholder} alt={item.placeName} className="timeline-image" />
            <div className="timeline-details">
              <h3>{item.placeName}</h3>
              <p>{item.placeDetails}</p>
              {item.ticketPrice && <p className="price">💰 {item.ticketPrice}</p>}
              <p className="time">⏱️ {item.travelTime || "N/A"}</p>
            </div>
          </div>
          {index !== itinerary.length - 1 && <div className={`timeline-connector`}></div>}
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;
