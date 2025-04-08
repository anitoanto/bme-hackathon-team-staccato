import os
import uuid
import json
import pandas as pd
from pprint import pprint
from staccato_db import StaccatoDB

dataset_path = "./dataset"

audio_files = os.listdir(dataset_path)
audio_files = [f for f in audio_files if f.endswith('.mp3')]

audio_labels = [filename.split('.')[0] + ".json" for filename in audio_files]
audio_lyrics = [filename.split('.')[0] + ".txt" for filename in audio_files]

audio_lib = {}
for audio_file, audio_label, audio_ly in zip(audio_files, audio_labels, audio_lyrics):
    audio_label_path = os.path.join(dataset_path, audio_label)
    audio_ly_path = os.path.join(dataset_path, audio_ly)

    uid = str(uuid.uuid4())

    with open(audio_label_path, 'r') as f:
        label_data = f.read()
        label_dict = json.loads(label_data)
    
    with open(audio_ly_path, 'r') as f:
        lyrics_data = f.read()
        label_dict['lyrics'] = lyrics_data
        
    audio_lib[uid] = {
        "album_name": label_dict['album_name'],
        "artist_name": label_dict['artist_name'],
        "song_name": label_dict['song_name'],
        "country_of_origin": label_dict['country_of_origin'],
        "popularity": label_dict['popularity'],
        "release_date": label_dict['release_date'],
        "lyrics": lyrics_data,
        "filename": audio_file
    }

db = StaccatoDB("staccato.db")
db.connect()

db.drop_table("music_lib")
db.create_table("music_lib", {
    "uid": "TEXT PRIMARY KEY",
    "album_name": "TEXT",
    "artist_name": "TEXT",
    "song_name": "TEXT",
    "country_of_origin": "TEXT",
    "popularity": "INTEGER",
    "release_date": "DATE",
    "lyrics": "TEXT",
    "filename": "TEXT"
})

for uid, data in audio_lib.items():
    db.insert_data("music_lib", {
        "uid": uid,
        "album_name": data["album_name"],
        "artist_name": data["artist_name"],
        "song_name": data["song_name"],
        "country_of_origin": data["country_of_origin"],
        "popularity": data["popularity"],
        "release_date": data["release_date"],
        "lyrics": data["lyrics"],
        "filename": data["filename"]
    })

db.close()
