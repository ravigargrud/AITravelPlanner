import React from "react";
import "./ItineraryTimeline.css";
import destPlaceholder from "../assets/destPlaceholder.jpg";

const ItineraryTimeline = ({ itinerary }) => {
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
            <img src={destPlaceholder} alt={item.placeName} className="timeline-image" />
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
