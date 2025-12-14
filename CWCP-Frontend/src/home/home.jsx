import React from 'react'
import './home.css'
const home = () => {
    return (
        <div className="home-view">
            <div className="home-section city-description">
                <h2>The City of Tagum</h2>
                <p>
                    The City of Tagum, officially known as the City of Tagum, is a 1st class component city and capital of the Davao del Norte province, Philippines. According to the 2020 census, it has a population of 296,202 people, making it the most populous component city in Mindanao.
                </p>
                <p>
                    Tagum is known as the "Palm City of the South" due to its vast palm oil plantations. The city has been recognized for its outstanding performance in various fields including education, health, environment, and disaster preparedness. It has received numerous awards including the Seal of Good Local Governance and recognition as one of the most competitive cities in the Philippines.
                </p>
                <p>
                    The city is home to diverse communities across its 23 barangays, each contributing to the rich cultural tapestry and vibrant economy of Tagum. With its strategic location and progressive governance, Tagum continues to be a model city for sustainable development and community welfare.
                </p>
            </div>

            <div className="home-section system-description">
                <h2>The City Wide Concern Portal</h2>
                <p>
                    The City Wide Concern Portal is an innovative digital platform designed to strengthen the connection between the government and the citizens of Tagum City. This system empowers residents to actively participate in maintaining the safety, cleanliness, and orderliness of their communities.
                </p>
                <p>
                    Through this portal, citizens can report various concerns including infrastructure issues, environmental hazards, public safety matters, and other community-related problems. Each concern is categorized by area, severity level, and status, ensuring efficient tracking and resolution by the appropriate city departments.
                </p>
                <p>
                    The system features a transparent workflow where submitted concerns are reviewed by moderators, tracked through different stages of resolution, and made visible to the public. This promotes accountability, encourages civic engagement, and helps build a safer, more responsive community for all Tagumenyos.
                </p>
                <p>
                    By using this platform, you become an active partner in creating positive change in your barangay and throughout the entire city. Together, we are keeping communities safe and connected!
                </p>
            </div>
        </div>
    )
}

export default home