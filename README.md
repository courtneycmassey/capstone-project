# Raise a Question

Raise a Question is a web application that was created as a Capstone Project for [Ada Developers Academy](https://adadevelopersacademy.org/).

## Description

This application creates is a virtual question board that allows students to anonymously post questions during a class. Students and instructors can view all of the questions on the board. Students can upvote questions they share with classmates, and instructors can see what questions their students have and which questions are shared among the most students.

Student users can:
- View the Question Board for a class
- Anonymously post a question to a Question Board
- Upvote a question so it grabs your teacher's attention

Teacher users can:
- View the Question Board for a class session
- View the name of the student who asked a question
- See how many votes a question has received
- Delete questions from a Question Board
- Mark questions as answered
- Sort questions by votes or time raised
- Add class sessions to a course collection
- Delete class sessions to a course collection

## Live Demo

[Live Demo](https://youtu.be/p64cJTd2wSw)

## Installation

1. Clone this repository
2. Install dependencies by running `npm install`
3. Create a [Firebase](https://firebase.google.com/) project 
    - Setup a [Google Cloud Firestore Database](https://firebase.google.com/docs/firestore)
    - Enable [authentication](https://firebase.google.com/docs/auth/where-to-start) with `Email/Password`
4. Run `npm start` in the project directory to run the application in development mode
