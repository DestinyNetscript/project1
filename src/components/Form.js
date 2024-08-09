
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import Calendar from 'react-calendar'; 
import axios from 'axios';

const Form = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    url: '',
    timeSlots: [],
    revenue: '',
    founder: '',
    about: '',
  });  
  const [errorsn, setErrorsn] = useState({});
  const [accessToken, setAccessToken] = useState('');
  const [googleEvents, setGoogleEvents] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState('');
  const [timeSlotSelected, setTimeSlotSelected] = useState(false);
  const [datesWithEvents, setDatesWithEvents] = useState([]);
  const [timeSlotsForDates, setTimeSlotsForDates] = useState({});  
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);  
  const [startDate, setStartDate] = useState(null);
  const [selectedDatex, setSelectedDatex] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [availableTimeSlot, setAvailableTimeSlot] = useState([]);
  const [busyTimeSlots, setBusyTimeSlots] = useState([]);
  const [events, setEvents] = useState([]);
  const [nextButtonVisible, setNextButtonVisible] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(''); 

  const handleTimeSlotChange = (e) => {
    try {
      const slot = e.target.value;
      const selectedDateTime = new Date(selectedDate);
      const [hours, minutes] = slot.split(':');
      selectedDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0); 
      const isoSelectedDate = selectedDateTime.toISOString().split('T')[0];
      const hasEvents = availableDates.includes(isoSelectedDate); 
      if (!hasEvents) { 
        return;
      } 
      const filteredTimeSlots = timeSlotsForDates[isoSelectedDate] || [];
      const filteredTimeSlotsAfterSelectedTime = filteredTimeSlots.filter(timeSlot => {
        const [slotHours, slotMinutes] = timeSlot.split(':');
        const slotDateTime = new Date(selectedDateTime);
        slotDateTime.setHours(parseInt(slotHours), parseInt(slotMinutes), 0, 0);
        return slotDateTime > selectedDateTime;
      });

      setTimeSlots(filteredTimeSlotsAfterSelectedTime);
    } catch (error) {
      console.error('Error handling time slot change:', error); 
    }
  };  
  const handleNextAfterTimeSlot = () => { 
  }; 
 
  const generateTimeSlots = () => {
    const timeSlots = [];
    const now = new Date();
    const startTime = new Date(now.getTime());
    startTime.setHours(now.getHours() + 1, 0, 0, 0);
    const endTime = new Date().setHours(23, 0, 0);
    const interval = 60 * 60 * 1000; 
    for (let time = startTime.getTime(); time <= endTime; time += interval) {
      const formattedTime = new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      timeSlots.push(formattedTime);
    }
    return timeSlots;
  }; 

  const filterAvailableTimeSlots = (allTimeSlots, busyTimeSlots) => {
    const currentTime = new Date(); 

    return allTimeSlots.filter(timeSlot => {
      const [hours, minutes] = timeSlot.split(':'); 
      const slotDateTime = new Date(currentTime);
      slotDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0); 
      const isFuture = slotDateTime > currentTime;
      const isBusy = busyTimeSlots.some(busySlot => {
        return slotDateTime >= busySlot.start && slotDateTime < busySlot.end;
      }); 
      return isFuture && !isBusy;
    }); 
    console.log("allTimeSlots", allTimeSlots);
  }; 

  const fetchTimeSlotsForDates = async () => {
    const newTimeSlotsForDates = {}; // Create a new object to store time slots for dates
    for (const date of datesWithEvents) {
      const timeSlots = await fetchAvailableTimeSlots(date);
      newTimeSlotsForDates[date] = timeSlots; // Assign time slots to the corresponding date
    }
    setTimeSlotsForDates(newTimeSlotsForDates); // Update the state with the new time slots
  }; 

  const fetchAvailableTimeSlots = async (date) => {
    try {
      setLoading(true);
      const eventsResponse = await gapi.client.calendar.events.list({
        calendarId: 'flyhighdua@gmail.com',
        timeMin: new Date(date).toISOString(),
        showDeleted: false,
        singleEvents: true,
        timeZone: 'Asia/Kolkata',
        maxResults: 10,
        orderBy: 'startTime'
      });
      const events = eventsResponse.result.items; 
      const busyTimeSlots = events.map(event => {
      const startDateTime = new Date(event.start.dateTime);
      const endDateTime = new Date(event.end.dateTime);
 
        return {
          start: startDateTime.getTime(),
          end: endDateTime.getTime()
        };
      }); 
      const allTimeSlots = generateTimeSlots();
      const availableTimeSlots = filterAvailableTimeSlots(allTimeSlots, busyTimeSlots);
      setLoading(false);
      return availableTimeSlots;
    } 
    catch (error) {
      console.error('Error fetching time slots:', error);
      setLoading(false);
      return [];
    }
  };

  const handleDateChange = async (newDate) => {
    console.log('New Date:', newDate); 
    setSelectedDate(newDate); 
    setSelectedDatex(newDate); 
    await fetchEventsForDate(newDate);
  };  

  const fetchAvailableDates = async () => {
    try { 
      let  eventsResponse;
      const date = startDate.toISOString().split('T')[0];
      await axios.get(`http://localhost:5000/get-events?date=${date}`) 
      .then(response => {
        eventsResponse = response.data;
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events: ', error);
        alert('Error fetching events');
      });
 
      const datesWithEvents = events.map(event => {
        const startDateTime = new Date(event.start.dateTime);
        return {
          date: startDateTime.toISOString().split('T')[0],
          startTime: startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      });   
      console.log('Dates With Events:', datesWithEvents); 
      setGoogleEvents(events); 
      setAvailableDates(datesWithEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } 
  }; 

  const handleChange = (e) => {
    const { name, value, type, checked, aboutus } = e.target;
    if (type === 'checkbox') {
      setFormData(prevData => ({
        ...prevData,
        timeSlots: checked
          ? [...prevData.timeSlots, value]
          : prevData.timeSlots.filter(slot => slot !== value)
      }));
    } else {
      if (name in formData) {
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      } 
    }
  };
 
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
        const isoDate = date.toISOString().split('T')[0];
        if (isoDate === selectedDate.toISOString().split('T')[0]) {
            return 'selected-date';
        }
        if (availableDates.includes(isoDate)) {
            return 'event-date';
        }
        if (date < new Date()) {
            return 'past-date';
        }
    }
    return null;
  };
  
  const fetchEventsForDate = async (selectedDate) => {
    try {
        console.log("selected Date ----------", selectedDate);
        let date = new Date(selectedDate);
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
        let day = date.getDate().toString().padStart(2, '0');
        date = `${year}-${month}-${day}`;
        
        let eventsResponse;
        setEvents([]);
        await axios.get(`http://localhost:5000/get-events?date=${date}`)
            .then(response => {
                eventsResponse = response.data;
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events: ', error);
                alert('Error fetching events');
            }); 

        // Generate time slots from 9am to 11pm
        const startTime = new Date(date).setHours(9, 0, 0, 0); // Set start time to 9am
        const endTime = new Date(date).setHours(23, 0, 0, 0); // Set end time to 11pm
        const interval = 60 * 60 * 1000; // 1 hour in milliseconds

        const allTimeSlots = [];
        for (let time = startTime; time <= endTime; time += interval) {
            const formattedTime = new Date(time).toISOString();
            allTimeSlots.push(formattedTime);
        }

        // Filter out time slots that coincide with events
        const busyTimeSlots = eventsResponse.map(event => {
            return { start: new Date(event.start.dateTime), end: new Date(event.end.dateTime) };
        });

        const currentTime = new Date(); // Get the current time

        const availableTimeSlots = allTimeSlots.filter(timeSlot => {
            const slotStart = new Date(timeSlot);
            const slotEnd = new Date(slotStart.getTime() + interval); 
            if (slotStart <= currentTime) {
                return false;
            } 
            for (const busySlot of busyTimeSlots) {
                if (
                    (slotStart >= busySlot.start && slotStart < busySlot.end) ||  
                    (slotEnd > busySlot.start && slotEnd <= busySlot.end) ||  
                    (slotStart <= busySlot.start && slotEnd >= busySlot.end) 
                ) {
                    return false; 
                }
            }
            return true; 
        }).map(timeSlot => { 
            return new Date(timeSlot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        }); 
        console.log("availableTimeSlots", availableTimeSlots); 
        setAvailableTimeSlots(availableTimeSlots);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}; 

  const handleNextAndFetchEvents = async (selectedDate) => {
    try {  
      setStep(6); 
      setNextButtonVisible(true);   
      let  eventsResponse; 
      await axios.get(`http://localhost:5000/get-events?date=${date}`)
        .then(response => {
          eventsResponse = response.data;
          setEvents(response.data);
        })
        .catch(error => {
          console.error('Error fetching events: ', error);
          alert('Error fetching events');
        }); 
        console.log('Events for dfsdfsdfsdfsdf', date + ':', events);  
      const busyTimeSlots = eventsResponse.map(event => {
        const startDateTime = new Date(event.start.dateTime);
        const endDateTime = new Date(event.end.dateTime);
        return {
          start: startDateTime.getTime(),
          end: endDateTime.getTime()
        };
      });

      const allTimeSlots = generateTimeSlots();
      const availableTimeSlots = filterAvailableTimeSlots(allTimeSlots, busyTimeSlots);
      setTimeSlots(availableTimeSlots); 
      setStartDate(startDate);
      setEndDate(endDate);
      setEvents(eventsResponse);
      setBusyTimeSlots(busyTimeSlots);
      setAvailableTimeSlots(availableTimeSlots); 
      console.log("Available Time Slotsx:", availableTimeSlots);
      console.log("busyTimeSlots:", busyTimeSlots);
      console.log("Events:", events); 
    } catch (error) {
      console.error('Error fetching events:', error);
    }   
  }; 

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    const newErrors = {}; 
    if (step === 7 && formData.about.trim() === "") {
      newErrors.about = "Please fill this in";
    }  
    if (Object.keys(newErrors).length > 0) { 
      setErrors(newErrors);
      return;
    }
    setErrors({}); 
    setLoading(true); 
    if (!formData.timeSlots || formData.timeSlots.length === 0) {
      console.error('No time slots selected');
      setErrors({ timeSlots: 'Please select at least one time slot' });
      return;
    }

    try {
      for (const timeSlot of formData.timeSlots) {
        const [hours, minutes] = timeSlot.split(':');
        const startDateTime = new Date(selectedDate);
        startDateTime.setHours(parseInt(hours));
        startDateTime.setMinutes(parseInt(minutes));
        const endDateTime = new Date(startDateTime.getTime() + 3600000);

        const event = {
          summary: 'Meeting with Digvijay',
          location: 'Asia/Kolkata',
          description: 'Web conferencing details provided upon confirmation.',
          start: startDateTime.toISOString(),
          end: endDateTime.toISOString(),
          email: formData.email,
          number: formData.number,
          url: formData.url,
          name: formData.name,
          revenue: formData.revenue,
          about: formData.about
        };

        const response = await fetch('http://localhost:5000/add-event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        });

        if (!response.ok) {
          throw new Error('Failed to add event');
        }

        const eventData = await response.text();
        console.log('Event added successfully:', eventData);
      }

      await fetchGoogleEvents();
      setSuccessMessage('Event added successfully!');
      setNextButtonVisible(true);
      setLoading(false);
      setStep(prevStep => prevStep + 1);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  }; 

  const fetchGoogleEvents = async () => {
    try {
      let  eventsResponse;
        const date = startDate.toISOString().split('T')[0];
         await axios.get(`http://localhost:5000/get-events?date=${date}`)
          .then(response => {
            eventsResponse = response.data;
            setEvents(response.data);
          })
          .catch(error => {
            console.error('Error fetching events: ', error);
            alert('Error fetching events');
          }); 
        console.log('Events for', date + ':', events);
      setGoogleEvents(events);
    } catch (error) {
      console.error('Error fetching events:', error);
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
    if (step === 2 && formData.email.trim() !== "" && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email";
    }
    if (step === 3 && formData.number.trim() === "") {
      newErrors.number = "Please fill this in";
    } 
    if (step === 3 && formData.number.trim() !== "" && !/^\d{10}$/.test(formData.number.trim())) {
      newErrors.number = "Phone number must be 10 digits";
    }
    if (step === 4 && formData.url.trim() === "") {
      newErrors.url = "Please fill this in";
    }
    if (step === 5 && formData.revenue.trim() === "") {
      newErrors.revenue = "Select field";
    }
    if (Object.keys(newErrors).length > 0) { 
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStep(prevStep => prevStep + 1);
  }; 

  const handleTimeSlotSelect = (slot) => {
    setFormData(prevData => ({
      ...prevData,
      timeSlots: [slot]
    }));
    setTimeSlotSelected(true);
    setSelectedTimeSlot(slot);
  };
  const handleNextClick = () => {
    if (step === 6 && selectedTimeSlot) {
      setStep(7); // Navigate to case 7
    }
  };

  useEffect(() => { }, [selectedDate]);

  const selectedDateEvents = events.filter(event => {
    const eventDate = new Date(event.start.dateTime).toDateString();
    const selectedDateString = selectedDate.toDateString();
    return eventDate === selectedDateString;
  }); 
  const handleDateSelect = async (selectedDate) => {
    setSelectedDate(selectedDate);
    await fetchEventsForDate(selectedDate);
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
            <h2> 1 - Hello, what's your name? * </h2>
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
             {errors.revenue && <div className="error">{errors.revenue}</div>}

            <button onClick={prevStep}>Previous</button> 
            <button onClick={nextStep}>Next</button>
            {/* <button onClick={() => handleNextAndFetchEvents(selectedDate)}>Next</button> */}

          </div>
        ); 
        case 6:
        return ( 
            <div className="apiData">
              <div className="profile">
                <div className="profileName">
                  <h4>Digvijay Sharma</h4>
                  <h1>Strategy Call</h1>
                </div>
                <ul>
                  <li><i className="fa fa-clock"></i> 60 min</li>
                  <li><i className="fa fa-video"></i> Web conferencing details provided upon confirmation.</li>
                </ul>
                <p>Lets find out together if we can be a fit. Looking forward to our chat!</p>
              </div>
              <div className="calendar">
                <h4 className="mb_15">Select a Date & Time</h4>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  tileClassName={tileClassName} 
                  minDate={new Date()} 
                /> 
              </div>
              {selectedDatex && (
                  <div className="slots">
                    <h3 className="mb_15">Available Time Slots:</h3>
                    <ul className="timeslotdiv">
                      {availableTimeSlots.map((timeSlot, index) => (
                        <button
                          key={index}
                          className={selectedTimeSlot === timeSlot ? 'selected-time-slot' : 'time-slot'}
                          onClick={() => handleTimeSlotSelect(timeSlot)}
                        >
                          {timeSlot}
                        </button>
                      ))}
                    </ul>  
                    <button onClick={handleNextClick} disabled={!selectedTimeSlot}>
                      Next
                    </button>
                  </div>
                )} 
            </div>   
        ); 
      case 7:
        return (
          <div className="submitForm">
            <h3 className="mb_10">Enter Details</h3>
            <form>
              <label> 

                <input
                  type="text"
                  name="name"
                  value={formData.name }
                  onChange={handleChange}
                  placeholder="Name"
                />
                {errors.name && <div className="error">{errors.name}</div>}

              </label>
              <label>
                <span>Email *</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}  
                /> 
              </label>
              <label>
                <span>What is your phone number? *</span>
                <input
                  type="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange} 
                />
              </label>
              <label>
                <span>URL of your store: *</span>
                <input
                  type="type"
                  name="url"
                  value={formData.url}
                  onChange={handleChange} 
                />
              </label>
              <label>
                <p className="mb_10">What is your average monthly revenue? *</p>
                <div className="dFlex">
                   <input
                    type="radio"
                    name="revenue"
                    id="a"
                    value="0 - $250,000"
                    checked={formData.revenue === "0 - $250,000"}
                    onChange={handleChange}
                  />
                  <span for="a">0 - $250,000</span>
                </div>
                <div className="dFlex">
                   <input
                    type="radio"
                    name="revenue"
                    id="b"
                    value="$250,000 - $500,000"
                    checked={formData.revenue === "$250,000 - $500,000"}
                    onChange={handleChange}
                  />
                  <span for="b">$250,000 - $500,000</span>
                </div>
                <div className="dFlex">
                  <input
                    type="radio"
                    name="revenue"
                    id="v"
                    value="$500,000 - $1,000,000"
                    checked={formData.revenue === "$500,000 - $1,000,000"}
                    onChange={handleChange}
                  />
                  <span for="v">$500,000 - $1,000,000</span>
                </div>
                <div className="dFlex">
                   <input
                      type="radio"
                      name="revenue"
                      value="$1,000,000 - $1,500,000"
                      id="d"
                      checked={formData.revenue === "$1,000,000 - $1,500,000"}
                      onChange={handleChange}
                    />
                  <span for="d">$1,000,000 - $1,500,000</span>
                </div>
                <div className="dFlex">
                   <input
                      type="radio"
                      name="revenue"
                      value="$1,500,000+"
                      id="e"
                      checked={formData.revenue === "$1,500,000+"}
                      onChange={handleChange}
                    />
                  <span for="e">$1,500,000+</span>
                </div>
              </label> 
              <label>
                <span>Where did you hear about us? (YouTube, Facebook, LinkedIn, Recommendation) *</span>

                <input
                  type="text"
                  name="about"
                   value={formData.about}
                  onChange={handleChange}
                  placeholder="Name"
                />
                {errors.about && <div className="error">{errors.about}</div>} 
              </label>
            </form>  

            {loading && <div className="loader">
              <div className="loader" id="loader-2">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>}
            <button onClick={prevStep}>Previous</button>
            <button onClick={handleSubmit} disabled={loading}>Schedule Event</button> 
          </div>
        ); 
      case 8:
        return (
          <div className="submitForm text-center">
            <h1>Congrats! Your Demo has been booked successfully. </h1>
            <div className="success-message"><p>{successMessage}</p></div> 
            <NavLink to="/" className="homebtn">Back</NavLink>
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