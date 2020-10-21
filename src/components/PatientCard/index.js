import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";

export default function PatientCard() {

 const { token,email, id, doctorId, address, createdAt } = useSelector(selectUser);

  if (token === null) {
 console.log("toke null")
  return (
    <div>
      <p>Please log in to read and edit your data</p>
    </div>
  )
  }
  
  return (
    <div>
<p>email: {email}</p>
<p>id: {id}</p>
<p>doctorId: {doctorId}</p>
<p>address: {address}</p>
<p>Patient since:{createdAt}</p>
</div>
  );
}



