FROM python:3.9-slim

WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose port
EXPOSE 8001

# Start command (overridden in docker-compose for dev)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
