const axios = require("axios");

const API_KEY = process.env.GOOGLE_API_KEY;

module.exports = async function  getLatLngFromAddress(address) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`;
  
    try {
      const response = await axios.get(url);
      console.log(response);
      if (response.data.status === "OK") {
        const { lat, lng } = response.data.results[0].geometry.location;
        console.log("Latitude:", lat, "Longitude:", lng);
        return { lat, lng };
      } else {
        console.error("Geocoding error:", response.data.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching geocode:", error);
      return null;
    }

    //return { lat:43.01480314339562, lng:-81.19397948379029 };
};