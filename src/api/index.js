import axios from "axios";

// const base_url = "http://localhost:5000/";
const posts = "posts";
// const users = "users";
// deployed API base_url
const base_url = "https://lyrix-social.herokuapp.com/";

// posts
export const fetchPosts = () => axios.get(base_url + posts);
export const createPost = (newPost) => axios.post(base_url + posts, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${base_url + posts}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${base_url + posts}/${id}`);
export const likePost = (id) =>
  axios.patch(`${base_url + posts}/${id}/likePost`);

// users
// export const fetchUsers = () => axios.get(base_url + users);
// export const findUser = (id) => axios.get(`${base_url + users}/${id}`);
// export const createUser = (newUser) => axios.post(base_url + users, newUser);
// export const updateUser = (id, updatedUser) =>
//   axios.patch(`${base_url + users}/${id}`, updatedUser);
// export const deleteUser = (id) => axios.delete(`${base_url + users}/${id}`);
