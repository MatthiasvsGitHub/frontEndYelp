import { Switch, Route, Redirect } from 'react-router-dom'
import { Button, Nav, Form, Navbar, NavDropdown, FormControl } from 'react-bootstrap';
import Home from './home'
import Restaurant from './restaurant'
import {useEffect, useState} from 'react'
import Data from './testData.json'
import Axios from "axios";

export default function Router () {
    const [restaurantName, setRestaurantName] = useState('')
    const [cityName, setCityName] = useState('')
/*     const [data, setData] = useState([])

    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () => {
        await Axios.get(`link`)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
      }; */


    return(
<>
<Navbar bg="light" expand="lg" sticky="top">
                <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                    </Nav>
                    <Form inline >
                        <FormControl type="text" placeholder="Search Restaurant" className="mr-sm-2" onChange={((e) => setRestaurantName(e.target.value))}/>
                        <Button href={`/restaurant/${restaurantName}`} variant="outline-success">Search Restaurant</Button>
                    </Form>
                    <Form inline>
                        <FormControl type="text" placeholder="Search City" className="mr-sm-2" onChange={((e) => setCityName(e.target.value))}/>
                        <Button href={`/home/${cityName}`} variant="outline-success">Search City</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        <Switch>
            <Route exact path="/">
                    <Redirect to="/home" />
            </Route>
            <Route exact path="/home/:city?">
                    <Home data={Data} />
            </Route>
            <Route exact path="/restaurant/:name?">
                    <Restaurant data={Data}/>
            </Route>
        </Switch>
        </>
    )
}