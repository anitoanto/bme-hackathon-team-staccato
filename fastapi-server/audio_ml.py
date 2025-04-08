import torch
import torchaudio
import torchaudio.transforms as T
from transformers import Wav2Vec2Processor, Data2VecAudioModel
from torch import nn
import sys

from pydub import AudioSegment
import numpy as np

def load_audio(file_path, target_sr=16000):
    audio = AudioSegment.from_file(file_path)
    audio = audio.set_frame_rate(target_sr).set_channels(1).set_sample_width(2)
    samples = np.array(audio.get_array_of_samples()).astype(np.float32) / 32768.0
    return torch.tensor(samples), target_sr


def get_embedding(audio_tensor, sampling_rate):
    processor = Wav2Vec2Processor.from_pretrained("facebook/data2vec-audio-base-960h")
    model = Data2VecAudioModel.from_pretrained("m-a-p/music2vec-v1")

    inputs = processor(audio_tensor, sampling_rate=sampling_rate, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs, output_hidden_states=True)

    # Stack the hidden states: [13, time, 768]
    all_layer_hidden_states = torch.stack(outputs.hidden_states).squeeze(1)

    # Reduce time dimension: [13, 768]
    time_reduced = all_layer_hidden_states.mean(dim=1)

    # Weighted aggregation: [768]
    aggregator = nn.Conv1d(in_channels=13, out_channels=1, kernel_size=1)
    embedding = aggregator(time_reduced.unsqueeze(0)).squeeze()

    return embedding

def get_similarity(embedding1, embedding2):
    """Compute cosine similarity between two embeddings using np arrray with torch."""
    embedding1 = torch.tensor(embedding1)
    embedding2 = torch.tensor(embedding2)
    similarity = torch.nn.functional.cosine_similarity(embedding1, embedding2, dim=0)
    return similarity.item()

def get_embedding_from_file(file_path):
    audio_tensor, sr = load_audio(file_path)
    embedding = get_embedding(audio_tensor, sr)
    return np.array(embedding.tolist())

