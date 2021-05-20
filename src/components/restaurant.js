import { useParams, useHistory, useLocation } from 'react-router-dom'
import React, { useEffect, useState, useCallback } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Badge } from 'react-bootstrap'
import './restaurant.css'
import Axios from 'axios'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';





export default function Restaurant({ data }) {
    const [center, setCenter] = useState()
    const [mapData, setMapData] = useState({})
    const { name } = useParams()

    const containerStyle = {
        width: '400px',
        height: '500px'
    };

    useEffect(() => {
        setLocation()
        fetchData();
      }, []);

    const fetchData = async () => {
        await Axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${data[1].cityName}, ${data[1].streetName}, Deutschland&key=6002168ae2b4471cbbe0ff9ff0c1be70`)
          .then((response) => {
              setMapData(response.data.results[0].geometry)
            })
          .catch((error) => console.log(error));
      };
    
    const setLocation = () => {
        setCenter(mapData)
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
                    <button onClick={setLocation}>Load Map</button>
                        <div className="mapDiv">
                            {isLoaded && center && <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={16}
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