import os
import uuid
import json

dataset_path = "./dataset"

audio_files = os.listdir(dataset_path)
audio_files = [f for f in audio_files if f.endswith('.mp3')]

audio_labels = [filename.split('.')[0] + ".json" for filename in audio_files]

audio_lib = {}

for audio_file, audio_label in zip(audio_files, audio_labels):
    audio_file_path = os.path.join(dataset_path, audio_file)
    audio_label_path = os.path.join(dataset_path, audio_label)

    uid = str(uuid.uuid4())

    with open(audio_label_path, 'r') as f:
        label_data = f.read()
        label_dict = json.loads(label_data)
        
    audio_lib[uid] = {
        "audio_file": audio_file_path,
        "audio_label": audio_label_path,
        "label_data": label_dict
    }

print(audio_lib)
