## DermaApp | An application for tracking eczema 😋

## What this app is about

[Find out here for a working version](https://XXXX.netlify.app/) //The app is not deployed at the moment

DermaApp is a service for helping patients track their eczema and medications. The app aims to make it easier for patients to understand the trends of their disease and the efficacy of their medications. The app focuses on the patient, but we have the ambiton to include doctors in the next releases, and bring to the patient the professional help they seek.

## How it works

Patient can log in and add an entry for they "eczema journal". Each entry represent a day, and the patient can register -   - - [ ] how itchy they feel,
 - - [ ] personal notes for that day
 - - [ ] whether they took their medications
 - - [ ] and can upload a picture of their eczema for that day
 The patient can see on a graph how their itchyness changes through the days.
 
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

//![App demo](https://github.com/tdijkmans/savoristas-front/blob/master/readme-assets/Post-a-palette.gif) //

## Used technologies and concepts

👀👇 **Click links to see code samples in this project** 👇👀

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

- As a page visitor, I can sign up and log in as a user. I must register before I can post food palettes and recipes
- As a visitor, I am able see existing food palettes and recipes as a gallery
- As a user, I am able to post new food palettes
- As a user, I am able to post new recipes
- As a visitor, I can see recipes of interest and get their details for cooking.
- As a visitor, I can select food palettes and filter for corresponding recipes
- _planned:_ As a user, I can like recipes and foodpaletes
- _planned:_ As a user, I can bookmark recipes and foodpaletes

_This project is work in progress. Some features still need to be implemented and revised. Any suggestions or feedback is welcome, please let me know [here](https://www.linkedin.com/in/tdijkmans/)_.

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
