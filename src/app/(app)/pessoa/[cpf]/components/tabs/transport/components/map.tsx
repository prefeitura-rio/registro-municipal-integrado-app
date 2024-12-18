'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import { Spinner } from '@/components/ui/spinner'
import { getEnv } from '@/env/server'
import { usePublicTransportHistory } from '@/hooks/use-query/use-public-transport-history'
import type { PublicTransportEvent } from '@/types/entities'

// const MAPBOX_ACCESS_TOKEN =
// 'pk.eyJ1IjoiZXNjcml0b3Jpb2RlZGFkb3MiLCJhIjoiY2t3bWdmcHpjMmJ2cTJucWJ4MGQ1Mm1kbiJ9.4hHJX-1pSevYoBbja7Pq4w'

export function DynamicMapboxStaticMap({ cpf }: { cpf: string }) {
  const [mapboxAccessToken, setMapboxAccessTken] = useState<string | undefined>(
    undefined,
  )
  // const accessToken = MAPBOX_ACCESS_TOKEN
  const mapStyle = 'mapbox/streets-v12'
  const mapWidth = 1000
  const mapHeight = 330
  const morningColor = 'facc15'
  const afternoonColor = 'ef4444'
  const nightColor = '0284c7'

  const { data, isPending } = usePublicTransportHistory(cpf)

  useEffect(() => {
    getEnv().then((env) => {
      setMapboxAccessTken(env.MAPBOX_ACCESS_TOKEN)
    })
  }, [])
  function createMarkerPart(point: PublicTransportEvent) {
    if (point.longitude === 0 && point.latitude === 0) return ''
    console.log({ point })
    const name = 'pin-s'
    const color =
      new Date(point.datetime_transacao).getHours() < 12
        ? morningColor
        : new Date(point.datetime_transacao).getHours() < 18
          ? afternoonColor
          : nightColor
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
    console.log({ point })
    const lon = point.longitude.toString()
    const lat = point.latitude.toString()
    const zoom = '13'
    const bearing = '0'
    const pitch = '0'

    return `${lon},${lat},${zoom},${bearing},${pitch}`
  }

  const mapboxImageUrl = useMemo(() => {
    if (!data || data.length === 0) return undefined
    console.log({ data })

    const markers = getMarkers(data)

    const viewport = data.length > 1 ? 'auto' : createViewport(data[0])

    return `https://api.mapbox.com/styles/v1/${mapStyle}/static/${markers}/${viewport}/${mapWidth}x${mapHeight}?${data.length > 1 ? 'padding=50&' : ''}access_token=${mapboxAccessToken}`
  }, [data])

  console.log({ mapboxImageUrl })

  return (
    <div className="flex w-full justify-center">
      {mapboxImageUrl ? (
        <div className="relative">
          <Image
            src={mapboxImageUrl}
            alt="Map showing various public transport locations"
            className="shadow-md"
            width={mapWidth}
            height={mapHeight}
            priority
          />
          <div className="absolute bottom-0 left-0 m-4 rounded bg-white bg-opacity-75 p-2 shadow-md">
            <div className="mb-1 flex items-center">
              <span className="mr-2 inline-block h-3 w-3 bg-yellow-400"></span>
              <span className="text-sm text-gray-800">Manhã</span>
            </div>
            <div className="mb-1 flex items-center">
              <span className="mr-2 inline-block h-3 w-3 bg-red-500"></span>
              <span className="text-sm text-gray-800">Tarde</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 inline-block h-3 w-3 bg-sky-600"></span>
              <span className="text-sm text-gray-800">Noite</span>
            </div>
          </div>
        </div>
      ) : isPending ? (
        <div
          className="flex items-center justify-center bg-secondary"
          style={{ width: mapWidth, height: mapHeight }}
        >
          <Spinner />
        </div>
      ) : null}
    </div>
  )
}
