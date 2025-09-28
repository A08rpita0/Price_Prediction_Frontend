// // ----------------------
// // Utility functions
// // ----------------------

// // Get selected number of bathrooms
// function getBathValue() {
//   var uiBathrooms = document.getElementsByName("uiBathrooms");
//   for (var i = 0; i < uiBathrooms.length; i++) {
//     if (uiBathrooms[i].checked) {
//       return parseInt(uiBathrooms[i].value);
//     }
//   }
//   return -1;
// }

// // Get selected BHK
// function getBHKValue() {
//   var uiBHK = document.getElementsByName("uiBHK");
//   for (var i = 0; i < uiBHK.length; i++) {
//     if (uiBHK[i].checked) {
//       return parseInt(uiBHK[i].value);
//     }
//   }
//   return -1;
// }

// // ----------------------
// // Handle price estimation
// // ----------------------
// function onClickedEstimatePrice() {
//   console.log("Estimate price button clicked");

//   var sqft = parseFloat(document.getElementById("uiSqft").value);
//   var bhk = getBHKValue();
//   var bath = getBathValue();
//   var location = document.getElementById("uiLocations").value;
//   var estPrice = document.getElementById("uiEstimatedPrice");

//   if (!sqft || bhk <= 0 || bath <= 0 || !location) {
//     alert("Please fill all fields correctly!");
//     return;
//   }

//   var url = "https://price-prediction-backend-4.onrender.com/predict_home_price";

//   $.post(url, {
//     total_sqft: sqft,
//     bhk: bhk,
//     bath: bath,
//     location: location
//   }, function (data, status) {
//     console.log(data.estimated_price);

//     estPrice.innerHTML = "<h2>💰 Estimated Price: " + data.estimated_price.toString() + " Lakh</h2>";

//     console.log(status);

//     // Add marker on map for predicted price
//     var coords = getLocationCoords(location);
//     if (coords) {
//       addPriceMarker(coords.lat, coords.lng, data.estimated_price.toFixed(2));
//     }
//   });
// }

// // ----------------------
// // On page load: populate locations
// // ----------------------
// function onPageLoad() {
//   console.log("document loaded");

//   var url = "https://price-prediction-backend-4.onrender.com/get_location_names";
//   $.get(url, function (data, status) {
//     console.log("got response for get_location_names request");

//     if (data) {
//       var locations = data.locations;
//       var uiLocations = document.getElementById("uiLocations");
//       $('#uiLocations').empty();
//       $('#uiLocations').append('<option disabled selected>Select Location</option>');

//       for (var i in locations) {
//         var opt = new Option(locations[i], locations[i]);
//         $('#uiLocations').append(opt);
//       }
//     }
//   });
// }

// window.onload = onPageLoad;

// // ----------------------
// // Leaflet Map setup
// // ----------------------

// // Initialize Leaflet Map (Bangalore coordinates: 12.9716° N, 77.5946° E)
// var map = L.map('bangaloreMap').setView([12.9716, 77.5946], 12);

// // Add OpenStreetMap tiles
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   maxZoom: 19,
// }).addTo(map);

// // Add default marker for Bangalore
// L.marker([12.9716, 77.5946])
//   .addTo(map)
//   .bindPopup('<b>Bangalore</b><br>Welcome to the Garden City!')
//   .openPopup();

// // ----------------------
// // Function to add markers for predicted prices
// // ----------------------
// function addPriceMarker(lat, lng, price) {
//   var marker = L.marker([lat, lng]).addTo(map);
//   marker.bindPopup(`<b>Predicted Price</b><br>₹${price} Lakh`).openPopup();
// }

// // ----------------------
// // Dummy coordinates for Bangalore locations
// // ----------------------
// function getLocationCoords(location) {
//   var coords = {
//     "Whitefield": {lat: 12.969, lng: 77.749},
//     "HSR Layout": {lat: 12.9121, lng: 77.6412},
//     "Indiranagar": {lat: 12.9719, lng: 77.6412},
//     "Koramangala": {lat: 12.9352, lng: 77.6245},
//     "Jayanagar": {lat: 12.925, lng: 77.5938},
//     "MG Road": {lat: 12.975, lng: 77.605},
//   };
//   return coords[location] || {lat: 12.9716, lng: 77.5946};
// }


// ----------------------
// Utility functions
// ----------------------

  var baseUrl = "https://price-prediction-backend-4.onrender.com";


// Get selected number of bathrooms
function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }
  return -1;
}

// Get selected BHK
function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }
  return -1;
}

// ----------------------
// Handle price estimation
// ----------------------
function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");

  var sqft = parseFloat(document.getElementById("uiSqft").value);
  var bhk = getBHKValue();
  var bath = getBathValue();
  var location = document.getElementById("uiLocations").value;
  var estPrice = document.getElementById("uiEstimatedPrice");

  if (!sqft || bhk <= 0 || bath <= 0 || !location) {
    alert("Please fill all fields correctly!");
    return;
  }

  // Update this URL when deploying
  var url = baseUrl + "/predict_home_price";

  $.ajax({
    url: url,
    type: "POST",
    data: {
      total_sqft: sqft,
      bhk: bhk,
      bath: bath,
      location: location
    },
    crossDomain: true,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function(data, status) {
    console.log(data.estimated_price);

    estPrice.innerHTML = "<h2>💰 Estimated Price: " + data.estimated_price.toString() + " Lakh</h2>";

    console.log(status);

    // Add marker on map for predicted price
    var coords = getLocationCoords(location);
    if (coords) {
      addPriceMarker(coords.lat, coords.lng, data.estimated_price.toFixed(2));
    }
  }
});
}

// ----------------------
// On page load: populate locations
// ----------------------
function onPageLoad() {
  console.log("document loaded");

  // Update this URL when deploying
  var url = baseUrl + "/get_location_names";
  
  $.ajax({
    url: url,
    type: "GET",
    crossDomain: true,
    headers: {
      "Accept": "application/json"
    },
    success: function(data, status) {
    console.log("got response for get_location_names request");

    if (data) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");
      $('#uiLocations').empty();
      $('#uiLocations').append('<option disabled selected>Select Location</option>');

      for (var i in locations) {
        var opt = new Option(locations[i], locations[i]);
        $('#uiLocations').append(opt);
      }
    }
  }});
}

window.onload = onPageLoad;

// ----------------------
// Leaflet Map setup
// ----------------------

// Initialize Leaflet Map (Bangalore coordinates: 12.9716° N, 77.5946° E)
var map = L.map('bangaloreMap').setView([12.9716, 77.5946], 12);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// Add default marker for Bangalore
L.marker([12.9716, 77.5946])
  .addTo(map)
  .bindPopup('<b>Bangalore</b><br>Welcome to the Garden City!')
  .openPopup();

// ----------------------
// Function to add markers for predicted prices
// ----------------------
function addPriceMarker(lat, lng, price) {
  var marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(`<b>Predicted Price</b><br>₹${price} Lakh`).openPopup();
}

// ----------------------
// Dummy coordinates for Bangalore locations
// ----------------------
function getLocationCoords(location) {
  var coords = {
    "Whitefield": {lat: 12.969, lng: 77.749},
    "HSR Layout": {lat: 12.9121, lng: 77.6412},
    "Indiranagar": {lat: 12.9719, lng: 77.6412},
    "Koramangala": {lat: 12.9352, lng: 77.6245},
    "Jayanagar": {lat: 12.925, lng: 77.5938},
    "MG Road": {lat: 12.975, lng: 77.605},
  };
  return coords[location] || {lat: 12.9716, lng: 77.5946};
}


