import uvicorn

if __name__ == "__main__":
    print("Starting NiveshRakshak AI Backend on http://localhost:8080...")
    uvicorn.run("app.main:app", host="127.0.0.1", port=8080, reload=True)
