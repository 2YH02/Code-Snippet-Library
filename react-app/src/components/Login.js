import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

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
  display: inline-block;
  &:hover {
    text-shadow: 0.5px 0.5px 1px #ffffff, -1px 0.5px 2.5px #ffffff;
  }
`;

function Login() {
  // const login = useGoogleLogin({
  //   onSuccess: async (res) => {
  //     console.log("Google Login Success. Code:", res);
  //   },
  // });

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

        {/* <div>
          <button onClick={() => login()}>Login with google✌</button>
        </div> */}

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const details = jwt_decode(credentialResponse.credential);
            console.log(details);
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </Form>
    </Container>
  );
}

export default Login;
