'use client'
import { Sun } from 'lucide-react'
import { Moon } from 'lucide-react'
import { Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function ToolsBar() {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            setTheme(savedTheme)
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark')
            }
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark')
            document.documentElement.classList.add('dark')
        }
    }, [])

    const toggleTheme = () => {
        if (theme === 'light') {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
            setTheme('dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
            setTheme('light')
        }
    }
    return (
        <div className="flex items-center space-x-4">
            {/* <Link
                href={'https://github.com/cdt3211/album-next'}
                target="blank"
                className="rounded-full p-2 transition-colors hover:text-sky-700"
            >
                <Github />
            </Link> */}
            <button
                className="rounded-full p-2 transition-colors hover:text-sky-700"
                onClick={toggleTheme}
                aria-label={theme === 'light' ? '切换至深色模式' : '切换至浅色模式'}
            >
                {theme === 'light' ? <Moon /> : <Sun />}
            </button>
        </div>
    )
}
