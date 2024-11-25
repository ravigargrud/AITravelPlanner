import styles from "./GenerationForm.module.css";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useState } from "react";
import {Budget, TravelMode, Accommodation, Activities, People, AIPrompt} from "../constants/options";
import {chatSession} from "../service/AIModel";
import travel from "../assets/tr_vi_17.png";
import { useContext } from "react";
import { ItineraryContext } from "../store/ItineraryStore";
import { useNavigate } from "react-router-dom";


const GenerationForm = () => {
const [formData, setFormData] = useState({
  Destination: "",
  StartDate: "",
  EndDate: "",
  TravelMode: "",
  Accommodation: "",
  Activities: [],
  NumberOfPeople: "",
  Budget: "",
});

const navigate = useNavigate();

const onChange = (e) => {
  if (e.target.name === "Activities") {
    const selectedActivities = Array.from(e.target.selectedOptions).map((option) => option.value);
    setFormData({ ...formData, [e.target.name]: selectedActivities });
    return;
  }
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const [loading, setLoading] = useState(false);


const { setJsonResponse } = useContext(ItineraryContext);

const generateItinerary = async (e) => {
  e.preventDefault();
  setLoading(true); // Show loader
  try {
    const finalPrompt = AIPrompt
      .replace('{Destination}', formData.Destination)
      .replace('{StartDate}', formData.StartDate)
      .replace('{EndDate}', formData.EndDate)
      .replace('{TravelMode}', formData.TravelMode)
      .replace('{Accommodation}', formData.Accommodation)
      .replace('{Activities}', formData.Activities.join(', '))
      .replace('{NumberOfPeople}', formData.NumberOfPeople)
      .replace('{Budget}', formData.Budget + " Budget");
    
    console.log(finalPrompt);
    const result = await chatSession.sendMessage(finalPrompt);
    const responseText = await result.response.text(); // Extract text once
    console.log("AI Response:", responseText);

    const responseJson = JSON.parse(responseText);
    setJsonResponse(responseJson); // Store response in context

    // Navigate to the itinerary page
    navigate('/itinerary');

  } catch (error) {
    console.error('Error generating itinerary:', error);
    setJsonResponse({});
  }
  setLoading(false); // Hide loader
};

  return (
    <>
      <h2 className={styles.title}>Plan Your Trip</h2>

      <div className={styles.MainForm}>
      
      <div className={styles.left}>
      <label htmlFor="Destination">Destination</label>
      <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
      selectProps={{
        destination: formData.Destination,
        onChange: (v) => {setFormData({...formData, Destination: v.label});},
      }}
      />

      <label htmlFor="StartDate">Start Date</label>
      <input type="date" id="StartDate" name="StartDate" onChange={(e) => onChange(e)}/>

      <label htmlFor="EndDate">End Date</label>
      <input type="date" id="EndDate" name="EndDate" onChange={(e) => onChange(e)}/>
      
      <label htmlFor="TravelMode">Travel Mode</label>
      <select id="TravelMode" name="TravelMode" onChange={(e) => onChange(e)}>
        {TravelMode.map((mode) => (
          <option key={mode.label} value={mode.label}>
            {mode.label}
          </option>
        ))}
      </select>
      
      <label htmlFor="Budget">Budget</label>
      <select id="Budget" name="Budget" onChange={(e) => onChange(e)}>
        {Budget.map((budget) => (
          <option key={budget.label} value={budget.label}>
            {budget.label}
          </option>
        ))}
      </select>

    </div>


      <div className={styles.right}>
      <label htmlFor="Accommodation">Accommodation</label>
      <select id="Accommodation" name="Accommodation" onChange={(e) => onChange(e)}>
        {Accommodation.map((accommodation) => (
          <option key={accommodation.label} value={accommodation.label}>
            {accommodation.label}
          </option>
        ))}
      </select>
      
      <label htmlFor="Activities">Activities</label>
      <select id="Activities" name="Activities" multiple onChange={(e) => onChange(e)}>
        {Activities.map((activity) => (
          <option key={activity.label} value={activity.label}>
            {activity.label}
          </option>
        ))}
      </select>

      <label htmlFor="NumberOfPeople">Number of People</label>
      <select id="NumberOfPeople" name="NumberOfPeople" onChange={(e) => onChange(e)}>
        {People.map((people) => (
          <option key={people.label} value={people.label}>
            {people.label}
          </option>
        ))}
      </select>

      <button onClick={(e) => generateItinerary(e)} type="submit" disabled={loading}>
      {loading ? "Generating..." : "Generate Itinerary"}
      </button>

      <img src={travel} alt="travel" />
      </div>

      </div>
      
    </>
  );
};

export default GenerationForm;