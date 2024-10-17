import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function TaskComponent({ show, handleClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Create the data object to be sent to the API
        const taskData = {
        title: title,
        description: description,
        status: status,
        due_date: dueDate,
        };
        console.log(taskData);

        // Post the data to the API
        fetch('http://127.0.0.1:8000/api/tasks/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Success:', data);
            // You can reset the form or display a success message here
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTaskTitle">
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the title of the task"
                        autoFocus
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTaskDescription">
                    <Form.Label>Task Description</Form.Label>
                        <Form.Control as="textarea" rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTaskStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select aria-label="Default select example" 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDueDate">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}/>
                </Form.Group>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit">
                    Save Changes    
                </Button>
                </Modal.Footer>
            </Form>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default TaskComponent;