import styles from './Test.module.css';
import YouTubeSegmentPlayer from './YouTubeSegmentPlayer';

function TestComponent() {
  return (
    <div className={styles['container']}>
      <h1>YouTube Segment Playback Test</h1>
      <p>Testing video segment: 0 seconds to 40 seconds</p>
      <YouTubeSegmentPlayer
        videoId="QL4_4GAWvPs"
        start={0}
        end={40}
        width={800}
        height={450}
        autoplay={true}
      />
    </div>
  );
}

export default TestComponent;
