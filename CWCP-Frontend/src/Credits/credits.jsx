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
                        <img src="https://placehold.co/200x200?text=" alt="" />
                        <p></p>
                    </div>

                    <div className="member-card">
                        <img src="https://placehold.co/200x200?text=" alt="" />
                        <p></p>
                    </div>

                    <div className="member-card">
                        <img src="https://placehold.co/200x200?text=" alt="" />
                        <p></p>
                    </div>

                    <div className="member-card">
                        <img src="https://placehold.co/200x200?text=" alt="" />
                        <p></p>
                    </div>
                </div>
            </footer>
            <Modbuttons/>
            
        </>
    )
}

export default credits