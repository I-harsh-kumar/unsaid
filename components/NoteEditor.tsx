'use client'

import { useState } from 'react'

export function NoteEditor({
  onPost,
  onCancel,
}: {
  onPost: (text: string) => void
  onCancel: () => void
}) {
  const [text, setText] = useState('')

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-4 w-[320px] shadow-xl">
        <div className="font-semibold mb-2">Create a note</div>

        <textarea
          className="w-full h-24 border rounded p-2 text-sm"
          placeholder="Write something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />

        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={onCancel}
            className="px-3 py-1 text-sm bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            disabled={!text.trim()}
            onClick={() => onPost(text)}
            className="px-3 py-1 text-sm bg-black text-white rounded disabled:opacity-40"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
