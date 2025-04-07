import torch
import torchaudio
import librosa
import numpy as np
from scipy.spatial.distance import cosine
import sounddevice as sd
import soundfile as sf
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image

# Load the pretrained VGGish model (using a simplified version as a feature extractor)
vggish = models.vgg11(pretrained=True).features  # Use VGG11 features as a proxy
vggish.eval()

# Define a transformation pipeline (simplified for demonstration)
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

def mp3_to_embedding_vggish(mp3_file_path):
    """
    Converts an MP3 file to its embedding vector using a simplified VGGish approach.

    Args:
        mp3_file_path (str): The path to the MP3 file.

    Returns:
        torch.Tensor: The embedding vector of the audio. Returns None if an error occurs.
    """
    # try:
    waveform, sr = librosa.load(mp3_file_path, sr=16000, mono=True)
    # Convert audio to spectrogram (simplified)
    spectrogram = librosa.feature.melspectrogram(y=waveform, sr=sr)
    spectrogram = librosa.power_to_db(spectrogram, ref=np.max)
    spectrogram = np.stack([spectrogram, spectrogram, spectrogram], axis=-1) #convert to 3 channel image
    spectrogram = Image.fromarray(spectrogram.astype(np.uint8)) #convert to image.
    spectrogram = transform(spectrogram).unsqueeze(0) #transform and add batch dim

    with torch.no_grad():
        embedding = vggish(spectrogram)
        embedding = torch.mean(embedding, dim=(2, 3)) #global average pooling
        embedding = torch.flatten(embedding, 1) #flatten

    return embedding
    # except Exception as e:
    #     print(f"Error processing {mp3_file_path}: {e}")
    #     return None

def play_audio(audio_file_path):
    """
    Plays an audio file.

    Args:
        audio_file_path (str): The path to the audio file.
    """
    try:
        data, samplerate = sf.read(audio_file_path)
        sd.play(data, samplerate)
        sd.wait()  # Wait until playback is finished
    except Exception as e:
        print(f"Error playing {audio_file_path}: {e}")

def compute_similarity(embedding1, embedding2):
    """
    Computes the cosine similarity between two embedding vectors.

    Args:
        embedding1 (torch.Tensor): The first embedding vector.
        embedding2 (torch.Tensor): The second embedding vector.

    Returns:
        float: The cosine similarity between the two vectors. Returns None if an error occurs.
    """
    try:
        similarity = 1 - cosine(embedding1.numpy().flatten(), embedding2.numpy().flatten())
        return similarity
    except Exception as e:
        print(f"Error computing similarity: {e}")
        return None

# Example usage:
audio_file1 = "dataset/sample2.mp3"  # Replace with your audio file path
audio_file2 = "dataset/sample5.mp3"  # Replace with your audio file path

embedding1 = mp3_to_embedding_vggish(audio_file1)
embedding2 = mp3_to_embedding_vggish(audio_file2)

if embedding1 is not None and embedding2 is not None:
    similarity = compute_similarity(embedding1, embedding2)
    if similarity is not None:
        print(f"Similarity between {audio_file1} and {audio_file2}: {similarity}")

    # Play the audio files
    play_audio(audio_file1)
    play_audio(audio_file2)
else:
    print("One or both embeddings could not be generated.")