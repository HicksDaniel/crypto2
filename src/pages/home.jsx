import React from 'react'
import { useCoinStore } from "../stores/useCoinStore";

export default function Home() {
    const { fetchTrendingData, trendingData } = useCoinStore();

    function handleClick() {
        console.log("test")
    }
    return (
        <>
            <div>This is Your Home Now!</div>
            <button onClick={handleClick}>Click for trending</button>
            <textarea>T</textarea>
        </>
    )
}
