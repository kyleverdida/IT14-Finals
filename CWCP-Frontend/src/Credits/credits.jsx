import React from 'react'
import Modbuttons from '../MODERATOR/modbuttons'
import './credits.css'
const credits = () => {
    return (
        <>
            <footer className="main-footer">
                <h1>Website Development Team</h1>

                

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
                        <img src="https://avatars.githubusercontent.com/u/187724128?v=4" alt="" />
                        <p>Emmanuel Saludares</p>
                        <p>SYSTEM TESTER</p>
                    </div>

                    {/* <div className="member-card">
                        <img src="https://avatars.githubusercontent.com/u/230759622?v=4" alt="" />
                        <p>Christian Saycon</p>
                        <p>Analyst</p>
                    </div> */}

                    <div className="member-card">
                        <img src="https://avatars.githubusercontent.com/u/244971521?v=4" alt="" />
                        <p>Khrisopher Lloyd Rarama</p>
                        <p>LEAD DESIGNER</p>
                    </div>
                

                </div>
            </footer>
            <Modbuttons/>
            
        </>
    )
}

export default credits