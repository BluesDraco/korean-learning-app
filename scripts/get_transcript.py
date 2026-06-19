import sys
import json

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "videoId required"}))
        sys.exit(1)

    video_id = sys.argv[1]

    try:
        from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound, TranscriptsDisabled
    except ImportError:
        print(json.dumps({"error": "youtube_transcript_api not installed. Run: pip install youtube-transcript-api"}))
        sys.exit(1)

    try:
        transcript = YouTubeTranscriptApi.get_transcript(
            video_id,
            languages=['ko', 'ko-KR', 'ko-Hans', 'ko-Hant']
        )
        print(json.dumps(transcript))
    except NoTranscriptFound:
        print(json.dumps({"error": "no_korean_transcript"}))
        sys.exit(1)
    except TranscriptsDisabled:
        print(json.dumps({"error": "transcripts_disabled"}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()
