import React, { useContext, useEffect, useRef, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/Button';
import Map from '../../components/mapType/Map';
import ReminderCard from '../../components/ReminderCard';
import { useForm } from 'react-hook-form';
import Calender from '../../utils/Calender';
import axios from 'axios';
import { use } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../redux/eventSlice"; // ✅ update path if needed




const AddEvent = () => {
  const { currentUser } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const fileInputRef = useRef(null);
  const { register, handleSubmit, reset, trigger, setError, clearErrors, setValue, formState: { errors } } = useForm();
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [specialCategory, setSpecialCategory] = useState(null);

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const dispatch = useDispatch();
  const { events: allEvents } = useSelector((state) => state.events);

  useEffect(() => {
    if (currentUser?.email) {
      dispatch(fetchEvents());
    }
  }, [dispatch, currentUser]);

  const userPostedEvents = allEvents.filter(event => event.userEmail === currentUser?.email);


  useEffect(() => {
    const fetchUserEmail = async () => {
      const userEmail = currentUser.email;
      setUserEmail(userEmail);
    };
    fetchUserEmail();
  }, [currentUser]);

  useEffect(() => {
    // Define default categories
    const defaultCategories = ["entertainment", "volunteer", "traditional"];

    // Fetch the special category from the backend
    axiosPublic.get("/api/special-category/active")
      .then((res) => {
        if (res.data.success) {
          setSpecialCategory(res.data.category);

          // Update the category list dynamically
          setCategories([...defaultCategories, res.data.category]);
        } else {
          setCategories([...defaultCategories]); // No special category, use defaults
        }
      })
      .catch((err) => {
        console.error("Error fetching special category:", err);
        setCategories([...defaultCategories]); // If error, fallback to default categories
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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



  const handleRemoveImage = () => {
    setValue("eventImage", null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };



  const onSubmit = async (data) => {
    setLoading(true);

    if (selectedLocation.length === 0) {
      setLocationError(true);
      setError("eventLocation", { type: "manual", message: "Please choose a location on the map!" });
      toast.error("Please choose a location on the map!", { position: "top-center" });
      return;
    }

    clearErrors("eventLocation");
    setLocationError(false);

    try {
      let imageUrl = "";

      // Upload image if a file is selected
      if (fileInputRef.current && fileInputRef.current.files[0]) {
        imageUrl = await uploadImage(fileInputRef.current.files[0]);
      }

      const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;

      const eventData = {
        title: data.eventName,
        time: data.eventTime,
        location: {
          type: "Point",
          coordinates: [selectedLocation[1], selectedLocation[0]],
        },
        description: data.eventDescription,
        category: data.eventCategory,
        signupRequired: data.signupRequired === "true",
        date: formattedDate,
        userEmail: userEmail,
        imageUrl: imageUrl,
      };

      const response = await axiosSecure.post("/events", eventData);

      if (response.status === 201) {
        setLoading(false);
        toast.success("🎉 Event added successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        reset({
          eventName: "",
          eventTime: "",
          eventLocation: "",
          eventDescription: "",
          eventCategory: "",
          signupRequired: "",
          eventImage: "",
        });

        setPreviewImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setSelectedLocation([]);
      } else {
        console.error("🚨 Unexpected Response:", response);
        toast.error("Something went wrong! Please try again.", { position: "top-center" });
      }
    } catch (error) {
      console.error("🚨 Event Creation Error:", error.response ? error.response.data : error);
      toast.error("Failed to create event! Try again later.", { position: "top-center" });
    }
  };


  // Function to upload image to Cloudinary
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "eventImage");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
        formData
      );

      if (response.data.secure_url) {
        console.log("✅ Image uploaded successfully:", response.data.secure_url);
        return response.data.secure_url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("🚨 Image Upload Error:", error);
      alert("Failed to upload image. Try again.");
      return "";
    }
  };






  return (
    <div className="h-screen w-full">
      <ToastContainer />
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
                <p className="text-2xl text-center font-medium font-sans text-black">Events You&apos;ve Posted</p>
                <div className="mt-5 mx-10 overflow-y-auto custom-scrollbar max-h-40">
                  {userPostedEvents.length > 0 ? userPostedEvents.map((event, index) => (
                    <ReminderCard
                      event={event}
                      key={event._id}
                      eventId={event._id}
                      eventTitle={event.title}
                      eventTime={event.time}
                      eventDate={event.date}
                      mode="edit"

                    />

                  )) : (
                    <p className="text-gray-500 text-sm">You haven&apos;t posted any events yet.</p>
                  )}

                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-[50%] h-full flex flex-col gap-3 md:gap-5">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-7 flex flex-col  md:overflow-auto scrollbar-hide">
              <p className="text-2xl text-black font-medium font-sans">Add Event</p>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">

                {/* 📝 Event Name & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                    <input
                      {...register("eventName", { required: "Event name is required" })}
                      type="text"
                      placeholder="Beach Cleanup"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                    {errors.eventName && <p className="text-red-500 text-sm mt-1">{errors.eventName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <select
                      {...register("eventTime", { required: "Event time is required" })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-600"
                    >
                      <option value="">Select Time</option>
                      {[...Array(24)].map((_, i) => (
                        <option key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                          {i.toString().padStart(2, "0")}:00
                        </option>
                      ))}
                    </select>
                    {errors.eventTime && <p className="text-red-500 text-sm mt-1">{errors.eventTime.message}</p>}
                  </div>
                </div>

                {/* 📍 Event Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Event Location <span className="text-gray-500 text-xs">(Click on the map)</span>
                  </label>

                  <div className="relative w-full rounded-xl border border-gray-300 bg-gradient-to-br from-gray-50 to-white shadow-inner px-5 py-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600">Latitude</span>
                      <span className="text-sm font-semibold text-gray-800 tracking-wide">
                        {selectedLocation[0] || "-"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Longitude</span>
                      <span className="text-sm font-semibold text-gray-800 tracking-wide">
                        {selectedLocation[1] || "-"}
                      </span>
                    </div>

                  </div>

                  {errors.eventLocation && (
                    <p className="text-red-500 text-sm mt-2">{errors.eventLocation.message}</p>
                  )}
                </div>


                {/* 📆 Calendar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">
                    <Calender date={selectedDate} setDate={setSelectedDate} />
                  </div>
                </div>

                {/* 🧾 Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Description</label>
                  <textarea
                    {...register("eventDescription", {
                      required: "Event description is required",
                      validate: (value) => {
                        const wordCount = value.trim().split(/\s+/).length;
                        return wordCount <= 30 || "Event description cannot exceed 30 words.";
                      },
                    })}
                    placeholder="Add a short event description (max 30 words)"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                    rows="4"
                  />
                  {errors.eventDescription && <p className="text-red-500 text-sm mt-1">{errors.eventDescription.message}</p>}
                </div>

                {/* 🗂️ Category & Signup Required */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      {...register("eventCategory", { required: "Event category is required" })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-600"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category, idx) => (
                        <option key={idx} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Signup Required?</label>
                    <select
                      {...register("signupRequired", { required: "Signup requirement is required" })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-600"
                    >
                      <option value="">Select Option</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>

                {/* 🖼️ Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Event Image</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-gray-600 shadow-sm"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => setPreviewImage(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {previewImage && (
                    <div className="mt-3 flex flex-col items-center gap-2">
                      <img src={previewImage} className="w-40 h-40 object-cover rounded-lg shadow-md" />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>

                {/* 📤 Submit */}
                <div className="flex justify-center mt-6">
                  <Button type="submit" className="px-12 py-3 rounded-xl font-semibold shadow-lg">
                    {loading ? "Adding Event..." : "Add Event"}
                  </Button>
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
