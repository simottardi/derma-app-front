import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
/* import { fetchHomepages } from "../../store/homepages/actions";
import { selectHomepages } from "../../store/homepages/selectors"; */
import Homepage from "../../components/Homepage";
import { selectUser } from "../../store/user/selectors";
import { useHistory } from "react-router-dom";

import ItchyButton from "../../components/ItchyButton";
import PatientCard from "../../components/PatientCard";

export default function HomePages() {
  const dispatch = useDispatch();
  // const homepages = useSelector(selectHomepages);
    const users = useSelector(selectUser);
    const { token, homepage, name,email, id, doctorId, address, createdAt } = useSelector(selectUser);
    const history = useHistory();

  if (token !== null) {
    console.log("token not null")
    history.push("/myhomepage/");
  }

  // useEffect(() => {
  //   dispatch(fetchHomepages());
  // }, [dispatch]);

  return (
    <>
      <Jumbotron>
        <h1>Welcome to DermaApp</h1>
      </Jumbotron>
      <Container>
{/* <ItchyButton /> */}
{/* <PatientCard /> */}
      </Container>
    </>
  );
}
