import React, { useRef } from 'react'

const ArticleBlock = ({ block }) => {
  switch (block.type) {
    case 'textSplit':
      return (
        <div className="M_articleTextSplit">
          <h3 className="A_articleSplitLeft">{block.left}</h3>
          <div className="W_articleTextContent">
            {block.right.split('\n\n').map((paragraph, index) => {
              const venueMatch = paragraph.match(/^(\d+\.\s.+?)\s(.+)$/)
              if (venueMatch) {
                return (
                  <p key={index}>
                    <span className="A_venueHighlight">{venueMatch[1]}</span>
                    {' '}{venueMatch[2]}
                  </p>
                )
              }
              return <p key={index}>{paragraph}</p>
            })}
          </div>
        </div>
      )

    case 'list':
      return (
        <div className="M_articleListBlock">
          <h2>{block.title}</h2>
          <ul className="C_articleList">
            {block.items.map((item, index) => (
              <li key={index} className="A_articleListItem">
                <div className="Q_listBullet"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )

    default:
      return null
  }
}

const ArticleView = ({ articleData }) => {
  const heroBlock = articleData.blocks[0]
  const contentBlocks = articleData.blocks.slice(1)
  const listRef = useRef(null)

  const scrollToList = () => {
    listRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="O_articleView">
      <div className="W_articleLeft">
        <h1>{heroBlock.title}</h1>
        <h3>{heroBlock.description}</h3>
        <button className="A_articleScrollBtn" onClick={scrollToList}>
          Сразу к полезностям →
        </button>
      </div>

      <div className="W_articleRight">
        <div className="W_articleHeroImage">
          <img src={heroBlock.image} alt="" />
        </div>

        <div className="W_articleContentFlow">
          {contentBlocks.map((block, index) =>
            block.type === 'list' ? (
              <div key={index} ref={listRef}>
                <ArticleBlock block={block} />
              </div>
            ) : (
              <ArticleBlock key={index} block={block} />
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticleView
