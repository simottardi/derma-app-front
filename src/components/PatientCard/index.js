import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";

export default function PatientCard() {
  const { token, email, id, address, createdAt, name } = useSelector(
    selectUser
  );

  if (token === null) {
    console.log("toke null");
    return (
      <div>
        <p>Please log in to read and edit your data</p>
      </div>
    );
  }

  return (
    <div className="container pt-12 mb-4 ">
      <div className="card-deck text-center">
        <div className="card shadow-sm">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">Your data:</h4>
          </div>
          <div className="card-body">
            <ul className="list-unstyled mt-3">
              <li>patient name: {name}</li>
              <li>patient ID: {id}</li>
              <li>email: {email}</li>
              <li>address: {address}</li>
              <li>Patient since:{createdAt}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
