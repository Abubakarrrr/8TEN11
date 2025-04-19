"use client"

import React, { useState } from "react"
import ReactPlayer from "react-player"
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from "lucide-react"

const VideoPlayer = ({ videoUrl, thumbnail }) => {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [played, setPlayed] = useState(0)
  const [seeking, setSeeking] = useState(false)

  const handlePlayPause = () => {
    setPlaying(!playing)
  }

  const handleVolumeChange = (e) => {
    setVolume(Number.parseFloat(e.target.value))
  }

  const handleToggleMute = () => {
    setMuted(!muted)
  }

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played)
    }
  }

  const handleSeekMouseDown = () => {
    setSeeking(true)
  }

  const handleSeekChange = (e) => {
    setPlayed(Number.parseFloat(e.target.value))
  }

  const handleSeekMouseUp = (e) => {
    setSeeking(false)
    // Seek to the position
    playerRef.current.seekTo(Number.parseFloat(e.target.value))
  }

  const playerRef = React.useRef(null)

  return (
    <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
      <div className="aspect-w-16 aspect-h-9">
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          progressInterval={1000}
          light={!playing && thumbnail}
          controls={false}
          className="absolute top-0 left-0"
        />
      </div>

      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity opacity-100 hover:opacity-100">
        {/* Progress Bar */}
        <div className="mb-2">
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={handlePlayPause} className="text-white hover:text-indigo-400 transition-colors">
              {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>

            <div className="flex items-center space-x-2">
              <button onClick={handleToggleMute} className="text-white hover:text-indigo-400 transition-colors">
                {muted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-indigo-400 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <button className="text-white hover:text-indigo-400 transition-colors">
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
