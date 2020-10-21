import React from 'react'
import NewDayForm from './NewDayForm'
import { Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";

export default function newday() {
  return (
    <div>
      <Container as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
      <h1> Create new day </h1>
      <NewDayForm />
</Container>
    </div>
  )
}
