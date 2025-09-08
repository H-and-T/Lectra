from fastapi import APIRouter
from pydantic import BaseModel
from uuid import uuid4


router = APIRouter()


class ProcessRequest(BaseModel):
    filename: str
    contentType: str | None = None
    size: int | None = None


@router.post("/process")
def create_process(req: ProcessRequest):
    job_id = str(uuid4())
    return {"jobId": job_id}


@router.get("/jobs/{id}")
def get_job(id: str):
    return {"id": id, "status": "processing"}


