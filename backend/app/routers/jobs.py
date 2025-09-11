from fastapi import APIRouter, UploadFile, File, FastAPI

from fastapi.middleware.cors import CORSMiddleware


from pydantic import BaseModel
from uuid import uuid4

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",      # Vite default
    "http://127.0.0.1:5173",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # if you need cookies/credentials, this cannot be ["*"]
    allow_credentials=True,       # set False if you’re not using cookies/auth headers
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter()

app.include_router(router)




class ProcessRequest(BaseModel):
    filename: str
    contentType: str | None = None
    size: int | None = None


@router.post("/process")
async def create_process(file: UploadFile = File(...)):
    job_id = str(uuid4())

    # Debug: print file details
    print(f"Filename: {file.filename}")
    print(f"Content type: {file.content_type}")

    response =  {"status": "success", "jobId": job_id, "filename": file.filename}

    print(response)
    return {"status": "success", "jobId": job_id, "filename": file.filename}

@router.get("/jobs/{id}")
def get_job(id: str):
    return {"id": id, "status": "processing"}


