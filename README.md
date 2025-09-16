# Bachelor Thesis Repository

## Frontend Setup
You need `Node.js version >= 20.19.0` and a node package manager of your choice such as `npm or yarn`.
Create .env in the `frontend` folder according to `.env.examples`

## Run for Development
To run an instance locally under `http://localhost:5173/`
```
cd frontend
npm install
npm run dev
```

## Backend Setup
You need `Python3` and a package manager such as `pip`.
Create .env according to `.env.examples`

```
cd backend
pip install gliner fastapi[standard]
npm install express axios mongodb cors
```

Run GLiNER FastAPI Server on localhost:
```
uvicorn main:app --reload --port 8000
```

Run Express Server on localhost:
```
node server.js
```
