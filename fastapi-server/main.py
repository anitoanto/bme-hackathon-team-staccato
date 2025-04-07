from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello from team Staccato!"}

@app.get("/get-similarity")
def get_similarity():
    return {"artists": ["artist1", "artist2", "artist3"]}
