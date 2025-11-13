import React from 'react'
import Modbuttons from '../MODERATOR/modbuttons'
import './credits.css'
const credits = () => {
    return (
        <>
            <footer className="main-footer">
                <h1>Members:</h1>

                <div className="member-grid">
                    <div className="member-card">
                        <img src="https://placehold.co/200x200?text=Charles+Kent" alt="Charles Kent Labrador" />
                        <p>Charles Kent Labrador</p>
                    </div>

                    <div className="member-card">
                        <img src="https://placehold.co/200x200?text=Charles+Ian" alt="Charles Ian Danag" />
                        <p>Charles Ian Danag</p>
                    </div>

                    <div className="member-card">
                        <img src="https://placehold.co/200x200?text=Lord+Anthony" alt="Lord Anthony Juguilon" />
                        <p>Lord Anthony Juguilon</p>
                    </div>

                    <div className="member-card">
                        <img src="https://placehold.co/200x200?text=Princess+Karel" alt="Princess Karel" />
                        <p>Princess Karel</p>
                    </div>
                </div>
            </footer>
            <Modbuttons/>
            
        </>
    )
}

export default credits