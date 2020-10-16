import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import { fetchHomepages } from "../../store/homepages/actions";
import { selectHomepages } from "../../store/homepages/selectors";
import Homepage from "../../components/Homepage";
import { selectUser } from "../../store/user/selectors";
import { useHistory } from "react-router-dom";

import ItchyButton from "../../components/ItchyButton";
import PatientCard from "../../components/PatientCard";

export default function HomePages() {
  const dispatch = useDispatch();
  const homepages = useSelector(selectHomepages);
    const users = useSelector(selectUser);
    const { token, homepage, name,email, id, doctorId, address, createdAt } = useSelector(selectUser);
      const history = useHistory();

  if (token !== null) {
    console.log("token not null")
    history.push("/myhomepage/");
  }

  useEffect(() => {
    dispatch(fetchHomepages());
  }, [dispatch]);

  return (
    <>
      <Jumbotron>
        <h1>Welcome to DermaApp</h1>
      </Jumbotron>

<ItchyButton />
<PatientCard />
{/*     <div>
    <p>this is working</p>  
    <p>welcome back <strong>{name}</strong></p>
<p>email: {email}</p>
<p>id: {id}</p>
<p>doctorId: {doctorId}</p>
<p>address: {address}</p>
<p>Patient since:{createdAt}</p>
</div>
 */}
      <Container>
        {homepages.map(homepage => {
          return (
            <Homepage
              key={homepage.id}
              id={homepage.id}
              title={homepage.title}
              description={homepage.description}
              backgroundColor={homepage.backgroundColor}
              color={homepage.color}
              showLink={true}
            />
          );
        })}
      </Container>
    </>
  );
}
