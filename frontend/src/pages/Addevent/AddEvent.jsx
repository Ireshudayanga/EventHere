import React, { useEffect, useState } from 'react';
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

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

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

  // ✅ Handle form submission
  const onSubmit = (data) => {
    data.eventDate = selectedDate;
    console.log("Event Data:", data);
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
              <Map />
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
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-[#797979d9] bg-gray-200"
                  >
                    <option value="">Select Time</option>
                    <option value="07:00 AM">07:00 AM</option>
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                    <option value="09:00 PM">09:00 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                    <option value="11:00 PM">11:00 PM</option>
                  </select>
                  {errors.eventTime && <p className="text-red-500 text-sm">{errors.eventTime.message}</p>}
                </div>

                {/* Calendar Section */}
                <div className='mt-4 md:max-h-52 overflow-auto custom-scrollbar'>
                  <Calender
                    className='bg-gray-200 rounded-xl md:rounded-2xl shadow-lg w-full'
                    date={selectedDate}
                    setDate={setSelectedDate}
                  />
                </div>
                <div className='mt-4'>
                  <textarea
                    {...register("eventDescription", { required: "Event description is required" })}
                    placeholder="Event Description"
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black bg-gray-200 resize-none"
                    rows="4"
                  />
                  {errors.eventDescription && <p className="text-red-500 text-sm">{errors.eventDescription.message}</p>}
                </div>
                <div className="mt-4 flex gap-3">
                  {/* Event Category */}
                  <div className="w-1/2 relative">
                    <select
                      {...register("eventCategory", { required: "Event category is required" })}
                      className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-[#797979d9] bg-gray-200"
                    >
                      <option className="text-gray-400" value="">Select Category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>

                    {errors.eventCategory && <p className="text-red-500 text-sm">{errors.eventCategory.message}</p>}
                  </div>

                  {/* Signup Required */}
                  <div className="w-1/2 relative">
                    <select
                      {...register("signupRequired", { required: "Signup requirement is required" })}
                      className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-[#797979d9] bg-gray-200"
                    >
                      <option value="">Signup Required</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>

                    {errors.signupRequired && <p className="text-red-500 text-sm">{errors.signupRequired.message}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700 font-medium">Upload Event Image</label>
                  <input
                    {...register("eventImage", { required: "Event image is required" })}
                    type="file"
                    accept="image/*"
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black bg-gray-200"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setValue("eventImage", file);
                      }
                    }}
                  />
                  {errors.eventImage && <p className="text-red-500 text-sm">{errors.eventImage.message}</p>}
                </div>

                {/* Preview Section */}
                {watch("eventImage") instanceof File && (
                  <div className="mt-3 flex justify-center">
                    <img
                      src={URL.createObjectURL(watch("eventImage"))}
                      alt="Event Preview"
                      className="w-40 h-40 object-cover rounded-lg shadow-md"
                      onLoad={(e) => URL.revokeObjectURL(e.target.src)} // Free memory after loading
                    />
                  </div>
                )}



                <div className='mt-4 flex  justify-center'>
                  <Button className='rounded-xl px-20 py-3' type="submit">Add Event</Button>
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
