"use client"

interface Track {
  id: number
  title: string
  duration: string
  lyrics: string
}

interface TrackRowProps {
  track: Track
  index: number
  isSelected: boolean
  onClick: () => void
}

export function TrackRow({ track, index, isSelected, onClick }: TrackRowProps) {
  return (
    <>
      <td className="py-3 text-[#B3B3B3] w-10">
        {isSelected ? (
          <div className="w-5 h-5 flex items-center justify-center">
            <div className="flex gap-[2px]">
              <div
                className="w-[2px] h-3 bg-[#1DB954] animate-[playingAnimation_1.2s_ease-in-out_infinite]"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-[2px] h-3 bg-[#1DB954] animate-[playingAnimation_1.2s_ease-in-out_infinite]"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-[2px] h-3 bg-[#1DB954] animate-[playingAnimation_1.2s_ease-in-out_infinite]"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        ) : (
          <span>{index}</span>
        )}
      </td>
      <td
        className={`py-3 ${isSelected ? "text-[#1DB954]" : "text-white"} hover:text-white cursor-pointer`}
        onClick={onClick}
      >
        <div className="flex items-center">
          <div className="mr-3 w-10 h-10 bg-[#282828] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
              <circle cx="16.5" cy="7.5" r=".5" />
            </svg>
          </div>
          <div>
            <div className="font-medium">{track.title}</div>
            <div className="text-sm text-[#B3B3B3]">Projet</div>
          </div>
        </div>
      </td>
      <td className="py-3 text-right text-[#B3B3B3]">{track.duration}</td>
    </>
  )
}
