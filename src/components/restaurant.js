import { useParams, useHistory, useLocation } from 'react-router-dom'
import React, { useEffect, useState, useCallback } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Badge, ListGroupItem } from 'react-bootstrap'
import './restaurant.css'
import Axios from 'axios'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';





export default function Restaurant() {
    const [center, setCenter] = useState()
    const [mapData, setMapData] = useState({})
    const [data, setData] = useState('')
    const [zoomLevel, setZoomLevel] = useState(8)
    const { name } = useParams()

    

    const containerStyle = {
        width: '400px',
        height: '500px'
    };

    useEffect(() => {
        setLocation()
        
        fetchRestaurantData()
    }, []);

    useEffect(() => {
        if (data) fetchData()
    }, [data])

    const fetchRestaurantData = async () => {
        await Axios.get(`https://yelp-db.herokuapp.com/restaurants/${name}`)
            .then((response) => setData(response.data.data))
            .catch((error) => console.log(error));
    };

    const fetchData = async () => {
        await Axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${data.city.name}, Deutschland&key=6002168ae2b4471cbbe0ff9ff0c1be70`)
            .then((response) => {
                setMapData(response.data.results[0].geometry)
            })
            .catch((error) => console.log(error));
    };

    const setLocation = () => {
        setCenter(mapData)

    }

    const setZoom = () => {
        setZoomLevel(13)
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDyVZqBLSCxCdN6tRbcgZyLFRv6A-a7fjQ"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        <>

            <Container>
                <Row>
                    <Col>
                        {data &&
                            <>
                                <img src="https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_960_720.jpg" />
                                <h1>{data.name}</h1>
                                {data.rating >= 4.0 ? <Badge variant="success">Stars: {data.rating}</Badge> :
                                    data.rating >= 3.0 ? <Badge variant="warning">Stars: {data.rating}</Badge> :
                                        <Badge variant="danger">Stars: {data.rating}</Badge>}
                                <p>Address: {data.city.name}</p>
                                {data.tags[0].name === "cheap" || data.tags[0].name === "vegan" ? <ListGroupItem><Badge variant="success">{data.tags[0].name}</Badge></ListGroupItem> :
                                    data.tags[0].name === "regular" || data.tags[0].name === "vegetarian" ? <ListGroupItem><Badge variant="warning">{data.tags[0].name}</Badge></ListGroupItem> :
                                        <ListGroupItem><Badge variant="danger">{data.tags[0].name}</Badge></ListGroupItem>}
                                <p>{data.description}</p>
                            </>
                        }
                    </Col>
                    <Col>
                        <button onClick={(() => {
                            setLocation()
                            setZoom()
                        })}>Load Map</button>
                        <div className="mapDiv">
                            {isLoaded && center && <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={zoomLevel}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                            >
                                { /* Child components, such as markers, info windows, etc. */}
                                <></>
                            </GoogleMap>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}