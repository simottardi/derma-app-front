import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";

import { selectToday } from "../../store/appState/selectors";
import Container from "react-bootstrap/Container";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import MyHomepageForm from "./MyHomepageForm";
import StoryForm from "./StoryForm";
import Homepage from "../../components/Homepage";
import StoryCarousel from "../../components/StoryCarousel";
import ItchyButton from "../../components/ItchyButton";

// PLAN
// [x]set Date
// fetch history
// fetch current day // what if there is no day? --> creat one
// display the patient info 
// send requests to update their day


export default function MyHomepage() {
  const { token, homepage, name,email, id, doctorId, address, createdAt } = useSelector(selectUser);
  const  today = useSelector(selectToday)
  const [editMode, setEditMode] = useState(false);
  const [postStoryMode, setpostStoryMode] = useState(false);
  const history = useHistory();

  console.log("today", today )

  if (token === null) {
    console.log("token null")
    history.push("/");
  }

  // if (homepage === null) {
  //   console.log("homepage null")
  //   return <Loading />;
  // }

  // const displayButtons =
  //   id === homepage.userId && editMode === false && postStoryMode === false;

  //   console.log("EDITMODE", editMode);
  return (
    <div>
{/* testing this is working */}

<p> Today is { today}  </p>
    <p>this is working</p>
    {/* testing fetching the user and its data, will */}
    
    <p>welcome back <strong>{name}</strong></p>
<p>email: {email}</p>
<p>id: {id}</p>
<p>doctorId: {doctorId}</p>
<p>address: {address}</p>
<p>Patient since:{createdAt}</p>



<ItchyButton />
    </div>

    
  );
}

      //  <Homepage
      //   id={homepage.id}
      //   title={homepage.title}
      //   description={homepage.description}
      //   backgroundColor={homepage.backgroundColor}
      //   color={homepage.color}
      //   showLink={false}
      // />
      // <Container>
      //   {displayButtons ? (
      //     <Card>
      //       <Button onClick={() => setEditMode(true)}>Edit my page</Button>
      //       <Button onClick={() => setpostStoryMode(true)} className="mt-2">
      //         Post a cool story bro
      //       </Button>
      //     </Card>
      //   ) : null}

      //   {editMode ? (
      //     <Card>
      //       <MyHomepageForm />
      //     </Card>
      //   ) : null}

      //   {postStoryMode ? (
      //     <Card>
      //       <StoryForm />
      //     </Card>
      //   ) : null}

      //   <StoryCarousel homepage={homepage} />
      // </Container>
