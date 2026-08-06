FROM python:3.11-slim

WORKDIR /backend

# Install system dependencies required for OpenCV and ReportLab
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*


COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Ensure data, uploads, and models directories exist
RUN mkdir -p /backend/data /backend/uploads /backend/models

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
