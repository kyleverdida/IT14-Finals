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
                        <img src="https://avatars.githubusercontent.com/u/210122774?v=4" alt="" />
                        <p>Kyle Christian Verdida</p>
                        <p>PROJECT MANAGER</p>
                    </div>



                    <div className="member-card">
                        <img src="https://avatars.githubusercontent.com/u/124577578?v=4" alt="" />
                        <p>Charles Kent Labrador</p>
                        <p>LEAD PROGRAMMER</p>
                    </div>

                    

                    <div className="member-card">
                        <img src="https://avatars.githubusercontent.com/u/232481857?v=4" alt="" />
                        <p>Railey Muyco</p>
                        <p>UI/UX DESIGNER</p>
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