async function generateAccessToken(apiKey) {
  const loginUrl = 'https://client-sandbox-verification-api.pre.enncrypto.com/auth/login';

  const response = await fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({ /* login payload */ })
  });

  if (response.ok) {
    const data = await response.json();
    const accessToken = data.access_token;
    return accessToken;
  } else {
    throw new Error('Failed to generate access token');
  }
}

// Usage:
const apiKey = 'B6Vge8Z3jZLBQSDdEjFXhiv6XheXCm15o';
generateAccessToken(apiKey)
  .then(accessToken => {
    // Proceed to the next step
    // Store the accessToken for later use
  })
  .catch(error => {
    console.error('Error generating access token:', error);
  });

async function getProductConfigId(accessToken, productScanId) {
  const fetchExperienceUrl = `https://client-sandbox-verification-api.pre.enncrypto.com/fetch-experience`;

  const response = await fetch(fetchExperienceUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    const productConfigId = data.product_config_id;
    return productConfigId;
  } else {
    throw new Error('Failed to get product_config_id');
  }
}

// Usage:
const productScanId = 'your_product_scan_id';
getProductConfigId(accessToken, productScanId)
  .then(productConfigId => {
    // Proceed to the next step
    // Store the productConfigId for later use
  })
  .catch(error => {
    console.error('Error getting product_config_id:', error);
  });

async function startSession(accessToken, productConfigId) {
  const startSessionUrl = 'https://client-sandbox-verification-api.pre.enncrypto.com/verify/start-session';

  const response = await fetch(startSessionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      product_config_id: productConfigId,
      geo_location: { /* geo_location details */ },
      session_metadata: { /* session_metadata details */ }
    })
  });

  if (response.ok) {
    const data = await response.json();
    const sessionId = data.session_id;
    return sessionId;
  } else {
    throw new Error('Failed to start session');
  }
}

// Usage:
startSession(accessToken, productConfigId)
  .then(sessionId => {
    // Proceed to the next step
    // Store the sessionId for later use
  })
  .catch(error => {
    console.error('Error starting session:', error);
  });

async function uploadImage(accessToken, sessionId, photo) {
  const uploadImageUrl = `https://client-sandbox-verification-api.pre.enncrypto.com/verify/upload-image`;

  const formData = new FormData();
  formData.append('image', photo, 'image.jpg');

  try {
    const response = await fetch(uploadImageUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      // Handle the response data as needed
      console.log('Image uploaded successfully:', data);
    } else {
      console.error('Failed to upload image:', response.status);
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

const accessToken = 'your-access-token';
const sessionId = 'your-session-id';
const imageFile = document.getElementById('imageInput').files[0];

uploadImage(accessToken, sessionId, imageFile)
  .then(() => {
    // Image uploaded successfully, handle the next steps or update UI
    console.log('Image uploaded successfully');
    // Update UI or perform additional actions
  })
  .catch(error => {
    // Handle the error, display error message, etc.
    console.error('Error uploading image:', error);
    // Display error message or perform error handling
  });



const apiUrl = 'https://client-sandbox-verification-api.pre.enncrypto.com/internal/health';

// Make the API request
fetch(apiUrl)
  .then(response => {
    if (response.ok) {
      console.log('API is healthy');
    } else {
      console.error(`API is not healthy. Status: ${response.status}`);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


const imageContainer = document.getElementById('imageContainer');
const captureButton = document.getElementById('captureButton');
const responseContainer = document.getElementById('responseContainer');

captureButton.addEventListener('click', async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const mediaStreamTrack = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(mediaStreamTrack);
    const photo = await imageCapture.takePhoto();
    displayImage(photo);
    sendToAPI(photo);
  } catch (error) {
    console.error('Error accessing camera:', error);
  }
});

function displayImage(photo) {
  const imageURL = URL.createObjectURL(photo);
  const img = document.createElement('img');
  img.src = imageURL;
  imageContainer.appendChild(img);
}

function sendToAPI(photo) {
  const formData = new FormData();
  formData.append('image', photo, 'image.jpg');

  fetch('https://api.example.com/process', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 13x3898c-h21b-4h99-bh78-h8hh04f5b31'
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      displayResponse(data);
    })
    .catch(error => {
      console.error('Error sending image to API:', error);
    });
}

function displayResponse(responseData) {
  responseContainer.innerHTML = '';

  const responseElement = document.createElement('p');
  responseElement.textContent = responseData.message;

  responseContainer.appendChild(responseElement);
}


// Check server health
const serverHealthUrl = 'https://client-sandbox-verification-api.pre.enncrypto.com/internal/health';
navigator.sendBeacon(serverHealthUrl, '');

// MULTILINGUAL 
document.getElementById('languageSelect').addEventListener('change', () => {
  const selectedLanguage = languageSelect.value;
  setLanguage(selectedLanguage);
});

function setLanguage(language) {
  // Add your language-specific text and localization logic here
  switch (language) {
    case 'en':
      // English localization
      document.documentElement.lang = 'en';
      break;
    case 'hi':
      // Hindi localization
      document.documentElement.lang = 'hi';
      break;
    case 'pa':
      // Punjabi localization
      document.documentElement.lang = 'pa';
      break;
    case 'es':
      // Spanish localization
      document.documentElement.lang = 'es';
      break;
    default:
      document.documentElement.lang = 'en';
      break;
  }

  // Update the content based on the selected language
  updateContent();
}

function updateContent() {
  const selectedLanguage = languageSelect.value;

  switch (selectedLanguage) {
    case 'en':
      // English localization
      document.getElementById('captureButton').textContent = 'Capture Image';
      // Update other text content in English
      break;
    case 'hi':
      // Hindi localization
      document.getElementById('captureButton').textContent = 'छवि कैप्चर करें';
      // Update other text content in Hindi
      break;
    case 'pa':
      // Punjabi localization
      document.getElementById('captureButton').textContent = 'ਚਿੱਤਰ ਕੈਪਚਰ ਕਰੋ';
      // Update other text content in Punjabi
      break;
    case 'es':
      // Spanish localization
      document.getElementById('captureButton').textContent = 'Capturar Imagen';
      // Update other text content in Spanish
      break;
    default:
      // Default to English localization
      document.getElementById('captureButton').textContent = 'Capture Image';
      // Update other text content in English
      break;
  }
  switch (selectedLanguage) {
    case 'en':
      document.getElementById('pageTitle').textContent = 'Product Verification';
      break;
    case 'hi':
      document.getElementById('pageTitle').textContent = 'उत्पाद सत्यापन';
      break;
    case 'pa':
      document.getElementById('pageTitle').textContent = 'ਪਰਮਾਣਿਕਤਾ ਪ੍ਰਮਾਣਿਤ';
      break;
    case 'es':
      document.getElementById('pageTitle').textContent = 'Verificación del Producto';
      break;
    default:
      document.getElementById('pageTitle').textContent = 'Product Verification';
      break;
  }
  switch (selectedLanguage) {
    case 'en':
      document.querySelector('#languageSelect option[value="en"]').textContent = 'English';
      break;
    case 'hi':
      document.querySelector('#languageSelect option[value="hi"]').textContent = 'हिंदी';
      break;
    case 'pa':
      document.querySelector('#languageSelect option[value="pa"]').textContent = 'ਪੰਜਾਬੀ';
      break;
    case 'es':
      document.querySelector('#languageSelect option[value="es"]').textContent = 'Español';
      break;
    default:
      document.querySelector('#languageSelect option[value="en"]').textContent = 'English';
      break;
  }

}

// Initial content update
setLanguage('en');