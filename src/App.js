import React from 'react';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import { Table, Button } from 'react-bootstrap';
import TaskComponent from './components/TaskComponent';

function App() {
  const [show, setShow] = useState(false);
  // Functions to open and close the modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [data, setData] = useState([]);
  const timerID = useRef(null); // Use a ref to store timerID

  useEffect(() => {
    const fetchData = () => {
      fetch('http://127.0.0.1:8000/api/tasks/')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    };

    // / Initial fetch
    fetchData();

    // Set interval and store timerID in the ref
    timerID.current = setInterval(fetchData, 5000); // Fetch every 5 seconds
    return () => {
      // Cleanup function
      clearInterval(timerID);
    };
  }, []); // Empty dependency array means effect runs only once after initial render

  return (
    <div className='container'>
      <h1>Chrono Task</h1>
      <hr />
      <div className="d-flex justify-content-start">
        <Button variant="primary" onClick={handleShow}>Add Task</Button>
      </div>
      <TaskComponent show={show} handleClose={handleClose} />
      <Table className="mt-4 text-left bordered w-100">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.status}</td>
              <td width={"10%"}>{item.due_date}</td>
              <td className="justify-content-center" width={"10%"} >
                <Button variant="primary" size="sm">Edit</Button> {' '}
                <Button variant="danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
