import React, { useState } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import ReactPlayer from "react-player";

const UploadCource = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
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

  const { fields, append } = useFieldArray({
    control,
    name: "videos",
  });

  const [videoUrls, setVideoUrls] = useState([]);
  const [thumbUrls, setThumbUrls] = useState(null);

  const handleVideoChange = async (file, index) => {
    const url = URL.createObjectURL(file);

    const newVideoUrls = [...videoUrls];
    newVideoUrls[index] = url;
    setVideoUrls(newVideoUrls);
    setValue(`videos.${index}.file`, file);
  };
  const handleThumbChange = async (file) => {
    const url = URL.createObjectURL(file);
    setThumbUrls(url);
    setValue(`thumbnail`, file);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // const {response} = axios.post("")
      const uploadedVideos = data.videos;
      console.log(uploadedVideos)
      // reset(); // Clear the form
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-lg mb-3">Create a New Course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-wrap">
          <div className="md:w-[55%] w-full flex flex-col gap-3">
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
            <div className="w-full flex flex-col gap-1">
              <h4 className="font font-semibold">Video</h4>
              {fields.map((field, index) => (
                <div key={field.id} className="w-full flex flex-col gap-1 mt-4">
                  <h4 className="font-semibold">Video {index + 1}</h4>
                  <label className="my-2">Video Title</label>
                  <Input
                    {...register(`videos.${index}.title`)}
                    placeholder="Video Title"
                  />
                  <label className="my-2">Video Description</label>
                  <Input
                    {...register(`videos.${index}.description`)}
                    placeholder="Video Description"
                  />

                  {!videoUrls[index] && (
                    <div
                      className="flex flex-col items-center justify-center align-middle border-dashed border-2 border-light_gray rounded-md p-6 pt-9 pb-9 text-center cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        document
                          .getElementById(`videoUploadInput${index}`)
                          ?.click()
                      }
                    >
                      <img
                        src="/create-cource/upload2.png"
                        alt=""
                        width={30}
                        height={30}
                      />
                      <p className="text-text_secondary mt-4">
                        Click or drag file to this area to upload
                      </p>
                      <input
                        type="file"
                        id={`videoUploadInput${index}`}
                        accept="video/mp4"
                        className="hidden"
                        onChange={(e) =>
                          e.target.files &&
                          handleVideoChange(e.target.files[0], index)
                        }
                      />
                    </div>
                  )}

                  {videoUrls[index] && (
                    <div className="mt-3">
                      <ReactPlayer
                        url={videoUrls[index]}
                        controls
                        width="100%"
                      />
                    </div>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => append({ title: "", description: "" })}
                className="mt-4 flex items-center text-blue-600 font-semibold"
              >
                <span className="text-2xl mr-2">+</span> Add Video
              </button>

              <span
                style={{ fontSize: 14 }}
                className="font-normal text-[#9D9D9D] mt-1"
              >
                Format accepted is mp4.
              </span>
            </div>
          </div>
          <div className="md:w-[45%] w-full flex flex-col gap-5 p-4">
            <div className="mb-6 max-w-[500px]">
              <label className="font font-semibold">Thumbnail</label>
              <div
                className="flex flex-col items-center justify-center align-middle border-dashed border-2 border-light_gray rounded-md p-6 pt-9 pb-9 text-center cursor-pointer hover:bg-gray-100"
                onClick={() => document.getElementById("thumbInput")?.click()}
              >
                {thumbUrls ? (
                  <img
                    src={thumbUrls}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <img
                    src="/create-cource/upload2.png"
                    alt={""}
                    width={30}
                    height={30}
                  />
                )}

                <p className="text-text_secondary mt-4">
                  Click or drag file to this area to upload
                </p>
                <input
                  type="file"
                  id="thumbInput"
                  accept="png/jpg"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files && handleThumbChange(e.target.files[0])
                  }
                />
              </div>
              <span
                style={{ fontSize: 14 }}
                className="font-normal text-[#9D9D9D] mt-1"
              >
                Formats accepted are png/jpg.
              </span>
            </div>
          </div>
        </div>

        <button
          className="mt-5 px-5 py-2 rounded-lg bg-black text-white font-semibold cursor-pointer"
          type="submit"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default UploadCource;
