import React from 'react'

const ArticleCard = ({ article, onTestClick, isLarge }) => {
  return (
    <a
      href={`article/${article.id}.html`}
      className={`M_articleCard M_articleAllCards ${isLarge ? 'M_articleCardLarge' : 'M_articleCardSmall'}`}
    >
      <div className="W_articleImageWrapper">
        <img src={article.image} alt={article.title} />
      </div>

      <div className="W_articleContent">
        <div className="W_articleMainInfo">
          <h3 className="A_articleTitle">{article.title}</h3>
          {article.description && (
            <p className="A_articleDescription">{article.description}</p>
          )}
        </div>

        <div className="W_articleFooter">
          <p className="A_articleDate">Статья · {article.readTime}</p>

          {article.hasTest && (
            <button className="A_testButton" onClick={onTestClick}>
              Тест по статье
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="20"
                viewBox="0 0 15 12"
                fill="none"
              >
                <path
                  d="M0.75 4.77295C0.335786 4.77295 0 5.10874 0 5.52295C0 5.93716 0.335786 6.27295 0.75 6.27295L0.75 5.52295L0.75 4.77295ZM14.2803 6.05328C14.5732 5.76039 14.5732 5.28551 14.2803 4.99262L9.50736 0.219648C9.21447 -0.073245 8.73959 -0.073245 8.4467 0.219648C8.15381 0.512542 8.15381 0.987415 8.4467 1.28031L12.6893 5.52295L8.4467 9.76559C8.15381 10.0585 8.15381 10.5334 8.4467 10.8263C8.73959 11.1191 9.21447 11.1191 9.50736 10.8263L14.2803 6.05328ZM0.75 5.52295L0.75 6.27295L13.75 6.27295V5.52295V4.77295L0.75 4.77295L0.75 5.52295Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </a>
  )
}

export default ArticleCard
