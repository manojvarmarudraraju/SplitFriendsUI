import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label className="align-start" column sm={2}>First Name</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="First Name" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label className="align-start" column sm={2}>Last Name</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="email" placeholder="Last Name" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label className="align-start" column sm={2}>Email</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="email" placeholder="Email" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                    <Form.Label className="align-start" column sm={2}>Password</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                    <Form.Label className="align-start" column sm={2}>Confirm Password</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="password" placeholder="Confirm Password" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col className="align-start" sm={{ span: 10, offset: 2 }}>
                                        <Button variant="dark" type="submit">Sign up</Button>
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