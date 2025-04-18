import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Calender from '../utils/Calender';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button';


const EditEvent = () => {
  const { state: event } = useLocation();
  const { _id: eventId } = event || {};
  //console.log("🚀 Event ID:", eventId);
  //console.log("🚀 Event Details:", event);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const parseValidDate = (inputDate) => {
    const date = new Date(inputDate);
    return isNaN(date.getTime()) ? new Date() : date;
  };
  
  const [selectedDate, setSelectedDate] = useState(parseValidDate(event?.date));
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(["entertainment", "volunteer", "traditional"]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (event) {
      setValue("eventName", event.title);
      setValue("eventTime", event.time);
      setValue("eventCategory", event.category);
      setValue("signupRequired", event.signupRequired ? "true" : "false");
      setValue("eventDescription", event.description || "");
    }
  }, [event, setValue]);

  useEffect(() => {
    axiosPublic.get("/api/special-category/active")
      .then((res) => {
        if (res.data.success) {
          const special = res.data.category;
          setCategories((prev) => (
            prev.includes(special) ? prev : [special, ...prev]
          ));
          
        }
      })
      .catch((err) => {
        console.error("Error fetching special category:", err);
      });
  }, [axiosPublic]);

  const onSubmit = async (data) => {
    setLoading(true);
    const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;
      

    const updatedEvent = {
      title: data.eventName,
      time: data.eventTime,
      date: formattedDate,
      signupRequired: data.signupRequired === "true",
      category: data.eventCategory,
      description: data.eventDescription,
    };

    try {
      const res = await axiosSecure.patch(`/events/${eventId}`, updatedEvent);
      if (res.status === 200) {
        toast.success("✅ Event updated successfully!");
        setTimeout(() => navigate("/events"), 1500);
      } else {
        toast.error("⚠️ Something went wrong!");
      }
    } catch (err) {
      console.error("Edit error:", err);
      toast.error("🚨 Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Event</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Event Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Event Name</label>
          <input
            {...register("eventName", { required: "Event name is required" })}
            className="mt-1 text-gray-600 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
          />
          {errors.eventName && <p className="text-red-500 text-sm">{errors.eventName.message}</p>}
        </div>

        {/* Event Time */}
        <div>
          <label className="text-sm font-medium text-gray-700">Event Time</label>
          <select
            {...register("eventTime", { required: "Time is required" })}
            className="mt-1 text-gray-600  block w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select time</option>
            {[...Array(24)].map((_, i) => (
              <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                {i.toString().padStart(2, '0')}:00
              </option>
            ))}
          </select>
          {errors.eventTime && <p className="text-red-500 text-sm">{errors.eventTime.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="text-sm font-medium text-gray-700">Event Date</label>
          <div className="border border-gray-300 rounded-lg bg-white">
            <Calender date={selectedDate} setDate={setSelectedDate} />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            {...register("eventCategory", { required: "Category is required" })}
            className="mt-1 text-gray-600  block w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.eventCategory && <p className="text-red-500 text-sm">{errors.eventCategory.message}</p>}
        </div>

        {/* Signup Required */}
        <div>
          <label className="text-sm font-medium text-gray-700">Signup Required?</label>
          <select
            {...register("signupRequired", { required: "This field is required" })}
            className="mt-1 text-gray-600  block w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors.signupRequired && <p className="text-red-500 text-sm">{errors.signupRequired.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register("eventDescription", {
              required: "Description is required",
              validate: (value) => {
                const wordCount = value.trim().split(/\s+/).length;
                return wordCount <= 30 || "Description must be 30 words max.";
              },
            })}
            rows="4"
            placeholder="Enter a brief description (max 30 words)"
            className="mt-1 text-gray-600  block w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
          />
          {errors.eventDescription && <p className="text-red-500 text-sm">{errors.eventDescription.message}</p>}
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-6">
          <Button type="submit" className="px-6 py-2 rounded-lg">
            {loading ? "Updating..." : "Update Event"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
