'use client'

import Image from 'next/image'
import { useMemo } from 'react'

import { Spinner } from '@/components/ui/spinner'
import { usePublicTransportHistory } from '@/hooks/use-query/use-public-transport-history'
import type { PublicTransportEvent } from '@/types/entities'

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiZXNjcml0b3Jpb2RlZGFkb3MiLCJhIjoiY2t3bWdmcHpjMmJ2cTJucWJ4MGQ1Mm1kbiJ9.4hHJX-1pSevYoBbja7Pq4w'

export function DynamicMapboxStaticMap({ cpf }: { cpf: string }) {
  const accessToken = MAPBOX_ACCESS_TOKEN
  const mapStyle = 'mapbox/streets-v12'
  const mapWidth = 480
  const mapHeight = 330

  const { data } = usePublicTransportHistory(cpf)

  function createMarkerPart(point: PublicTransportEvent) {
    if (point.longitude === 0 && point.latitude === 0) return ''

    const name = 'pin-s'
    const color = '000000'
    const lon = point.longitude.toString()
    const lat = point.latitude.toString()

    return `${name}+${color}(${lon},${lat})`
  }

  function getMarkers(points: PublicTransportEvent[]) {
    return points.reduce((acc, cur) => {
      const markerPart = createMarkerPart(cur)
      if (markerPart) {
        return acc ? `${acc},${createMarkerPart(cur)}` : createMarkerPart(cur)
      } else {
        return acc
      }
    }, '')
  }

  function createViewport(point: PublicTransportEvent) {
    const lon = point.longitude.toString()
    const lat = point.latitude.toString()
    const zoom = '13'
    const bearing = '0'
    const pitch = '0'

    return `${lon},${lat},${zoom},${bearing},${pitch}`
  }

  const mapboxImageUrl = useMemo(() => {
    if (!data) return undefined

    const markers = getMarkers(data)

    const viewport = data.length > 1 ? 'auto' : createViewport(data[0])

    return `https://api.mapbox.com/styles/v1/${mapStyle}/static/${markers}/${viewport}/${mapWidth}x${mapHeight}?${data.length > 1 ? 'padding=50&' : ''}access_token=${accessToken}`
  }, [data])

  console.log({ mapboxImageUrl })

  return (
    <div className="flex w-full justify-center">
      {mapboxImageUrl ? (
        <Image
          src={mapboxImageUrl}
          alt="Map showing various public transport locations"
          className="rounded-lg shadow-md"
          width={mapWidth}
          height={mapHeight}
          priority
        />
      ) : (
        <div
          className="flex items-center justify-center bg-secondary"
          style={{ width: mapWidth, height: mapHeight }}
        >
          <Spinner />
        </div>
      )}
    </div>
  )
}
