// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Array of cities with their Arabic and English names
  let cities = [
    {
      arabicName: "أسوان",
      name: "Aswān",
    },
    {
      arabicName: "أسيوط",
      name: "Asyūţ",
    },
    {
      arabicName: "الأقصر",
      name: "Al Uqşur",
    },
    {
      arabicName: "الإسكندرية",
      name: "Al Iskandarīyah",
    },
    {
      arabicName: "الإسماعيلية",
      name: "Al Ismā'īlīyah",
    },
    {
      arabicName: "البحر الأحمر",
      name: "Al Baḩr al Aḩmar",
    },
    {
      arabicName: "البحيرة",
      name: "Al Buḩayrah",
    },
    {
      arabicName: "الجيزة",
      name: "Al Jīzah",
    },
    {
      arabicName: "الدقهلية",
      name: "Ad Daqahlīyah",
    },
    {
      arabicName: "السويس",
      name: "As Suways",
    },
    {
      arabicName: "الشرقية",
      name: "Ash Sharqīyah",
    },
    {
      arabicName: "الغربية",
      name: "Al Gharbīyah",
    },
    {
      arabicName: "الفيوم",
      name: "Al Fayyūm",
    },
    {
      arabicName: "القاهرة",
      name: "Al Qāhirah",
    },
    {
      arabicName: "القليوبية",
      name: "Al Qalyūbīyah",
    },
    {
      arabicName: "المنُوفيّة",
      name: "Al Minūfīyah",
    },
    {
      arabicName: "المنيا",
      name: "Al Minyā",
    },
    {
      arabicName: "الوادي الجديد",
      name: "Al Wādī al Jadīd",
    },
    {
      arabicName: "بني سويف",
      name: "Banī Suwayf",
    },
    {
      arabicName: "بورسعيد",
      name: "Būr Sa‘īd",
    },
    {
      arabicName: "جنوب سيناء",
      name: "Janūb Sīnā'",
    },
    {
      arabicName: "دمياط",
      name: "Dumyāţ",
    },
    {
      arabicName: "سوهاج",
      name: "Sūhāj",
    },
    {
      arabicName: "شمال سيناء",
      name: "Shamāl Sīnā'",
    },
    {
      arabicName: "قنا",
      name: "Qinā",
    },
    {
      arabicName: "كفر الشيخ",
      name: "Kafr ash Shaykh",
    },
    {
      arabicName: "مطروح",
      name: "Maţrūḩ",
    },
  ];

  // Populate the dropdown list with cities
  for (const city of cities) {
    const content = `<option>${city.arabicName}</option>`;
    document.getElementById("cities-select").innerHTML += content;
  }

  // Add an event listener to the city dropdown list
  document
    .getElementById("cities-select")
    .addEventListener("change", function () {
      // Update the displayed city name
      document.getElementById("city-name").innerHTML = this.value;

      // Find the corresponding English name for the selected Arabic city name
      let cityName = "";
      for (const city of cities) {
        if (city.arabicName == this.value) {
          cityName = city.name;
        }
      }

      // Get prayer timings for the selected city
      getPrayersTimingsOfCity(cityName);
    });

  // Function to get prayer timings for a given city
  function getPrayersTimingsOfCity(cityName) {
    // Set up parameters for the API request
    let params = {
      country: "EG",
      city: cityName,
    };

    // Make an HTTP GET request to the prayer timings API
    axios
      .get("https://api.aladhan.com/v1/timingsByCity", {
        params: params,
      })
      .then(function (response) {
        // Extract prayer timings from the API response
        const timings = response.data.data.timings;

        // Fill in the HTML elements with the prayer timings
        fillTimeForPrayer("fajr-time", timings.Fajr);
        fillTimeForPrayer("sunset-time", timings.Sunset);
        fillTimeForPrayer("dhuhr-time", timings.Dhuhr);
        fillTimeForPrayer("asr-time", timings.Asr);
        fillTimeForPrayer("maghrib-time", timings.Maghrib);
        fillTimeForPrayer("isha-time", timings.Isha);

        // Log the full API response for debugging purposes
        console.log(response);

        // Display the date in the specified format
        document.getElementById("date").innerHTML =
          response.data.data.date.hijri.weekday.ar +
          " " +
          response.data.data.date.readable;
      })
      .catch(function (error) {
        // Log any errors that occur during the API request
        console.log(error);
      });
  }

  // Get prayer timings for Aswan as an initial display
  getPrayersTimingsOfCity("Aswān");

  // Function to fill in the HTML element with the specified ID with a given time
  function fillTimeForPrayer(id, time) {
    document.getElementById(id).innerHTML = time;
  }
});
