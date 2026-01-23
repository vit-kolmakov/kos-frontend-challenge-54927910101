# Kinexon Frontend

A short guide on how to setup frontend to run locally.

## Prerequisites

- Docker 28

## Installation

If you want to run both frontend and backend together then

Navigate to the root directory and run the following command

```bash
   docker compose up --build
```

In the frontend folder run the follwing command to build the docker image

```bash
docker build -t kinexon-frontend -f Dockerfile .
```

Run the Image using

```bash
docker run -p 5173:80 kinexon-frontend
```

Visit `http://localhost:5173` in your browser to access the frontend page.

Make sure back is already running locally.

### Alternatively

You can also run the frontend locally without dockey by running the following commands

#### Prerequisites

- Node 18

Install all the packages using

```bash
npm install
```

Run the following command to start frontend server

```bash
npm run dev
```

To run Unit Tests

```bash
npm run test
```
