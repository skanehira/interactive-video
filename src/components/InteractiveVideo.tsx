import React, { useState, useRef, useEffect } from 'react';
import type { VideoScenario, Choice, InteractionPoint } from '../types/video';
import { ChoiceOverlay } from './ChoiceOverlay';
import './InteractiveVideo.css';

interface InteractiveVideoProps {
  scenario: VideoScenario;
}

export const InteractiveVideo: React.FC<InteractiveVideoProps> = ({ scenario }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSegmentId, setCurrentSegmentId] = useState(scenario.startSegmentId);
  const [showChoices, setShowChoices] = useState(false);
  const [currentInteraction, setCurrentInteraction] = useState<InteractionPoint | null>(null);
  const [visitedSegments, setVisitedSegments] = useState<Set<string>>(new Set([scenario.startSegmentId]));
  const [isLoading, setIsLoading] = useState(true);

  const currentSegment = scenario.segments.find(seg => seg.id === currentSegmentId);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentSegment) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;

      // 現在の時間に該当するインタラクションを探す
      const interaction = scenario.interactions.find(
        int => int.segmentId === currentSegmentId &&
          currentTime >= int.timestamp &&
          currentTime < int.timestamp + int.duration
      );

      // インタラクションが見つかった場合
      if (interaction) {
        // 現在表示中でないインタラクションの場合のみ表示
        if (currentInteraction?.id !== interaction.id) {
          setCurrentInteraction(interaction);
          setShowChoices(true);
        }
      } else if (showChoices && currentInteraction) {
        // インタラクション期間外になったら選択肢を非表示
        setShowChoices(false);
        setCurrentInteraction(null);
      }
    };

    const handleLoadedData = async () => {
      console.log("Video loaded:", currentSegment.title);
      setIsLoading(false);
      // 動画が読み込まれたら自動再生
      try {
        await video.play();
      } catch (error) {
        console.log("Autoplay was prevented:", error);
      }
    }

    const handleEnded = () => {
      if (currentSegmentId === 'ending') {
        if (video) {
          video.currentTime = 0;
          video.pause();
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentSegment, currentSegmentId, scenario, showChoices, currentInteraction]);

  const handleChoiceSelect = (choice: Choice) => {
    setShowChoices(false);
    setCurrentInteraction(null);
    setCurrentSegmentId(choice.nextSegmentId);
    setVisitedSegments(prev => new Set([...prev, choice.nextSegmentId]));
    setIsLoading(true);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleRestart = () => {
    setCurrentSegmentId(scenario.startSegmentId);
    setVisitedSegments(new Set([scenario.startSegmentId]));
    setShowChoices(false);
    setCurrentInteraction(null);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  if (!currentSegment) {
    return <div className="error-message">動画セグメントが見つかりません</div>;
  }

  const progress = (visitedSegments.size / scenario.segments.length) * 100;

  return (
    <div className="interactive-video-container">
      <div className="video-header">
        <h2 className="video-title">{scenario.title}</h2>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
          <span className="progress-text">{visitedSegments.size}/{scenario.segments.length} セグメント訪問済み</span>
        </div>
      </div>

      <div className="video-wrapper">
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner" />
            <p>動画を読み込み中...</p>
          </div>
        )}

        <video
          ref={videoRef}
          className="video-player"
          src={currentSegment.src}
          controls
          autoPlay
          muted
          playsInline
        />

        <ChoiceOverlay
          choices={currentInteraction?.choices || []}
          onChoiceSelect={handleChoiceSelect}
          isVisible={showChoices}
        />

        <div className="video-info">
          <h3>{currentSegment.title}</h3>
          {currentSegment.description && <p>{currentSegment.description}</p>}
        </div>
      </div>

      <div className="video-controls">
        <button onClick={handleRestart} className="restart-button">
          🔄 最初から再生
        </button>
        {currentSegmentId === 'ending' && (
          <div className="completion-message">
            🎉 ストーリーを完了しました！
          </div>
        )}
      </div>
    </div>
  );
};
