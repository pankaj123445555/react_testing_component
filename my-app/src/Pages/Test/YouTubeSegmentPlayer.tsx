import { useEffect, useRef, useState } from 'react';

interface YouTubeSegmentPlayerProps {
  videoId: string;
  start?: number;
  end?: number;
  width?: number | string;
  height?: number | string;
  autoplay?: boolean;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function YouTubeSegmentPlayer({
  videoId,
  start = 0,
  end = 55,
  width = 560,
  height = 315,
  autoplay = true,
}: YouTubeSegmentPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const timerRef = useRef<number | null>(null);

  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  const duration = end - start;

  useEffect(() => {
    if (!videoId) return;

    const loadYouTubeAPI = () =>
      new Promise<void>(resolve => {
        if (window.YT && window.YT.Player) {
          resolve();
          return;
        }

        const existingScript = document.getElementById('youtube-iframe-api');

        if (!existingScript) {
          const tag = document.createElement('script');
          tag.id = 'youtube-iframe-api';
          tag.src = 'https://www.youtube.com/iframe_api';
          document.body.appendChild(tag);
        }

        window.onYouTubeIframeAPIReady = () => resolve();
      });

    const clearTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const enforceSegment = () => {
      clearTimer();

      timerRef.current = window.setInterval(() => {
        const player = playerRef.current;
        if (!player || !player.getCurrentTime) return;

        const current = player.getCurrentTime();
        const elapsed = current - start;

        // Stop at end
        if (current >= end) {
          player.pauseVideo();
          player.seekTo(end - 0.1, true);
          setProgress(100);
          clearTimer();
          return;
        }

        const percent = Math.min((elapsed / duration) * 100, 100);
        setProgress(percent);
      }, 100);
    };

    const initPlayer = async () => {
      await loadYouTubeAPI();

      if (!containerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        width,
        height,
        videoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          controls: 0, // hide default controls
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            setReady(true);
            playerRef.current.seekTo(start, true);
            if (autoplay) playerRef.current.playVideo();
            enforceSegment();
          },
          onStateChange: (event: any) => {
            const YT = window.YT;
            if (!YT) return;

            if (event.data === YT.PlayerState.PLAYING) {
              enforceSegment();
            }

            if (
              event.data === YT.PlayerState.PAUSED ||
              event.data === YT.PlayerState.ENDED
            ) {
              clearTimer();
            }
          },
        },
      });
    };

    initPlayer();

    return () => {
      clearTimer();
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      setReady(false);
    };
  }, [videoId, start, end, width, height, autoplay, duration]);

  // Manual seek inside fake progress bar
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;

    const newTime = start + percent * duration;

    playerRef.current.seekTo(newTime, true);
    setProgress(percent * 100);
  };

  return (
    <div style={{ width }}>
      <div ref={containerRef} />

      {!ready && <div style={{ marginTop: 8 }}>Loading player…</div>}

      {/* Custom Progress Bar */}
      <div
        onClick={handleSeek}
        style={{
          marginTop: 12,
          height: 8,
          background: '#ddd',
          borderRadius: 4,
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: '#ff0000',
            borderRadius: 4,
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      {/* Time Display */}
      <div style={{ fontSize: 12, marginTop: 6 }}>
        {Math.floor((progress / 100) * duration)} / {duration} sec
      </div>
    </div>
  );
}
