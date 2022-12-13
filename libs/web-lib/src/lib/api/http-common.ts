import axios from 'axios';

const url = 'http://localhost:3333/api';

const apiInstance = axios.create({
  baseURL: url,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlc2pqb2hAZ21haWwuY29tIiwic3ViIjoiMjVlMmM3ODktZmZmMC00NmU4LThjYjktNTVlZDY2NjZhNThjIiwiaWF0IjoxNjcwOTU4NDY0LCJleHAiOjE2NzEwNDQ4NjR9.AlpGPdjRk355uKW9LEcmt65HOs3J7mGMEbiGRYOUUqU',
  },
});

export default apiInstance;
