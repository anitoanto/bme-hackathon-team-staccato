from staccato_db import StaccatoDB
import numpy as np

db = StaccatoDB("staccato.db")
db.connect()

results = db.run_query(
    """select song_name, country_of_origin, artist_name, embedding from music_lib as ml
    left join lyrics_emb as le on ml.uid = le.uid"""
)

projected_embs = []
projected_labels = []
for song_name, country_of_origin, artist_name, embedding in results:
    embedding = np.fromstring(embedding[1:-1], sep=" ").tolist()
    embedding = str(embedding[1:-1]).replace(",", "\t")[1:-1]
    projected_embs.append(embedding)
    projected_labels.append(f"{country_of_origin}, {artist_name} - {song_name}")

with open("lyrics_projected_embs.txt", "w") as f:
    for emb in projected_embs:
        f.write(emb + "\n")
with open("lyrics_projected_labels.txt", "w") as f:
    for label in projected_labels:
        f.write(label + "\n")

db.close()
