import axios from 'axios'

const instance = axios.create({
  baseURL :'https://api.themoviedb.org/3/',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGEwZTg3NDMyYzA1ZWE2ODFhMTIxMDVmZGEzNDRkNiIsIm5iZiI6MTczNjk0MTk3Ni43OCwic3ViIjoiNjc4N2ExOTg0MjNmZjFhMjVlNGU0ZWUxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.e4S30RWmdbaAX-CD3bHSU1NtNF7aj1c9DQyzDRHjhck'
  }
})

export default instance