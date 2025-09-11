from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import jobs


def create_app() -> FastAPI:
    app = FastAPI(title="Study App API")
    
    # Add CORS middleware to allow frontend requests
    # This is essential for local development when frontend and backend run on different ports
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:3000",  # Next.js development server
            "http://127.0.0.1:3000",  # Alternative localhost
            "http://localhost:3001",  # Alternative port
            "http://127.0.0.1:3001",  # Alternative port
        ],
        allow_credentials=True,  # Allow cookies and authentication headers
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Allow common HTTP methods
        allow_headers=["*"],  # Allow all headers (including Content-Type for file uploads)
    )
    
    app.include_router(jobs.router)
    return app


app = create_app()


