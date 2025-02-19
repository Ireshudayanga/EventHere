import React, { useEffect, useRef, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/Button';
import Map from '../../components/Map';
import ReminderCard from '../../components/ReminderCard';
import { useForm } from 'react-hook-form';
import Calender from '../../utils/Calender';

const AddEvent = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const fileInputRef = useRef(null);
  const { register, handleSubmit, reset, trigger, setError, clearErrors, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    fetch("/event.json")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const uniqueCategories = ["All", ...new Set(data.map((event) => event.category))];
          setCategories(uniqueCategories);
          setEvents(data);
        } else {
          console.error("Invalid data format: Expected an array");
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    if (selectedLocation[0] !== 6.9107712 || selectedLocation[1] !== 79.8851072) {
      clearErrors("eventLocation");
      setLocationError(false);
    }
    setValue("eventLocation", `Lat: ${selectedLocation[0]}, Lng: ${selectedLocation[1]}`);
  }, [selectedLocation, setValue, clearErrors]);

  useEffect(() => {
    setValue("eventLocation", `Lat: ${selectedLocation[0]}, Lng: ${selectedLocation[1]}`);
  }, [selectedLocation, setValue]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("eventImage", file);
      setPreviewImage(URL.createObjectURL(file));
      trigger("eventImage");
    }
  };

  const handleRemoveImage = () => {
    setValue("eventImage", null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };


  const onSubmit = async (data) => {
    console.log("🚀 Event Data Submitted:", data);

    if (selectedLocation[0] === 6.9107712 && selectedLocation[1] === 79.8851072) {
      setLocationError(true);
      setError("eventLocation", { type: "manual", message: "Please choose a location on the map!" });
      console.error("🚨 Event location is required!");
      return;
    }

    clearErrors("eventLocation");
    setLocationError(false);

    const formData = new FormData();
    formData.append("eventName", data.eventName);
    formData.append("eventTime", data.eventTime);
    formData.append("eventLocation", `Lat: ${selectedLocation[0]}, Lng: ${selectedLocation[1]}`);
    formData.append("eventDescription", data.eventDescription);
    formData.append("eventCategory", data.eventCategory);
    formData.append("signupRequired", data.signupRequired);
    formData.append("eventImage", data.eventImage);

    console.log("✅ Final Form Data:");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    reset({
      eventName: "",
      eventTime: "",
      eventLocation: "",
      eventDescription: "",
      eventCategory: "",
      signupRequired: "",
      eventImage: null,
    });

    setPreviewImage(null);
  };



  return (
    <div className="h-screen w-full">
      <SearchBar />
      {/* Main Content */}
      <div className="h-[92%] w-full md:w-[94%] mt-0 md:mt-4 rounded-none md:rounded-2xl md:shadow-2xl ml-auto">
        <div className="flex flex-col md:flex-row h-full p-3 md:p-7 gap-4 md:gap-4">

          {/* Left Section */}
          <div className="w-full md:w-[50%] flex flex-col gap-3 md:gap-5">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg h-[40vh] flex-grow ">
              <Map setSelectedLocation={setSelectedLocation} />
            </div>
            <div className="w-full md:max-h-52 flex flex-row gap-3 md:gap-5">
              <div className="bg-white text-black rounded-xl md:rounded-2xl shadow-lg p-3 flex flex-col flex-[3]">
                <p className="text-2xl text-center font-medium font-sans text-black">Your Ongoing Events</p>
                <div className="mt-5 mx-10 overflow-y-auto custom-scrollbar max-h-40">
                  {events.length > 0 ? events
                    .filter(event => event.category === 'volunteer')
                    .map((event, index) => (
                      <ReminderCard
                        key={index}
                        eventTitle={event.title}
                        eventTime={event.time}
                        eventDate={event.date}
                      />
                    )) : (
                    <p className="text-gray-500 text-sm">No events available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-[50%] h-full flex flex-col gap-3 md:gap-5">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-7 flex flex-col h-full overflow-auto scrollbar-hide">
              <p className="text-2xl text-black font-medium font-sans">Add Event</p>
              <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>

                {/* Event Name & Time */}
                <div className='flex gap-2'>
                  <input
                    {...register("eventName", { required: "Event name is required" })}
                    type="text"
                    placeholder="Event Name"
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black bg-gray-200"
                  />
                  {errors.eventName && <p className="text-red-500 text-sm">{errors.eventName.message}</p>}

                  <select
                    {...register("eventTime", { required: "Event time is required" })}
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-[#797979d9] bg-gray-200"
                  >
                    <option value="">Select Time</option>
                    {[...Array(24)].map((_, i) => (
                      <option key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                        {i.toString().padStart(2, "0")}:00
                      </option>
                    ))}
                  </select>
                  {errors.eventTime && <p className="text-red-500 text-sm">{errors.eventTime.message}</p>}
                </div>
                <div className="mt-4">
                  <label className="font-medium font-sans text-black">Event Location (Choose from Map)</label>
                  <div className="mt-2 border border-gray-400 rounded-lg bg-gray-100 px-4 py-3 shadow-sm flex flex-col items-start">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-gray-600 font-medium">Latitude:</span>
                      <span className="text-gray-800 font-semibold">{selectedLocation[0]}</span>
                    </div>
                    <div className="flex items-center justify-between w-full mt-1">
                      <span className="text-gray-600 font-medium">Longitude:</span>
                      <span className="text-gray-800 font-semibold">{selectedLocation[1]}</span>
                    </div>
                  </div>
                  {errors.eventLocation && <p className="text-red-500 text-sm mt-1">{errors.eventLocation.message}</p>}
                </div>



                {/* Calendar */}
                <div className="rounded-xl overflow-hidden mt-4 p-4">
                  <Calender date={selectedDate} setDate={setSelectedDate} />
                </div>

                {/* Event Description */}
                <textarea
                  {...register("eventDescription", { required: "Event description is required" })}
                  placeholder="Event Description"
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black bg-gray-200 resize-none"
                  rows="4"
                />
                {errors.eventDescription && <p className="text-red-500 text-sm">{errors.eventDescription.message}</p>}

                {/* Category & Signup Required */}
                <div className="mt-4 flex gap-3">
                  <select {...register("eventCategory", { required: "Event category is required" })} className="w-1/2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-[#797979d9] bg-gray-200">
                    <option value="">Select Category</option>
                    {categories.map((category, index) => category !== "All" && <option key={index} value={category}>{category}</option>)}
                  </select>
                  <select {...register("signupRequired", { required: "Signup requirement is required" })} className="w-1/2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-[#797979d9] bg-gray-200">
                    <option value="">Signup Required?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* Image Upload & Preview */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-4 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-[#797979d9] bg-gray-200"
                />

                <div className="flex justify-center items-center mt-3 flex-col">
                  {previewImage && (
                    <>
                      <img src={previewImage} alt="Event Preview" className="w-40 h-40 object-cover rounded-lg shadow-md" />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                      >
                        Remove Image
                      </button>
                    </>
                  )}
                </div>


                <div className='flex justify-center'>
                  <Button className='mt-4 px-20 py-3 rounded-lg ' type="submit">Add Event</Button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddEvent;
