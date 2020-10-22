import React /*, { useState, useEffect }  */ from "react";
/* import Form from "react-bootstrap/Form"; */
import Container from "react-bootstrap/Container";
/* import Button from "react-bootstrap/Button";
import { login } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
 */
export default function SignUp() {
  /*   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    console.log("hi");
    event.preventDefault();

    dispatch(login(email, password));

    setEmail("");
    setPassword("");
  } */

  return (
    <Container className="text-white text-center">
      <p>This page is under construction</p>
    </Container>
  );
}
