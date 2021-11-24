import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {instance} from '../services/AxiosConfig';
import { Navigate } from 'react-router';

var obj = {};

const Signup = () => {
    return (
        <Container fluid style={{marginTop: '13%'}}>
            <Row>
                <Col></Col>
                <Col lg={6}>
                    <div className="login-container">
                        <div className='login-card'>
                            <h4 className="align-start mb-3">Sign up to SplitFriends</h4>
                            <Form className='login-form'>

                                <Form.Group as={Row} className="mb-3" controlId="displayName">
                                    <Form.Label className="align-start" column sm={2}>Name</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Name" onChange={(event)=>{
                                            obj[event.target.id] = event.target.value;
                                        }}/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="email">
                                    <Form.Label className="align-start" column sm={2}>Email</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="email" placeholder="Email" onChange={(event)=>{
                                            obj[event.target.id] = event.target.value;
                                        }}/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="password">
                                    <Form.Label className="align-start" column sm={2}>Password</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control required type="password" placeholder="Password" onChange={(event)=>{
                                            obj[event.target.id] = event.target.value;
                                        }} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
                                    <Form.Label className="align-start" column sm={2}>Confirm Password</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control required type="password" placeholder="Confirm Password" onChange={(event)=>{
                                            obj[event.target.id] = event.target.value;
                                        }}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col className="align-start" sm={{ span: 10, offset: 2 }}>
                                        <Button variant="dark" type="submit" onClick={(e) => {
                                            console.log(obj);
                                            if(obj.displayName == undefined || obj.email == undefined || obj.password == undefined || obj.confirmPassword == undefined){
                                                alert("Please fill in all the details!");
                                             } else if (obj.password !== obj.confirmPassword){
                                                alert("Passwords must match!");
                                             }else {
                                                 delete obj['confirmPassword'];
                                                 console.log(obj);
                                                var pr = instance.put('/user/register',obj);
                                                pr.then((response)=>{
                                                    console.log(response.status);
                                                    alert("Registration Succesful");
                                                    <Navigate to="/login" />})
                                                    .catch(function (error) {
                                                        console.log(error.response);
                                                    });  
                                            }
                                        }}>Sign up</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <p className="mt-3 align-start">Already a User? &nbsp;<Link to="/login">Log in</Link></p>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}
 
export default Signup;