const Budget = [
    {
        "icon": "Dollar",
        "label": "Budget",
        "desc": "Economical",
    },
    {
        "icon": "CreditCard",
        "label": "Mid-Range",
        "desc": "Moderate",
    },
    {
        "icon": "Diamond",
        "label": "Luxury",
        "desc": "Extravagant",
    },
];

const TravelMode = [
    {
        "icon": "Flight",
        "label": "Flight",
        "desc": "Fastest way to travel",
    },
    {
        "icon": "Train",
        "label": "Train",
        "desc": "Scenic route",
    },
    {
        "icon": "Bus",
        "label": "Bus",
        "desc": "Budget-friendly",
    },
    {
        "icon": "Car",
        "label": "Car",
        "desc": "Freedom to explore",
    },
];

const Accommodation = [
    {
        "icon": "Hotel",
        "label": "Hotel",
        "desc": "Comfortable stay",
    },
    {
        "icon": "Hostel",
        "label": "Hostel",
        "desc": "Budget-friendly",
    },
    {
        "icon": "Airbnb",
        "label": "Airbnb",
        "desc": "Local experience",
    },
    {
        "icon": "Camping",
        "label": "Camping",
        "desc": "Adventure",
    },
];

const Activities = [
    {
        "icon": "Hiking",
        "label": "Hiking",
        "desc": "Explore the great outdoors",
    },
    {
        "icon": "Sightseeing",
        "label": "Sightseeing",
        "desc": "Discover new places",
    },
    {
        "icon": "Shopping",
        "label": "Shopping",
        "desc": "Retail therapy",
    },
    {
        "icon": "Food",
        "label": "Food",
        "desc": "Culinary adventure",
    },
];

const People = [
    {
        "icon": "Person",
        "label": "1",
        "desc": "Solo",
    },
    {
        "icon": "People",
        "label": "2",
        "desc": "Couple",
    },
    {
        "icon": "Group",
        "label": "3",
        "desc": "Small group",
    },
    {
        "icon": "Family",
        "label": "4",
        "desc": "Family",
    },
    {
        "icon": "Group",
        "label": "5+",
        "desc": "Large group",
    }
];

export { Budget, TravelMode, Accommodation, Activities, People };

export const AIPrompt = "Generate Travel Plan for Location: {Destination}, from Date: {StartDate} to Date: {EndDate}, using travel mode: {TravelMode} and preffered Accommodation type being {Accommodation} include activities like {Activities} for {NumberOfPeople} having {Budget}. Give me a list of {Accommodation} Option including Name, Location, Price, ImageURL, Geocoordinates, Reviews, and description. Also suggest itinerary including PlaceName, PlaceDetails, TicketPrice(if any), with appropriate time taggings as per my dates considering time that i can spend at each location and time required to navigate b/w two locations in JSON Format"