import React from "react";
// import axios from "axios";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

const UploadCource = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch courses from the server
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const response = await axios.get('/api/courses');
  //       setCourses(response.data);
  //     } catch (error) {
  //       console.error('Error fetching courses:', error);
  //     }
  //   };

  //   fetchCourses();
  // }, []);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // const response = await axios.post('/api/courses', data);
      // setCourses([...courses, response.data]);
      console.log(data);
      reset(); // Clear the form
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-lg mb-3">Create a New Course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-wrap">
          <div className="md:w-[55%] w-full flex flex-col gap-3 ">
            <div>
              <label>Title:</label>
              <Input
                {...register("title", { required: "Title is required" })}
                type="text"
                placeholder="Title"
                error={errors.title ? true : false}
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label>Description:</label>
              <Input
                {...register("description", {
                  required: "Description is required",
                })}
                as="textarea"
                placeholder="Description"
                error={errors.description ? true : false}
              />
              {errors.description && (
                <p className="text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <p>Is Premium:</p>
              <label className="toggle-container">
                <input
                  type="checkbox"
                  {...register("isPremium")}
                  className="toggle-checkbox"
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div>
              <label>Price:</label>
              <Input {...register("price")} type="number" placeholder="Price" />
            </div>
          </div>
        </div>

        <button className="mt-5 px-5 py-2 rounded-lg bg-black text-white font-semibold cursor-pointer" type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default UploadCource;
