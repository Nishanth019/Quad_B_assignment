import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch , useSelector } from 'react-redux';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  
  const dispatch = useDispatch()

  const {id} = useSelector(state=>state.id)

  const viewDetails = (id)=>{
    localStorage.setItem('id',id);
    dispatch({type:'SET_ID',payload:id})
  }

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        setShows((response.data));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  return (
    <div className="bg-gray-900">
      <h1 className="text-3xl text-white font-bold mb-4 text-center">TV Shows</h1>
      <center>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shows.map(e => (
          <div key={e.show.id} className=" rounded-lg p-4  shadow-2xl">
            <h2 className="text-lg text-white font-semibold mb-2 text-center">{e.show.name}</h2>
            <center>
            <img src={e.show.image.original}  alt="image" width="300" height="300"/>
            </center>
            <Link
              to={`/shows/${e.show.id}`}
              className="mt-4  inline-block px-10 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => viewDetails(e.show.id)}
            >
              View Details
            </Link>
          </div>
        ))}
      </div></center>
    </div>
  );
};

export default ShowList;
