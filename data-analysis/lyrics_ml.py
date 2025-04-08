from sentence_transformers import SentenceTransformer, util
import numpy as np

def get_lyrics_embeddings(lyrics_txt):
    model_name = "all-MiniLM-L6-v2"
    model = SentenceTransformer(model_name)
    embedding = model.encode(lyrics_txt, convert_to_tensor=True).tolist()
    return np.array(embedding)
