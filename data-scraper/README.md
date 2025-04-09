
# Music Data Collection and Download

This project automates the process of downloading music data from YouTube, collecting metadata from Spotify, and gathering lyrics from Genius. It uses a CSV file with artist and song information and performs various tasks such as:

1. Fetching YouTube links for each song.
2. Downloading the audio from YouTube.
3. Collecting metadata from Spotify for each song.
4. Fetching lyrics for each song from Genius.

## Features

- **YouTube Audio Download**: Downloads the best available audio from YouTube for each song listed in the CSV file.
- **Spotify Metadata**: Collects metadata such as song name, artist, album, release date, popularity, and country of origin.
- **Genius Lyrics**: Fetches song lyrics from Genius API and saves them to a `.txt` file.
- **Flexible Configurations**: Configurable paths for CSV and output folder using `config.json`.

---

## Requirements

- **Python 3.6+**
- **Libraries**:
  - `yt-dlp` (for downloading YouTube audio)
  - `spotipy` (for accessing Spotify data)
  - `lyricsgenius` (for fetching song lyrics from Genius)
  - `google-api-python-client` (for YouTube API)
  - `pandas` (for reading and manipulating the CSV data)
  - `re` (for regular expressions)
  - `time` (for API rate limiting)

To install the required libraries, you can use the provided `requirements.txt` file:

```bash
pip install -r requirements.txt
```

### `requirements.txt`:

```
yt-dlp==2025.4.9
spotipy==2.22.1
lyricsgenius==3.0.1
google-api-python-client==2.94.0
pandas==2.0.2
```

---

## Setup

**Configure API Keys and File Paths**

- Create a `config.json` file in the project root directory by copying the `config.template.json` file and updating the fields with your actual API keys and file paths.
  
  - **YOUTUBE_API_KEY**: Get a YouTube Data API key from [Google Developers Console](https://console.developers.google.com/).
  - **SPOTIFY_CLIENT_ID & SPOTIFY_CLIENT_SECRET**: Obtain these from [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
  - **GENIUS_API_TOKEN**: Get a Genius API token from [Genius API](https://docs.genius.com/).
  - **CSV_PATH**: Provide the path to your CSV file with artist and song names.
  - **OUTPUT_FOLDER**: Define the path where the downloaded files and metadata will be saved.

**Example `config.json`**:

```json
{
    "YOUTUBE_API_KEY": "your-real-youtube-api-key",
    "SPOTIFY_CLIENT_ID": "your-real-spotify-client-id",
    "SPOTIFY_CLIENT_SECRET": "your-real-spotify-client-secret",
    "GENIUS_API_TOKEN": "your-real-genius-api-token",
    "CSV_PATH": "C:/path/to/your/UK_US_Artists.csv",
    "OUTPUT_FOLDER": "C:/path/to/your/output/folder/song_dataset"
}
```

---

## Usage

1. **Prepare your CSV file**: Ensure your CSV file is in the correct format, with columns like `Country`, `Artist`, `Song 1`, `Song 2`, `Song 3`.

Example CSV (`UK_US_Artists.csv`):

```
Country,Artist,Song 1,Song 2,Song 3
UK,Artist Name 1,Song Title 1,Song Title 2,Song Title 3
US,Artist Name 2,Song Title 4,Song Title 5,Song Title 6
```

2. **Run the script**: Once your configuration is set up and your CSV is ready, run the main script to start the process.

```bash
python main.py
```

The script will:
- Fetch YouTube links for each song.
- Download the audio files as MP3 in the output folder.
- Fetch metadata from Spotify for each song.
- Save the metadata as JSON files.
- Fetch lyrics from Genius and save them as `.txt` files.

---

## File Structure

```
your_project/
├── .gitignore              # List of files to ignore (e.g., config.json)
├── config.json             # Configuration file (Do not push to GitHub)
├── config.template.json    # Template for config.json (with placeholders)
├── UK_US_Artists.csv       # CSV file with artist and song data
├── main.py                 # Main script that runs the process
├── song_dataset/           # Folder where downloaded files are saved
├── README.md               # Project documentation
└── requirements.txt        # List of required libraries
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
