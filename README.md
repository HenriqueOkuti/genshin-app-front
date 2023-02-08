# Genshin Task Manager (Front-End)

<div align='center'>
    <img width='50%' src='./Readme assets/Landing Page.png' alt='Landing page' />
</div>

## About

<p>Genshin Task Manager is a Task Management App for players of Genshin Impact. Here you'll be able to track your character progression (talents, level, friendship and constellation) alongside the ability to plan your tasks in advance. Currently you are able to create task lists for Dungeon, Boss, Weekly Boss and Enemy materials, alongside local specialties, as long as there is a character using those materials.</p>

<div style='display: flex;' align='center'>
    <img width='45%' src='./Readme assets/Home.png' alt='Home page' />
    <img width='45%' src='./Readme assets/Home Alt.png' alt='Alt Home page' />
</div>

## How to run

The only essential environment variable is the REACT_APP_API_BASE_URL, which should point towards the api URL. However, to run this app with the OAuth features you'll need to fill the rest of the .env file inside the `./frontend` folder, following the `.env.example`, otherwise you'll be limited to run it with the default sign up and login options. Please refer to the back-end repository for API information.

### Docker

If you have access to docker compose, you can simply run it by using

```bash
docker-compose up --build
```

By default, the `PORT` used by the application is `PORT=80`, so refer to `http://localhost:80/` to use the application.

### Node

Alternatively you can run the front via npm scripts. Just use the following commands

```bash
    npm i && npm run start
```

## Application Images

<div style='display: flex;' align='center'>
    <img width='45%' src='./Readme assets/New Character Filtered.png' alt='New Character Filtered' />
    <img width='45%' src='./Readme assets/New Character Info Menu.png' alt='New Character Info Menu' />
</div>

<div style='display: flex;' align='center'>
    <img width='45%' src='./Readme assets/New Task.png' alt='New Task' />
    <img width='45%' src='./Readme assets/New Task - Item Menu.png' alt='New Task - Item Menu' />
</div>

<div style='display: flex;' align='center'>
    <img width='45%' src='./Readme assets/Profile.png' alt='Profile' />
    <img width='45%' src='./Readme assets/Characters Filtered.png' alt='Characters Filtered' />
</div>
