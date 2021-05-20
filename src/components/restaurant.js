import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
/* import { createControlComponent } from '@react-leaflet/core'
import { Control } from 'leaflet' */
/* import leaflet from 'leaflet' */
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Badge } from 'react-bootstrap'
import './restaurant.css'
/* import 'leaflet/dist/leaflet.css'; */


export default function Restaurant({ data }) {
    const { name } = useParams()


    const position = [51.505, -0.09]
    return (
        <>
            <h1>This is the restaurant page for restaurant {name}</h1>

            <Container>
                <Row>
                    <Col>
                        {data &&
                            <>
                                <img src={data[1].image} />
                                <h1>{data[1].name}</h1>
                                {data[1].rating >= 4.5 ? <Badge variant="success">Stars: {data[1].rating}</Badge> :
                                    data[1].rating >= 3.5 ? <Badge variant="warning">Stars: {data[1].rating}</Badge> :
                                        <Badge variant="danger">Stars: {data[1].rating}</Badge>}
                                <p>Address: {data[1].cityName}, {data[1].streetName}</p>
                                <Badge variant="secondary">{data[1].tags[0]}</Badge>
                                {data[1].tags[1] === "Cheap" ? <Badge variant="success">{data[1].tags[1]}</Badge> :
                                    data[1].tags[1] === "Regular" ? <Badge variant="warning">{data[1].tags[1]}</Badge> :
                                        <Badge variant="danger">{data[1].tags[1]}</Badge>}
                                {data[1].tags[2] === "Vegan" ? <Badge variant="success">{data[1].tags[2]}</Badge> :
                                    data[1].tags[2] === "Vegetarian" ? <Badge variant="warning">{data[1].tags[2]}</Badge> :
                                        <Badge variant="danger">{data[1].tags[2]}</Badge>}
                                <p>{data[1].description}</p>
                            </>
                        }
                    </Col>
                    <Col>
                    <h2>Leaflet Map</h2>
                        <div className="mapDiv">
                             <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}