from staccato_db import StaccatoDB
from audio_ml import get_similarity
import numpy as np

db = StaccatoDB("staccato.db")
db.connect()

db.drop_table("music_dist")
db.create_table("music_dist", {"uid1": "TEXT", "uid2": "TEXT", "audio_dist": "REAL", "lyrics_dist": "REAL"})

results = db.run_query("select uid from music_lib order by uid")

dist_info = []

num = 0
for uid1 in results:
    for uid2 in results:
        audio_emb1 = db.run_query(f'select embedding from music_emb where uid = "{uid1[0]}"')[
            0
        ][0]
        audio_emb1 = np.fromstring(audio_emb1[1:-1], sep=" ")
        audio_emb2 = db.run_query(f'select embedding from music_emb where uid = "{uid2[0]}"')[
            0
        ][0]
        audio_emb2 = np.fromstring(audio_emb2[1:-1], sep=" ")
        audio_dist = get_similarity(audio_emb1, audio_emb2)

        lyrics_emb1 = db.run_query(f'select embedding from lyrics_emb where uid = "{uid1[0]}"')
        lyrics_emb1 = lyrics_emb1[0][0]
        lyrics_emb1 = np.fromstring(lyrics_emb1[1:-1], sep=" ")

        lyrics_emb2 = db.run_query(f'select embedding from lyrics_emb where uid = "{uid2[0]}"')
        lyrics_emb2 = lyrics_emb2[0][0]
        lyrics_emb2 = np.fromstring(lyrics_emb2[1:-1], sep=" ")
        lyrics_dist = get_similarity(lyrics_emb1, lyrics_emb2)
        dist_info.append((uid1[0], uid2[0], audio_dist, lyrics_dist))
        num += 1
        db.insert_data(
            "music_dist",
            {"uid1": uid1[0], "uid2": uid2[0], "audio_dist": audio_dist, "lyrics_dist": lyrics_dist},
        )
        print(num, uid1[0], uid2[0], audio_dist, lyrics_dist)

db.close()
