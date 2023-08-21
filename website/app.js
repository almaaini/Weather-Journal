/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const apiKey = '4563587d37dda202a8b120e8c451fecf&units=metric'; 
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getWeatherData = async (zipCode) => {
    const url = `${baseUrl}?zip=${zipCode}&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data from OpenWeatherMap API.');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  document.getElementById('generate').addEventListener('click', () => {
    const zipCode = document.getElementById('zip').value;
    
    getWeatherData(zipCode)
      .then((data) => {
         
        postData('/add', {
          temperature: data.main.temp,
          date: new Date().toLocaleDateString(),
          userResponse: document.getElementById('feelings').value,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const postData = async (path, data) => {
    try {
      const response = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to post data to the server.');
      }
      
      updateUI();
    } catch (error) {
      console.error(error);
    }
  };



  const updateUI = async () => {
    try {
      const response = await fetch('/get');
      if (!response.ok) {
        throw new Error('Failed to retrieve data from the server.');
      }
      const data = await response.json();
      
      document.getElementById('temp').textContent = `Temperature: ${data.temperature} C`;
      document.getElementById('date').textContent = `Date: ${data.date}`;
      document.getElementById('content').textContent = `You Feel: ${data.userResponse}`;
    } catch (error) {
      console.error(error);
    }
  };
  