from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import auth, users, gyms, gym_suggestions, contact_messages

app = FastAPI(title="Gym Finder Riyadh API")

# CORS for React (localhost:5173 and localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    # Auto-create tables for convenience (still use Alembic for migrations)
    Base.metadata.create_all(bind=engine)


app.include_router(auth.router)
app.include_router(users.router)
app.include_router(gyms.router)
app.include_router(gym_suggestions.router)
app.include_router(contact_messages.router)


@app.get("/")
def root():
    return {"status": "ok"}

