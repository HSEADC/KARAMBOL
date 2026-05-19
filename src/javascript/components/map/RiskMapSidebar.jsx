import React, { useState, useEffect, useRef } from 'react'
import RecommendedCard from './RecommendedCard'
import riskPoints from '../../data/riskPoints.json'

const TAGS = [
  { label: 'Все', value: '' },
  { label: 'Мероприятия', value: 'events' },
  { label: 'Лето 2026', value: 'summer2026' },
  { label: 'Кинологические центры', value: 'cynology' },
  { label: 'Лето', value: 'summer' },
  { label: 'Ветеринарные клиники', value: 'vet' },
  { label: 'Зоомагазины', value: 'petshop' },
  { label: 'Кафе, рестораны', value: 'cafe' },
  { label: 'Груминг', value: 'grooming' }
]

const CARDS = [
  {
    id: 1,
    image: '../../../images/map/photo1.png',
    title: 'Друг – Спасатель – Защитник',
    location: 'По всей Москве',
    date: '24 мая – 14 сентября',
    isLarge: true
  },
  {
    id: 2,
    image: '../../../images/map/photo2.png',
    title: 'Паддел с таксами',
    location: 'м. Павелецкая',
    date: '14 мая 18:00',
    isLarge: false
  },
  {
    id: 3,
    image: '../../../images/map/photo3.png',
    title: 'Паддел с таксами',
    location: 'м. Павелецкая',
    date: '14 мая 18:00',
    isLarge: false
  },
  {
    id: 4,
    image: '../../../images/map/photo3.png',
    title: 'Паддел с таксами',
    location: 'м. Павелецкая',
    date: '14 мая 18:00',
    isLarge: false
  },
  {
    id: 5,
    image: '../../../images/map/photo3.png',
    title: 'Паддел с таксами',
    location: 'м. Павелецкая',
    date: '14 мая 18:00',
    isLarge: false
  },
  {
    id: 6,
    image: '../../../images/map/photo3.png',
    title: 'Паддел с таксами',
    location: 'м. Павелецкая',
    date: '14 мая 18:00',
    isLarge: false
  },
  {
    id: 7,
    image: '../../../images/map/photo3.png',
    title: 'Паддел с таксами',
    location: 'м. Павелецкая',
    date: '14 мая 18:00',
    isLarge: false
  }
]

const RiskMapSidebar = () => {
  const [activeTag, setActiveTag] = useState('')
  const mapRef = useRef(null)
  const placemarks = useRef([])

  useEffect(() => {
    const initMap = () => {
      if (window.ymaps && !mapRef.current) {
        window.ymaps.ready(() => {
          const map = new window.ymaps.Map('yandex-map', {
            center: [55.751574, 37.573856],
            zoom: 10,
            controls: []
          })
          mapRef.current = map
          riskPoints.forEach((point) => {
            const placemark = new window.ymaps.Placemark(
              point.coordinates,
              { balloonContent: point.name },
              { preset: 'islands#orangeDotIcon' }
            )
            placemark.properties.set('types', point.types)
            map.geoObjects.add(placemark)
            placemarks.current.push(placemark)
          })
        })
      }
    }

    if (window.ymaps) {
      initMap()
    } else {
      const check = setInterval(() => {
        if (window.ymaps) {
          clearInterval(check)
          initMap()
        }
      }, 100)
      return () => clearInterval(check)
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || placemarks.current.length === 0) return
    placemarks.current.forEach((p) => {
      const types = p.properties.get('types')
      const visible = !activeTag || types.includes(activeTag)
      p.options.set('visible', visible)
    })
  }, [activeTag])

  return (
    <div className="O_riskMapPage">
      <div className="О_recomendedMapScreen">
        <div className="С_tagsList">
          {TAGS.map((tag) => (
            <button
              key={tag.value}
              className={`A_tag ${activeTag === tag.value ? 'A_tag--active' : ''}`}
              onClick={() => setActiveTag(tag.value)}
            >
              {tag.label}
            </button>
          ))}
        </div>

        <div className="W_eventList">
          <h2>Рекомендуем</h2>
          <div className="C_eventList">
            {CARDS.map((card) => (
              <RecommendedCard
                key={card.id}
                image={card.image}
                title={card.title}
                location={card.location}
                date={card.date}
                isLarge={card.isLarge}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="W_mapContainer">
        <div className="W_mapWrapper" id="yandex-map"></div>
      </div>
    </div>
  )
}

export default RiskMapSidebar
