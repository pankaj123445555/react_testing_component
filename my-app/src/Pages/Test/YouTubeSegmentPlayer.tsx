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
    YT: {
      Player: new (element: HTMLElement | string, options: any) => any;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function YouTubeSegmentPlayer({
  videoId,
  start = 0,
  end = 40,
  width = 560,
  height = 315,
  autoplay = true,
}: YouTubeSegmentPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const timerRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!videoId) return;

    // Load YouTube IFrame API once
    const loadYT = (): Promise<void> =>
      new Promise((resolve: (value?: void) => void) => {
        if (window.YT && window.YT.Player) return resolve();

        const existing = document.getElementById('youtube-iframe-api');
        if (existing) {
          // If script is already present, wait for it to be ready
          const check = setInterval(() => {
            if (window.YT && window.YT.Player) {
              clearInterval(check);
              resolve();
            }
          }, 50);
          return;
        }

        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);

        // The API calls this global when ready
        const prev = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (typeof prev === 'function') prev();
          resolve();
        };
      });

    const clearTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const startEndEnforcer = () => {
      clearTimer();
      timerRef.current = setInterval(() => {
        const p = playerRef.current;
        if (!p || typeof p.getCurrentTime !== 'function') return;
        const t = p.getCurrentTime();
        if (t >= end) {
          p.pauseVideo();
          p.seekTo(end - 0.1, true);
          clearTimer();
        }
      }, 50);
    };

    const init = async () => {
      await loadYT();

      // Destroy any previous player
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}
        playerRef.current = null;
      }

      if (!containerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        width,
        height,
        videoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          start: Math.max(0, Math.floor(start)),
          // NOTE: end is not reliably enforced by playerVars alone, so we enforce manually.
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            setReady(true);
            // Ensure start position
            if (playerRef.current) {
              playerRef.current.seekTo(start, true);
              if (autoplay) playerRef.current.playVideo();
            }
            startEndEnforcer();
          },
          onStateChange: (e: any) => {
            // If user resumes playback after pause, enforce end again
            const YT = window.YT;
            if (!YT) return;
            if (e.data === YT.PlayerState.PLAYING) startEndEnforcer();
            if (
              e.data === YT.PlayerState.PAUSED ||
              e.data === YT.PlayerState.ENDED
            )
              clearTimer();
          },
        },
      });
    };

    init();

    return () => {
      // cleanup
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}
        playerRef.current = null;
      }
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      setReady(false);
    };
  }, [videoId, start, end, width, height, autoplay]);

  return (
    <div>
      <div ref={containerRef} />
      {!ready && <div style={{ marginTop: 8 }}>Loading player…</div>}
    </div>
  );
}
