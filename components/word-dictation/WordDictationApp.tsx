'use client'

import { useState, useEffect } from 'react'
import Header from './Header'
import DictationArea from './DictationArea'
import { WordList, Settings } from '@/types/wordDictation'
import { useToast } from "@/hooks/use-toast"

export function WordDictationApp() {
  const [settings, setSettings] = useState<Settings>({
    pronunciation: "American",
    playCount: 3,
    interval: 1,
    wordList: "",
    isRandomOrder: false
  })
  const [wordLists, setWordLists] = useState<WordList[]>([])
  const [selectedWordList, setSelectedWordList] = useState<WordList | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const savedWordLists = localStorage.getItem('wordLists')
    if (savedWordLists) {
      const parsedWordLists = JSON.parse(savedWordLists)
      setWordLists(parsedWordLists)
      if (parsedWordLists.length > 0) {
        setSelectedWordList(parsedWordLists[0])
        setSettings(prev => ({ ...prev, wordList: parsedWordLists[0].id }))
      }
    }
  }, [])

  useEffect(() => {
    const selected = wordLists.find(list => list.id === settings.wordList)
    setSelectedWordList(selected || null)
  }, [settings.wordList, wordLists])

  const handleImport = (newWordList: WordList) => {
    const updatedWordLists = [...wordLists, newWordList]
    setWordLists(updatedWordLists)
    localStorage.setItem('wordLists', JSON.stringify(updatedWordLists))
    if (updatedWordLists.length === 1) {
      setSelectedWordList(newWordList)
      setSettings(prev => ({ ...prev, wordList: newWordList.id }))
    }
    toast({
      title: "Import Success",
      description: `Successfully imported ${newWordList.words.length} words into the "${newWordList.name}" word list`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        settings={settings}
        setSettings={setSettings}
        wordLists={wordLists}
        selectedWordList={settings.wordList}
        setSelectedWordList={(id) => setSettings(prev => ({ ...prev, wordList: id }))}
        onImport={handleImport}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {selectedWordList ? (
          <DictationArea settings={settings} selectedWordList={selectedWordList} />
        ) : (
          <div className="text-center text-gray-500">
            Please import a word list to get started, by clicking the import button in the header.
          </div>
        )}
      </main>
      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-DC39KDHPG4"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DC39KDHPG4');
        `}
      </script>
    </div>
  )
}