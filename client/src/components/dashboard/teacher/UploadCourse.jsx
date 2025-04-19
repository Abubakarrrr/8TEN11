import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';

const UploadCource = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [courses, setCourses] = useState([]);

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
      console.log(data)
      reset(); // Clear the form
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div>
      <h1>Create a New Course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title:</label>
          <Input
            {...register('title', { required: 'Title is required' })}
            type="text"
            placeholder="Title"
            error={errors.title ? true : false}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <label>Description:</label>
          <Input
            {...register('description', { required: 'Description is required' })}
            as="textarea"
            placeholder="Description"
            error={errors.description ? true : false}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div>
          <label>Thumbnail URL:</label>
          <Input
            {...register('thumbnailUrl')}
            type="text"
            placeholder="Thumbnail URL"
          />
        </div>
        <div>
          <label>Teacher ID:</label>
          <Input
            {...register('teacher', { required: 'Teacher ID is required' })}
            type="text"
            placeholder="Teacher ID"
            error={errors.teacher ? true : false}
          />
          {errors.teacher && <p>{errors.teacher.message}</p>}
        </div>
        <div>
          <label>Is Premium:</label>
          <Input
            {...register('isPremium')}
            type="checkbox"
          />
        </div>
        <div>
          <label>Price:</label>
          <Input
            {...register('price')}
            type="number"
            placeholder="Price"
          />
        </div>
        <button type="submit">Create Course</button>
      </form>

      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Thumbnail URL: {course.thumbnailUrl}</p>
            <p>Teacher ID: {course.teacher}</p>
            <p>Is Premium: {course.isPremium ? 'Yes' : 'No'}</p>
            <p>Price: ${course.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadCource;
