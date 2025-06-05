import type { VideoScenario } from '../types/video';

export const sampleScenario: VideoScenario = {
  id: 'travel-adventure',
  title: '旅行先を選ぼう！',
  startSegmentId: 'intro',
  segments: [
    {
      id: 'intro',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      title: '旅の始まり',
      description: 'あなたの冒険が始まります。どこへ行きましょうか？'
    },
    {
      id: 'beach',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      title: 'ビーチリゾート',
      description: '美しいビーチでリラックス'
    },
    {
      id: 'mountain',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      title: '山岳地帯',
      description: '雄大な山々を探検'
    },
    {
      id: 'city',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      title: '都市観光',
      description: '活気ある都市を巡る'
    },
    {
      id: 'ending',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      title: '旅の終わり',
      description: '素晴らしい旅でした！'
    }
  ],
  interactions: [
    {
      id: 'first-choice',
      segmentId: 'intro',
      timestamp: 5,
      duration: 8,
      choices: [
        {
          id: 'choice-beach',
          text: 'ビーチでリラックス',
          icon: '🏖️',
          nextSegmentId: 'beach'
        },
        {
          id: 'choice-mountain',
          text: '山を探検',
          icon: '⛰️',
          nextSegmentId: 'mountain'
        },
        {
          id: 'choice-city',
          text: '都市を観光',
          icon: '🏙️',
          nextSegmentId: 'city'
        }
      ]
    },
    {
      id: 'beach-end',
      segmentId: 'beach',
      timestamp: 8,
      duration: 7,
      choices: [
        {
          id: 'beach-to-end',
          text: '旅を終える',
          icon: '✨',
          nextSegmentId: 'ending'
        },
        {
          id: 'beach-to-mountain',
          text: '次は山へ',
          icon: '⛰️',
          nextSegmentId: 'mountain'
        }
      ]
    },
    {
      id: 'mountain-end',
      segmentId: 'mountain',
      timestamp: 8,
      duration: 7,
      choices: [
        {
          id: 'mountain-to-end',
          text: '旅を終える',
          icon: '✨',
          nextSegmentId: 'ending'
        },
        {
          id: 'mountain-to-city',
          text: '次は都市へ',
          icon: '🏙️',
          nextSegmentId: 'city'
        }
      ]
    },
    {
      id: 'city-end',
      segmentId: 'city',
      timestamp: 8,
      duration: 7,
      choices: [
        {
          id: 'city-to-end',
          text: '旅を終える',
          icon: '✨',
          nextSegmentId: 'ending'
        },
        {
          id: 'city-to-beach',
          text: '次はビーチへ',
          icon: '🏖️',
          nextSegmentId: 'beach'
        }
      ]
    }
  ]
};
