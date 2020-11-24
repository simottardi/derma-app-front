import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  Typography,
  Button,
  FormControl,
  Input,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  elements: {
    textAlign: "center",
    margin: theme.spacing(2),
  },
}));

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  const classes = useStyles();

  console.log("email", email, "password", password);

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(signUp(name, email, password));

    setEmail("");
    setPassword("");
    setName("");
  }

  return (
    <Container align="center" maxWidth="sm" fixed style={{ marginTop: 12 }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography
          variant="h5"
          justify="center"
          align="center"
          style={{ marginBottom: 12 }}
        >
          Patient Signup
        </Typography>
        <div>
          <form
            noValidate
            autoComplete="off" /* styles={{ margin: 1, width: "25ch" }} */
          >
            <FormControl>
              {/*             <InputLabel htmlFor="my-input">Email address</InputLabel> */}
              <Input
                className={classes.elements}
                id="this-name"
                /* aria-describedby="my-helper-text" */
                label="Name"
                value={name}
                onChange={(event) => setEmail(event.target.value)}
                margin="normal"
                variant="outlined"
                required
                placeholder="Name"
                fullWidth
              />
              <Input
                className={classes.elements}
                id="this-email"
                /* aria-describedby="my-helper-text" */
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                margin="normal"
                variant="outlined"
                required
                placeholder="Email"
                fullWidth
              />

              {/*        <InputLabel htmlFor="this-password">Password</InputLabel> */}
              <Input
                className={classes.elements}
                id="this-password"
                /*   aria-describedby="my-helper-text" */
                label="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                margin="normal"
                variant="outlined"
                type="password"
                placeholder="Password"
                required
                fullWidth
              />

              <Button
                className={classes.elements}
                type="submit"
                onClick={submitForm}
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign up
              </Button>
            </FormControl>
          </form>
          <Link to="/login/patient" style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.elements}
              fullWidth
            >
              Click here to log in
            </Button>
          </Link>
        </div>
      </Grid>
    </Container>
  );
}
