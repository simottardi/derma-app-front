## DermaApp | An application for tracking eczema 

## What this app is about

<!--- [Find out here for a working version](https://XXXX.netlify.app/) he app is not deployed at the moment-->

DermaApp is a service for helping patients track their eczema and medications. The app aims to make it easier for patients to understand the trends of their disease and the efficacy of their medications. The app focuses on the patient, but we have the ambiton to include doctors in the next releases, and bring to the patient the professional help they seek.

## How it works

Patients can log in and add an entry for they "eczema journal". Each entry represent a day, and the patient can register: 

- how itchy they feel using an "itch score',
- their personal notes for that day,
- whether or not they took their medications,
- they can upload a picture of their eczema for that day.

A graph shows the patients how their itchyness changes with time.
 
## Table of contents

- [App demo](#App-demo)
- [Used technologies and concepts](#used-technologies-and-concepts)
- [Goals for this project](#goals-for-this-project)
- [User stories](#user-stories)
- [Project board](#project-board)
- [Wireframe](#wireframe)
- [Datamodel](#datamodel)
- [Git version control](#git-version-control)
- [Backend server repo](#backend-server-repo)

## App demo

![App Demo](https://github.com/simottardi/derma-app-front/blob/development/React%20App.gif)

Watch the short video with comments:
https://youtu.be/V12mLer4KM0

## Used technologies and concepts

<!--👀👇 **Click links to see code samples in this project** 👇👀 -->

- [React for UI building]
- [Redux for state management]
- [Authentication]
- [Express as web app framework]
- [REST API]
- [Sequelize as ORM]
- [Bootstrap as a styling library]⭐
- [Clodify as a web service for fetching and displaying images] ⭐
- [Rechart as a library for plotting and displaying data] ⭐

⭐ _New technology learned during this project_

## Goals for this project

The goal of this project is to build a full-stack app, practicing known and exploring _new_ technologies (see above). I learned these new tools by reading its documentation, consultin forums like StackExchange and sparring ideas with fellow developers.

- practice full-stack app development
- build a working prototype in 2 weeks
- apply what we learned in Codaisseur's bootcamp
- extend with new technology independently
- showcase and document development skills using:
  - wireframes as Minimum Viable Product
  - conscious data model design
  - user stories perspective
  - agile/[kanban project](https://github.com/users/simottardi/projects/2)approach
  - transparant and structured [git version control](#git-version-control)

## User stories

- As a page visitor, I can sign up and log in as a patient. I must register before I can post my entries.
- As a visitor, I am able see the past entries in my heistory.
- As a user, I am able to post a new entry for each day, up to today.
- As a user, I am able to edit my entries.
- As a visitor, I can see how my itchyness, represented by a 'itch score' changes with time.
- _planned:_ As a user, I can see my medications, prescriptions and doctors details.
- _planned:_ As a doctor, I can login, check on my patients, and make new prescriptions.

_This project is work in progress. Some features still need to be implemented and revised. Any suggestions or feedback is welcome, please let me know [here](https://www.linkedin.com/in/simone-gottardi-090872a8/)_.

## Project Board

Go to [project board](https://github.com/users/simottardi/projects/2)

## Wireframe

Go to [wireframe](https://wireframepro.mockflow.com/view/M4ae1812fa9242f62896d0111e410f89f1602506846619#/page/70a42434bb04471da2ecb9e7434ee914)

## Datamodel

Go to [datamodel](https://dbdiagram.io/d/5f843fa13a78976d7b774997)

## Git version control

I recognize the need for solid version control and try to:

- write clear commit messages
- name branches by feature
- do pull requests with concise summaries

## Backend server repo

The backend side of this project is an Express server using Sequelize to manage the underlying Postgres database. [Click here for more details](https://github.com/simottardi/derma-app-back)
