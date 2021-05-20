import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import './home.css'

export default function Home({ data }) {

    const { city } = useParams()
    console.log(data)


    return (
        <>
            <h1>This is the Homepage</h1>
            <h2>Showing all the Restaurants in City: {city}</h2>




            {data && data.map((e) => (
                <>
                            <Card className='cardElement' style={{ width: '18rem' }}>
                <Card.Img variant="top" src={e.image} />
                <Card.Body>
                    <Card.Title>{e.name}</Card.Title>
                    <Card.Text>
                    Address: {e.cityName}, {e.streetName}
    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Stars: {e.rating}</ListGroupItem>
                    <ListGroupItem><Badge variant="secondary">{e.tags[0]}</Badge></ListGroupItem>
                    {e.tags[1] === "Cheap" ? <ListGroupItem><Badge variant="success">{e.tags[1]}</Badge></ListGroupItem> : 
                    e.tags[1] === "Regular" ? <ListGroupItem><Badge variant="warning">{e.tags[1]}</Badge></ListGroupItem> :
                    <ListGroupItem><Badge variant="danger">{e.tags[1]}</Badge></ListGroupItem>}
                    {e.tags[2] === "Vegan" ? <ListGroupItem><Badge variant="success">{e.tags[2]}</Badge></ListGroupItem> : 
                    e.tags[2] === "Vegetarian" ? <ListGroupItem><Badge variant="warning">{e.tags[2]}</Badge></ListGroupItem> :
                    <ListGroupItem><Badge variant="danger">{e.tags[2]}</Badge></ListGroupItem>}
                </ListGroup>
                <Card.Body>
                    <Card.Link href={`/restaurant/${e.name}`}>Visit Restaurant</Card.Link>
                </Card.Body>
            </Card>
                </>
            ))
            }

        </>
    )
}