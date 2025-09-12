from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from uuid import uuid4
import os


router = APIRouter()


class ProcessRequest(BaseModel):
    filename: str
    contentType: str | None = None
    size: int | None = None


@router.post("/process")
async def create_process(file: UploadFile = File(...)):
    job_id = str(uuid4())
    # Save file to a temp uploads directory to simulate processing
    os.makedirs("uploads", exist_ok=True)
    file_path = os.path.join("uploads", f"{job_id}_{file.filename}")
    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)
    return {"status": "success", "jobId": job_id, "filename": file.filename}


@router.get("/jobs/{id}")
def get_job(id: str):
    return {"id": id, "status": "processing"}


