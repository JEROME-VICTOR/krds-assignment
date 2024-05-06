import React from 'react'
import Features from '../Reusables/Features';
import '../scss/responsive.scss'

export default function Home() {
    return (
        <div className="home-container">
            <div className='small-screen'>
                <Features screen={'small'}/>
            </div>
            <div className='large-screen'>
                <Features screen={'large'}/>
            </div>
        </div>
    )
}

