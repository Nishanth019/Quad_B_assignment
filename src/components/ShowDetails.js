import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ShowDetails = () => {
  const [show, setShow] = useState(null);
  const { id } = useSelector(state => state.id);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [numTickets, setNumTickets] = useState(0);
  const [time, setTime] = useState('');

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/${localStorage.getItem('id') ? localStorage.getItem('id') : id}`)
      .then(response => {
        setShow(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const bookTicket = (e) => {
   e.preventDefault();
    const ticketDetails = {
      email,
      phone,
      numTickets,
      time,
    };
    localStorage.setItem('ticketDetails', JSON.stringify(ticketDetails));
    toast.success("Tickets booked successfully")
       setEmail("")
        setPhone("")
        setNumTickets(0)
    setTime("")

  };

  

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = e => {
    setPhone(e.target.value);
  };

  const handleNumTicketsChange = e => {
    setNumTickets(parseInt(e.target.value));
  };

  const handleTimeChange = e => {
    setTime(e.target.value);
  };

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-500 min-h-screen flex text-white items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">TITLE: {show.name}</h1>
        <img src={show.image.original} alt="image" className="mb-4 mx-auto" width="300" height="300" />
        <div className="flex flex-col justify-around md:flex-row md:items-center">
          <div className="md:w-1/2 pl-0">
            <h2 className="text-xl font-semibold mb-2">Rating: {show.rating.average}</h2>
            <h2 className="text-xl font-semibold mb-2">Language: {show.language}</h2>
            <h2 className="text-xl font-semibold mb-2">Genres: {show.genres}</h2>
            <h2 className="text-xl font-semibold mb-2">Runtime: {show.runtime}</h2>
          </div>
          <div className="md:w-1/2">
            <h2 className=" text-xl"><b>Summary of Movie:</b> {show.summary}</h2>
            
            <button
              className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              data-bs-toggle="modal" data-bs-target="#exampleModal"
            >
              Book Ticket
            </button>

            <div className="modal fade text-black" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5 m-auto text-2xl" id="exampleModalLabel">Book Ticket for <b>{show.name}</b></h1>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={bookTicket}>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input required type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone:</label>
                        <input required  type="text" className="form-control" id="phone" value={phone} onChange={handlePhoneChange} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="numTickets" className="form-label">Number of Tickets:</label>
                        <input required  type="number" className="form-control" id="numTickets" value={numTickets} onChange={handleNumTicketsChange} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="time" className="form-label">Time:</label>
                        <input required  type="text" className="form-control" id="time" value={time} onChange={handleTimeChange} />
                      </div>
                      <div className="modal-footer">
                    <button type="submit" className="btn btn-primary text-black font-bold" >Book</button>

                  </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
