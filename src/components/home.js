import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import './home.css'

export default function Home({ data }) {

    const { city } = useParams()

    const filterFunction = (e) => {
        if (city === e.city.name) return true
        else return false
    }

    let newData = data
    
    if (city) newData = data.filter(filterFunction)
        
    console.log(newData)


    return (
        <>
            
            <h1>Showing all the Restaurants {city && `in City: ${city}`}</h1>




            {newData && newData.map((e) => (
                <>
                            <Card className='cardElement' style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_960_720.jpg" />
                <Card.Body>
                    <Card.Title>{e.name}</Card.Title>
                    <Card.Text>
                    Address: {e.city.name}
    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Stars: {e.rating}</ListGroupItem>
                    {e.tags[0].name === "cheap" || e.tags[0].name === "vegan" ? <ListGroupItem><Badge variant="success">{e.tags[0].name}</Badge></ListGroupItem> : 
                    e.tags[0].name === "regular" || e.tags[0].name === "vegetarian" ? <ListGroupItem><Badge variant="warning">{e.tags[0].name}</Badge></ListGroupItem> :
                    <ListGroupItem><Badge variant="danger">{e.tags[0].name}</Badge></ListGroupItem>}
                </ListGroup>
                <Card.Body>
                    <Card.Link href={`/restaurant/${e._id}`}>Visit Restaurant</Card.Link>
                </Card.Body>
            </Card>
                </>
            ))
            }

        </>
    )
}