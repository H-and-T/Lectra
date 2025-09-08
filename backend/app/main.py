from fastapi import FastAPI
from .routers import jobs


def create_app() -> FastAPI:
    app = FastAPI(title="Study App API")
    app.include_router(jobs.router)
    return app


app = create_app()


