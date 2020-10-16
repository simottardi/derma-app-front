import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";

export default function PatientCard(/* props */) {

 const { token, homepage, name,email, id, doctorId, address, createdAt } = useSelector(selectUser);

  if (token === null) {
 console.log("toke null")
  return (
    <div>
      <p>no patient logged in</p>
    </div>
  )
  }
  
  return (
    <div>
    <div>
{/* testing this is working */}
    <p>this is working</p>
    {/* testing fetching the user and its data, will */}
    
    <p>welcome back <strong>{name}</strong></p>
<p>email: {email}</p>
<p>id: {id}</p>
<p>doctorId: {doctorId}</p>
<p>address: {address}</p>
<p>Patient since:{createdAt}</p>
</div>




{/*       <div>
          <p>welcome back <strong>{props.name}</strong></p>
<p>email: {props.email}</p>
<p>id: {props.id}</p>
<p>doctorId: {props.doctorId}</p>
<p>address: {props.address}</p>
<p>Patient since:{props.createdAt}</p>
    </div> */}

  
  {/*     <h1>{props.title}</h1>
      <p>{props.description}</p>
      {props.showLink ? (
        <Link to={`/homepages/${props.id}`}>
          <Button>Visit page</Button>
        </Link>
      ) : null}
 */}
  </div>
  );
}



