from audio_ml import get_embedding_from_file
from staccato_db import StaccatoDB

db = StaccatoDB("staccato.db")
db.connect()

db.drop_table("music_emb")

db.create_table("music_emb", {
    "uid": "TEXT PRIMARY KEY",
    "embedding": "TEXT"
})

songs = db.fetch_data("music_lib", cols = ["uid", "filename"])

for uid, filename in songs:
    print(f"Processing: {filename}")
    embedding = get_embedding_from_file(f"./dataset/{filename}")
    db.insert_data("music_emb", {
        "uid": uid,
        "embedding": str(embedding)
    })

db.close()
