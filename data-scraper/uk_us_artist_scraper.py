import os
import re
import time
import json
import csv
import pandas as pd
import yt_dlp
import spotipy
import lyricsgenius
from spotipy.oauth2 import SpotifyClientCredentials
from googleapiclient.discovery import build

# Load Config from config.json
with open("config.json", "r") as config_file:
    config = json.load(config_file)

YOUTUBE_API_KEY = config['YOUTUBE_API_KEY']
SPOTIFY_CLIENT_ID = config['SPOTIFY_CLIENT_ID']
SPOTIFY_CLIENT_SECRET = config['SPOTIFY_CLIENT_SECRET']
GENIUS_API_TOKEN = config['GENIUS_API_TOKEN']
CSV_PATH = config['CSV_PATH']
OUTPUT_FOLDER = config['OUTPUT_FOLDER']

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# 1. Load CSV
df = pd.read_csv(CSV_PATH)

# 2. YouTube Setup
youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

def get_youtube_link(query):
    try:
        search_response = youtube.search().list(
            q=query,
            part='id',
            maxResults=1,
            type='video'
        ).execute()
        video_id = search_response['items'][0]['id']['videoId']
        return f'https://www.youtube.com/watch?v={video_id}'
    except Exception as e:
        print(f"Error fetching YouTube link for {query}: {e}")
        return None

# 3. Get YouTube Links
for index, row in df.iterrows():
    for song_num in range(1, 4):
        song_title = row[f'Song {song_num}']
        artist = row['Artist']
        query = f"{artist} {song_title}"
        youtube_link = get_youtube_link(query)
        if youtube_link:
            df.at[index, f'Song {song_num} Link'] = youtube_link
        time.sleep(1)  # Respect API rate limits

df.to_csv('UK_US_Artists_YT.csv', index=False)

# 4. Download YouTube Audio
def clean_filename(text):
    return re.sub(r'[\\/*?:"<>|]', "", text)

def get_ydl_opts(filename):
    return {
        'format': 'bestaudio/best',
        'outtmpl': os.path.join(OUTPUT_FOLDER, f"{filename}.%(ext)s"),
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'quiet': True,
        'no_warnings': True
    }

df = pd.read_csv('UK_US_Artists_YT.csv')
for index, row in df.iterrows():
    artist = clean_filename(row['Artist'])
    for i in range(1, 4):
        song = row[f'Song {i}']
        link = row.get(f'Song {i} Link')
        if pd.notna(link):
            song_clean = clean_filename(song)
            filename = f"{artist} - {song_clean}"
            try:
                with yt_dlp.YoutubeDL(get_ydl_opts(filename)) as ydl:
                    ydl.download([link])
                print(f"Downloaded: {filename}")
            except Exception as e:
                print(f"Error downloading {filename}: {e}")

# 5. Spotify Metadata Collection
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id=SPOTIFY_CLIENT_ID,
    client_secret=SPOTIFY_CLIENT_SECRET
))

def load_artist_country_mapping(csv_file):
    mapping = {}
    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            mapping[row['Artist'].strip().lower()] = row['Country'].strip()
    return mapping

artist_country_mapping = load_artist_country_mapping('UK_US_Artists_YT.csv')

def get_country_of_origin(artist_name):
    return artist_country_mapping.get(artist_name.strip().lower(), 'N/A')

def get_song_metadata(song_name):
    results = sp.search(q=song_name, limit=1, type="track")
    if results['tracks']['items']:
        track = results['tracks']['items'][0]
        album = track['album']
        artist = track['artists'][0]
        return {
            'song_name': track['name'],
            'artist_name': artist['name'],
            'album_name': album['name'],
            'release_date': album['release_date'],
            'duration_ms': track['duration_ms'],
            'popularity': track['popularity'],
            'preview_url': track['preview_url'],
            'images': album.get('images', []),
            'country_of_origin': get_country_of_origin(artist['name'])
        }
    return None

for filename in os.listdir(OUTPUT_FOLDER):
    if filename.endswith(".mp3"):
        try:
            artist_name, song_name = filename[:-4].split(" - ")
            metadata = get_song_metadata(f"{artist_name} {song_name}")
            if metadata:
                json_filename = os.path.join(OUTPUT_FOLDER, f"{filename[:-4]}.json")
                with open(json_filename, 'w', encoding='utf-8') as f:
                    json.dump(metadata, f, ensure_ascii=False, indent=4)
                print(f"Metadata saved: {json_filename}")
        except Exception as e:
            print(f"Metadata error for {filename}: {e}")

# 6. Genius Lyrics
genius = lyricsgenius.Genius(GENIUS_API_TOKEN, skip_non_songs=True,
                             excluded_terms=["(Remix)", "(Live)"],
                             remove_section_headers=True)

for filename in os.listdir(OUTPUT_FOLDER):
    if filename.endswith(".mp3"):
        try:
            artist_name, song_name = filename[:-4].split(" - ")
            song_data = genius.search_song(song_name, artist_name)
            if song_data and song_data.lyrics:
                lyrics_filename = os.path.join(OUTPUT_FOLDER, f"{artist_name} - {song_name}.txt")
                with open(lyrics_filename, 'w', encoding='utf-8') as f:
                    f.write(song_data.lyrics)
                print(f"Lyrics saved: {lyrics_filename}")
        except Exception as e:
            print(f"Lyrics error for {filename}: {e}")

# 7. Clean Lyrics
for filename in os.listdir(OUTPUT_FOLDER):
    if filename.endswith(".txt"):
        filepath = os.path.join(OUTPUT_FOLDER, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            lines = f.readlines()
        if len(lines) > 1:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write("".join(lines[1:]))
        print(f"Lyrics cleaned: {filename}")
