import { Place } from "../models/place.model.js";
import { Trip } from "../models/trip.model.js";
import { Accomodation } from "../models/accomodation.model.js";
import { Itinerary } from "../models/itinerary.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const getHistory = async (req, res) => {
    try {
        const places = req.user.places;
        if (places.length === 0) {
            return res.status(200).json(new apiResponse(200, "No history found", []));
        }
        const history = await Place.find({ _id: { $in: places } });
        return res.status(200).json(new apiResponse(200, "History retrieved successfully", history));
    }
    catch (error) {
        throw new apiError(500, error.message);
    }
}

const addHistory = async (req, res) => {
    try {

        const newAccomodation = [];
        for (const accomodation of req.body.Accomodation) {
            const newAccomodationInstance = new Accomodation(
                {
                    name: accomodation.name,
                    price: accomodation.price,
                    location: accomodation.location,
                    image: accomodation.image,
                    latitude: accomodation.latitude,
                    longitude: accomodation.longitude,
                    reviews: accomodation.reviews,
                    description: accomodation.description
                }
            );
            await newAccomodationInstance.save();
            newAccomodation.push(newAccomodationInstance._id);
        }

        const newTrip = new Trip({
            destination: req.body.Trip.destination,
            travelDates: req.body.Trip.travelDates,
            budget: req.body.Trip.budget,
            travelMode: req.body.Trip.travelMode,
            accomodationType: req.body.Trip.accomodationType,
            travelerType: req.body.Trip.travelerType,
            activities: req.body.Trip.activities.split(",")
        });
        await newTrip.save();

        const newItinerary = [];
        for (const itinerary of req.body.Itinerary) {
            const myItinerary = new Itinerary(
                {
                    date: itinerary.date,
                    time: itinerary.time,
                    placeName: itinerary.placeName,
                    placeDetails: itinerary.placeDetails,
                    ticketPrice: itinerary.ticketPrice,
                    travelTime: itinerary.travelTime
                }
            );
            await myItinerary.save();
            newItinerary.push(myItinerary._id);
        }
        
        const newPlace = new Place({
            tripDetails: newTrip._id,
            accomodationOptions: [...newAccomodation],
            itinerary: [...newItinerary]
        });
        await newPlace.save();

        req.user.places.push(newPlace._id);
        await req.user.save();

        return res.status(201).json(new apiResponse(201, "History added successfully", newPlace));
    }
    catch (error) {
        throw new apiError(500, error.message);
    }
}

const deleteHistory = async (req, res) => {
    try {
        const placeId = req.body.placeId;
        const place = await Place.findById(placeId);
        if (!place) {
            return new apiError(res, 404, "Place not found");
        }
        await Accomodation.deleteMany({ _id: { $in: place.accomodationOptions } });
        await Trip.findByIdAndDelete(place.tripDetails);
        await Itinerary.deleteMany({ _id: { $in: place.itinerary } });
        await Place.findByIdAndDelete(placeId);
        req.user.places = req.user.places.filter(place => place.toString() !== placeId);
        await req.user.save();
        return res.status(200).json(new apiResponse(200, "History deleted successfully"));
    }
    catch (error) {
        throw new apiError(500, error.message);
    }
}

export { getHistory, addHistory, deleteHistory };