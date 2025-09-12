from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import jobs


def create_app() -> FastAPI:
    app = FastAPI(title="Study App API")

    # Enable CORS for local frontend dev servers
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(jobs.router)
    return app


app = create_app()


