import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
systemInstruction: "Generate Travel Plan for Location: New Delhi, from Date: 20/11/2024 to Date: 22/11/2024, using travel mode: Flight and preffered Accommodation type being Hostel for a budget friendly stay include activities like shopping, food, for a solo traveller having mid budget. Give me a list of Hostel Option including Name, Location, Price, ImageURL, Geocoordinates, Reviews, and description. Also suggest itinerary including PlaceName, PlaceDetails, TicketPrice(if any), with appropriate time taggings as per my dates considering time that i can spend at each location and time required to navigate b/w two locations in JSON Format. This is a sample format { \"type\": \"object\", \"properties\": { \"response\": { \"type\": \"object\", \"properties\": { \"tripDetails\": { \"type\": \"object\", \"properties\": { \"destination\": { \"type\": \"string\" }, \"travelDates\": { \"type\": \"string\" }, \"travelMode\": { \"type\": \"string\" }, \"accommodationType\": { \"type\": \"string\" }, \"budget\": { \"type\": \"string\" }, \"travelerType\": { \"type\": \"string\" }, \"activities\": { \"type\": \"array\", \"items\": { \"type\": \"string\" } } } }, \"accommodationOptions\": { \"type\": \"array\", \"items\": { \"type\": \"object\", \"properties\": { \"name\": { \"type\": \"string\" }, \"location\": { \"type\": \"string\" }, \"price\": { \"type\": \"string\" }, \"imageURL\": { \"type\": \"string\" }, \"geocoordinates\": { \"type\": \"object\", \"properties\": { \"latitude\": { \"type\": \"number\" }, \"longitude\": { \"type\": \"number\" } } }, \"reviews\": { \"type\": \"string\" }, \"description\": { \"type\": \"string\" } } } }, \"itinerary\": { \"type\": \"array\", \"items\": { \"type\": \"object\", \"properties\": { \"date\": { \"type\": \"string\" }, \"time\": { \"type\": \"string\" }, \"placeName\": { \"type\": \"string\" }, \"placeDetails\": { \"type\": \"string\" }, \"ticketPrice\": { \"type\": \"string\" }, \"travelTime\": { \"type\": [\"string\", \"null\"] } } } } } } } } }",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate Travel Plan for Location: New Delhi, from Date: 20/11/2024 to Date: 22/11/2024, using travel mode: Flight and preffered Accommodation type being Hostel for a budget friendly stay include activities like shopping, food, for a solo traveller having mid budget. Give me a list of Hostel Option including Name, Location, Price, ImageURL, Geocoordinates, Reviews, and description. Also suggest itinerary including PlaceName, PlaceDetails, TicketPrice(if any), with appropriate time taggings as per my dates considering time that i can spend at each location and time required to navigate b/w two locations in JSON Format" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"tripDetails\": {\n    \"destination\": \"New Delhi, India\",\n    \"travelDates\": \"20/11/2024 - 22/11/2024\",\n    \"travelMode\": \"Flight\",\n    \"accommodationType\": \"Hostel\",\n    \"budget\": \"Mid-range\",\n    \"travelerType\": \"Solo\"\n  },\n  \"hostelOptions\": [\n    {\n      \"name\": \"Zostel Delhi\",\n      \"location\": \"Paharganj\",\n      \"priceRange\": \"$10-$25 per night\",\n      \"imageURL\": \"https://example.com/zosteldelhi.jpg\",  //Replace with actual image URL\n      \"geocoordinates\": {\n        \"latitude\": 28.6389,\n        \"longitude\": 77.2134\n      },\n      \"reviews\": \"4.5 stars\",\n      \"description\": \"Popular hostel in Paharganj known for its social atmosphere and events.\"\n    },\n    {\n      \"name\": \"GoStops Delhi\",\n      \"location\": \"Paharganj\",\n      \"priceRange\": \"$12-$30 per night\",\n      \"imageURL\": \"https://example.com/gostopsdelhi.jpg\", //Replace with actual image URL\n      \"geocoordinates\": {\n        \"latitude\": 28.6400,\n        \"longitude\": 77.2150\n      },\n      \"reviews\": \"4.2 stars\",\n      \"description\": \"Modern hostel with a mix of private and dorm rooms, good for solo travellers.\"\n    },\n\n  ],\n  \"itinerary\": [\n    {\n      \"date\": \"20/11/2024\",\n      \"time\": \"10:00 AM\",\n      \"placeName\": \"Arrival at Delhi Airport (DEL)\",\n      \"placeDetails\": \"Arrive at Delhi Airport, take the Airport Express Line or a pre-booked taxi to your hostel in Paharganj.\",\n      \"ticketPrice\": \"Airport Express: ₹200, Taxi: ₹500-₹800 (approx.)\",\n      \"travelTime\": \"1-1.5 hours (depending on traffic)\"\n    },\n    {\n      \"date\": \"20/11/2024\",\n      \"time\": \"12:00 PM\",\n      \"placeName\": \"Check-in to Hostel\",\n      \"placeDetails\": \"Check in to your chosen hostel, leave your luggage.\",\n      \"ticketPrice\": null,\n      \"travelTime\": null\n    },\n    {\n      \"date\": \"20/11/2024\",\n      \"time\": \"1:00 PM\",\n      \"placeName\": \"Lunch at Paranthe Wali Gali\",\n      \"placeDetails\": \"Enjoy a delicious and affordable lunch at Paranthe Wali Gali, Chandni Chowk. Try different types of stuffed parathas.\",\n      \"ticketPrice\": \"₹100-₹200 (approx.)\",\n      \"travelTime\": \"30 mins - 1 hour (depending on traffic & mode of transport)\"\n    },\n    {\n      \"date\": \"20/11/2024\",\n      \"time\": \"2:30 PM\",\n      \"placeName\": \"Chandni Chowk Exploration\",\n      \"placeDetails\": \"Explore the bustling streets of Chandni Chowk, visit Jama Masjid.\",\n      \"ticketPrice\": \"Jama Masjid entry: Free\",\n      \"travelTime\": \"2-3 hours\"\n    },\n    {\n      \"date\": \"20/11/2024\",\n      \"time\": \"5:30 PM\",\n      \"placeName\": \"Shopping at Chandni Chowk\",\n      \"placeDetails\": \"Explore the various shops for spices, clothes, and souvenirs.\",\n      \"ticketPrice\": null,\n      \"travelTime\": \"2-3 hours\"\n    },\n    {\n      \"date\": \"20/11/2024\",\n      \"time\": \"8:00 PM\",\n      \"placeName\": \"Dinner near Hostel\",\n      \"placeDetails\": \"Enjoy dinner at a local eatery near your hostel.\",\n      \"ticketPrice\": \"₹150-₹300 (approx.)\",\n      \"travelTime\": \"15-30 minutes\"\n    },\n    {\n      \"date\": \"21/11/2024\",\n      \"time\": \"9:00 AM\",\n      \"placeName\": \"Red Fort\",\n      \"placeDetails\": \"Visit the magnificent Red Fort, a UNESCO World Heritage Site.\",\n      \"ticketPrice\": \"₹50 (Indian citizens), higher for foreign nationals\",\n      \"travelTime\": \"1 hour (travel + entry)\"\n    },\n    {\n      \"date\": \"21/11/2024\",\n      \"time\": \"11:30 AM\",\n      \"placeName\": \"Rajpath and India Gate\",\n      \"placeDetails\": \"Visit Rajpath and India Gate, iconic landmarks of Delhi.\",\n      \"ticketPrice\": null,\n      \"travelTime\": \"30-45 minutes\"\n    },\n    {\n      \"date\": \"21/11/2024\",\n      \"time\": \"1:00 PM\",\n      \"placeName\": \"Lunch near India Gate\",\n      \"placeDetails\": \"Have lunch at a restaurant near India Gate.\",\n      \"ticketPrice\": \"₹200-₹400 (approx.)\",\n      \"travelTime\": null\n    },\n    {\n      \"date\": \"21/11/2024\",\n      \"time\": \"2:30 PM\",\n      \"placeName\": \"Humayun's Tomb\",\n      \"placeDetails\": \"Visit Humayun's Tomb, another UNESCO World Heritage Site.\",\n      \"ticketPrice\": \"₹60 (Indian citizens), higher for foreign nationals\",\n      \"travelTime\": \"45 minutes - 1 hour\"\n    },\n    {\n      \"date\": \"21/11/2024\",\n      \"time\": \"4:30 PM\",\n      \"placeName\": \"Shopping at Dilli Haat\",\n      \"placeDetails\": \"Visit Dilli Haat for handicrafts and souvenirs from various states of India.\",\n      \"ticketPrice\": null,\n      \"travelTime\": \"45 minutes - 1 hour\"\n\n    },\n    {\n      \"date\": \"21/11/2024\",\n      \"time\": \"7:00 PM\",\n      \"placeName\": \"Dinner and Relax\",\n      \"placeDetails\": \"Enjoy dinner and relax at your hostel\",\n      \"ticketPrice\": null,\n      \"travelTime\": null\n    },\n    {\n      \"date\": \"22/11/2024\",\n      \"time\": \"9:00 AM\",\n      \"placeName\": \"Explore Local Markets\",\n      \"placeDetails\": \"Explore local markets near your hostel for last-minute shopping.\",\n      \"ticketPrice\": null,\n      \"travelTime\": null\n    },\n    {\n      \"date\": \"22/11/2024\",\n      \"time\": \"11:00 AM\",\n      \"placeName\": \"Check out from Hostel\",\n      \"placeDetails\": \"Check out from your hostel.\",\n      \"ticketPrice\": null,\n      \"travelTime\": null\n    },\n    {\n      \"date\": \"22/11/2024\",\n      \"time\": \"12:00 PM\",\n      \"placeName\": \"Transfer to Delhi Airport\",\n      \"placeDetails\": \"Travel to Delhi Airport for your departure.\",\n      \"ticketPrice\": \"Airport Express: ₹200, Taxi: ₹500-₹800 (approx.)\",\n      \"travelTime\": \"1-1.5 hours\"\n    }\n  ]\n}\n```\n\n**Note:**  This is a sample itinerary and can be adjusted based on your preferences and interests.  Remember to factor in travel time between locations, especially during peak hours in Delhi.  The prices are approximate and may vary.  Remember to replace the placeholder image URLs with actual URLs.  It's also recommended to book flights and potentially hostels in advance, especially if travelling during peak season.  Always check the latest entry fees and opening hours for the attractions.  Consider using ride-hailing apps or the Delhi Metro for convenient and affordable transportation within the city.\n" },
            ],
        },
    ],
});