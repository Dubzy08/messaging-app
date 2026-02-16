import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () =>{
            try {
                const response = await fetch('http://localhost:3000/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const result = await response.json();
                setUsers(result); 
            } catch (error) {
                console.error(error.message);
            }
        }
        if (token)
            fetchUsers();
        else
            navigate('/login');
    }, [token, navigate])

    return (
        <Container className='mt-5'>
            <Row>
                <Col>
                    <h1 className='text-center'>Dashboard</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard