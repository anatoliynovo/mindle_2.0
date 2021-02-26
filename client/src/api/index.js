import axios from 'axios';

// https://mindle-app.herokuapp.com

// Base URL
const API = axios.create({ baseURL: 'http://localhost:5000' });


// POSTS API REQUESTS
export const fetchPosts = () => API.get('/posts');

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);


// AUTH API REQUESTS
export const signIn = (formData) => API.post('/user/signin', formData)

export const signUp = (formData) => API.post('/user/signup', formData)