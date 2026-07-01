import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import useStore from '@store/index'

function MapWindow() {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mapCenter = useStore((state) => state.mapCenter)
  const mapZoom = useStore((state) => state.mapZoom)
  const updateMapZoom = useStore((state) => state.updateMapZoom)
  const updateMapCenter = useStore((state) => state.updateMapCenter)
  const cards = useStore((state) => state.cards)
  const layers = useStore((state) => state.layers)
  const selectCard = useStore((state) => state.selectCard)
  const selectedCardId = useStore((state) => state.selectedCardId)

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    mapRef.current = L.map(containerRef.current).setView(
      [mapCenter.lat, mapCenter.lng],
      mapZoom
    )

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapRef.current)

    // Handle map events
    const map = mapRef.current
    map.on('zoomend', () => {
      updateMapZoom(map.getZoom())
    })

    map.on('moveend', () => {
      const center = map.getCenter()
      updateMapCenter(center.lat, center.lng)
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // Update markers
  useEffect(() => {
    if (!mapRef.current) return

    const map = mapRef.current
    const markerLayer = new L.FeatureGroup()
    markerLayer.addTo(map)

    // Add markers for each card
    cards.forEach((card) => {
      const layer = layers.get(card.layerId)
      if (!layer || !layer.visible) return

      const marker = L.circleMarker(
        [card.latitude, card.longitude],
        {
          radius: 8,
          fillColor: card.iconColor,
          color: selectedCardId === card.id ? '#3B82F6' : card.iconColor,
          weight: selectedCardId === card.id ? 3 : 2,
          opacity: 1,
          fillOpacity: 0.8,
        }
      )

      marker.bindPopup(card.title)
      marker.on('click', () => selectCard(card.id))
      markerLayer.addLayer(marker)
    })

    return () => {
      markerLayer.remove()
    }
  }, [cards, layers, selectedCardId, selectCard])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 rounded-lg overflow-hidden"
      style={{ zIndex: 1 }}
    />
  )
}

export default MapWindow
