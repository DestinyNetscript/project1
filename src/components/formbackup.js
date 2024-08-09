import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

 
const Form = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    url: '',
  });
  const [accessToken, setAccessToken] = useState('');
  const [googleEvents, setGoogleEvents] = useState([]);

  useEffect(() => {
    const config = {
      clientId: "492047046909-lruv8f23c82e9kv6mn8gau39tuom0vgh.apps.googleusercontent.com",
      apiKey: "AIzaSyDvsIaGeA_aZZVhisoRo0qqQA9UQmCTqjM",
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      scope: "https://www.googleapis.com/auth/calendar",
    };

    gapi.load('client:auth2', async () => {
      try {
        await gapi.client.init(config);
        console.log('Google Calendar API client initialized');

        // Check if the user is already signed in
        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        if (!isSignedIn) {
          // If not signed in, authenticate the user
          await gapi.auth2.getAuthInstance().signIn();
        }

        // Retrieve the access token
        const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
        setAccessToken(accessToken);
      } catch (error) {
        console.error('Error initializing Google Calendar API client:', error);
      }
    });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: "" });
    }
  };

 const handleSubmit = async e => {
  e.preventDefault();
  const eventSummary = 'React Event';
  const eventDescription = 'This is a demo event added via React.js';
  const eventStart = new Date().toISOString();
  const eventEnd = new Date(new Date().getTime() + 3600000).toISOString();

  try {
    const event = {
      summary: eventSummary,
      description: eventDescription,
      start: {
        dateTime: eventStart,
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: eventEnd,
        timeZone: 'Asia/Kolkata',
      },
    };

    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error('Failed to add event');
    }

    const eventData = await response.json();
    console.log('Event added successfully:', eventData);

    // Fetch Google events
    const eventsResponse = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    });

    const events = eventsResponse.result.items;
    setGoogleEvents(events);

    // Switch to case 6
    setStep(6);

  } catch (error) {
    console.error('Error adding event:', error);
  }
};


  const nextStep = () => {
  const newErrors = {};
 
  if (step === 1 && formData.name.trim() === "") {
    newErrors.name = "Please fill this in";
  } 
  if (step === 2 && formData.email.trim() === "") {
    newErrors.email = "Please fill this in";
  } 
  if ( step === 2 && formData.email.trim() !== "" && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email.trim())) {
    newErrors.email = "Enter a valid email";
  }
  if (step === 3 && formData.number.trim() === "") {
    newErrors.number = "Please fill this in";
  } 
  if ( step === 3 && formData.number.trim() !== "" && !/^\d{10}$/.test(formData.number.trim())) {
    newErrors.number = "Phone number must be 10 digits";
  }
  if (step === 4 && formData.url.trim() === "") {
    newErrors.url = "Please fill this in";
  }

  if (Object.keys(newErrors).length > 0) { 
    setErrors(newErrors);
    return;
  }
 
  setErrors({});
  setStep(prevStep => prevStep + 1);
};



  const prevStep = () => { 
     setErrors({ ...errors, name: "" });
    setStep(prevStep => prevStep - 1);
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>1 - Hello, what's your name? *</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Type your answer here..."
            />
            {errors.name && <div className="error">{errors.name}</div>}
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>2 - Whats your eMail? *</h2>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            />
            {errors.email && <div className="error">{errors.email}</div>}
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>3 - Whats your phone number? *</h2>
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="(201) 555-0123"
            />
            {errors.number && <div className="error">{errors.number}</div>}
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 4:
        return (
          <div>
            <h2>4 - What's the URL of your store? *</h2>
            <span>E.g.: www.theoodie.com</span>
            <input
              type="type"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://"
            />
            {errors.url && <div className="error">{errors.url}</div>}
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 5:
        return (
          <div>
            <h2>5 - What is your average monthly revenue? *</h2>
            <div className="cust_radio">
              <input
                type="radio"
                id="a"
                name="revenue"
                value="0 - $250,000"
                checked={formData.revenue === "0 - $250,000"}
                onChange={handleChange}
              />
              <label htmlFor="a">0 - $250,000</label>
            </div> 

            <div className="cust_radio">
              <input
                type="radio"
                id="b"
                name="revenue"
                value="$250,000 - $500,000"
                checked={formData.revenue === "$250,000 - $500,000"}
                onChange={handleChange}
              />
              <label htmlFor="b">$250,000 - $500,000</label>
            </div> 

            <div className="cust_radio">
              <input
                type="radio"
                id="c"
                name="revenue"
                value="$500,000 - $1,000,000"
                checked={formData.revenue === "$500,000 - $1,000,000"}
                onChange={handleChange}
              />
              <label htmlFor="c">$500,000 - $1,000,000</label>
            </div> 

            <div className="cust_radio">
              <input
                type="radio"
                id="d"
                name="revenue"
                value="$1,000,000 - $1,500,000"
                checked={formData.revenue === "$1,000,000 - $1,500,000"}
                onChange={handleChange}
              />
              <label htmlFor="d">$1,000,000 - $1,500,000</label>
            </div> 

            <div className="cust_radio">
              <input
                type="radio"
                id="e"
                name="revenue"
                value="$1,500,000+"
                checked={formData.revenue === "$1,500,000+"}
                onChange={handleChange}
              />
              <label htmlFor="e">$1,500,000+</label>
            </div> 

            <button onClick={prevStep}>Previous</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        ); 
        case 6:
        return (
          <div>
            <h2>Calendar</h2>
            {googleEvents.map(event => (
              <div id="g_event" key={event.id}>
                <h3>{event.summary}</h3>
                <p>{event.description}</p>
                <span><b>Start:</b> {event.start.dateTime}</span>
                <span><b>End:</b> {event.end.dateTime}</span>
              </div>
            ))}
          </div>
        ); 
      default:
        return null;
    }
  };

  return (
    <div> 
      <section className="form">
        <div className="container">
          <div className="form_content">
            <h2>Accelerated Growth Model Demo</h2>
            <p>Answer the short questionnaire below so we have the details needed to help you on your call.</p>
            <div className="formData">
              {renderForm()}  
            </div>
          </div> 
        </div>
      </section> 
      
    </div>
  );
};

export default Form;