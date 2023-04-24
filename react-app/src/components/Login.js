import Form from "react-bootstrap/Form";
import styled from "styled-components";

const Container = styled.div`
  width: 50%;
  margin: 5rem auto;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;
const Button = styled.button`
  border: 1px solid rgb(210, 210, 210);
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.5);
  color: rgb(210, 210, 210);
  padding: 0.3rem 1rem;
  &:hover {
    text-shadow: 0.5px 0.5px 1px #ffffff, -1px 0.5px 2.5px #ffffff;
  }
`;

function Login() {
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export default Login;
