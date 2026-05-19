import React, { useState } from 'react'

const RecommendedCard = ({ image, title, location, date, isLarge }) => {
  const [liked, setLiked] = useState(false)

  return (
    <div className={`M_reccomendedCard ${isLarge ? 'M_reccomendedCard--large' : 'M_reccomendedCard--small'}`}>
      <div className="W_headOfRecommeded">
        <img src={image} alt={title} />
        <button
          className={`Q_Like ${liked ? 'Q_Like--active' : ''}`}
          onClick={() => setLiked(!liked)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={liked ? 'white' : 'none'} stroke="white" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="W_reccomendedInfo">
        <h3>{title}</h3>
        <p className="tag">{location} · {date}</p>
      </div>
    </div>
  )
}

export default RecommendedCard
