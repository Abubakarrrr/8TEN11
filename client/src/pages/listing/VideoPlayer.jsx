"use client"

import { useState, useRef } from "react"
import ReactPlayer from "react-player"
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react'

const VideoPlayer = ({ videoUrl, thumbnail }) => {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [played, setPlayed] = useState(0)
  const [seeking, setSeeking] = useState(false)
  const [ready, setReady] = useState(false)
  const playerRef = useRef(null)
  const containerRef = useRef(null)

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
    playerRef.current.seekTo(Number.parseFloat(e.target.value))
  }

  const handleReady = () => {
    setReady(true)
  }

  const handlePlay = () => {
    setPlaying(true)
  }

  const handlePause = () => {
    setPlaying(false)
  }

  const handleEnded = () => {
    setPlaying(false)
    setPlayed(0)
  }

  const handleClickVideo = () => {
    if (!ready) return
    setPlaying(!playing)
  }

  return (
    <div className="relative bg-black rounded-lg overflow-hidden shadow-lg" ref={containerRef}>
      {/* Video Wrapper with proper aspect ratio */}
      <div className="relative pt-[56.25%]">
        {/* ReactPlayer positioned absolutely to fill the container */}
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onReady={handleReady}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          progressInterval={1000}
          light={!playing && thumbnail}
          className="absolute top-0 left-0"
          style={{ position: "absolute", top: 0, left: 0 }}
          onClick={handleClickVideo}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
              },
            },
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
        />
      </div>

      {/* Custom Controls - only show when video is ready and not using light mode */}
      {ready && playing && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity opacity-0 hover:opacity-100">
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
      )}

      {/* Play button overlay for when video is paused and ready */}
      {ready && !playing && (
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={handlePlayPause}>
          <div className="bg-indigo-600/80 rounded-full p-4 hover:bg-indigo-700/80 transition-colors">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {!ready && !thumbnail && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
