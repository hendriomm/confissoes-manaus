"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface ConfessionSchedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

interface Church {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  phone: string;
  latitude: number;
  longitude: number;
  priestName: string | null;
  notes: string | null;
  confessionSchedules: ConfessionSchedule[];
}

interface NearbyChurch extends Church {
  distance: number;
}

interface ChurchListProps {
  churches: Church[];
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1)} km`;
}

const dayOrder = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

function getNextConfession(schedule: { day: string; startTime: string }[]) {
  const now = new Date();
  const currentDayIndex = now.getDay();
  const dayMap: Record<string, number> = {};
  dayOrder.forEach((d, i) => {
    dayMap[d] = i;
  });

  const sorted = [...schedule].sort(
    (a, b) => dayMap[a.day] - dayMap[b.day]
  );

  for (const entry of sorted) {
    const entryDayIndex = dayMap[entry.day];
    if (entryDayIndex > currentDayIndex) {
      return `${entry.day}, ${entry.startTime}`;
    }
    if (entryDayIndex === currentDayIndex) {
      const [h, m] = entry.startTime.split(":").map(Number);
      const confTime = new Date(now);
      confTime.setHours(h, m, 0, 0);
      if (now < confTime) {
        return `Hoje, ${entry.startTime}`;
      }
    }
  }

  if (sorted.length > 0) {
    const next = sorted[0];
    return `A partir de ${next.day}, ${next.startTime}`;
  }

  return null;
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-blue-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export default function ChurchList({ churches }: ChurchListProps) {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [nearbyResults, setNearbyResults] = useState<NearbyChurch[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geoSupported, setGeoSupported] = useState(true);
  const [showNearby, setShowNearby] = useState(false);

  useEffect(() => {
    setGeoSupported("geolocation" in navigator);
  }, []);

  const fetchNearby = useCallback(async (lat: number, lng: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/churches/nearby?lat=${lat}&lng=${lng}&radius=10`
      );
      if (!res.ok) throw new Error("Erro ao buscar igrejas próximas");
      const data = await res.json();
      setNearbyResults(data.churches);
    } catch {
      setError("Não foi buscar igrejas próximas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleNearbyClick = () => {
    if (nearbyResults) {
      setNearbyResults(null);
      setShowNearby(false);
      return;
    }

    setShowNearby(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Seu navegador não suporta geolocalização.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        fetchNearby(latitude, longitude);
      },
      () => {
        setError(
          "Permita o acesso à localização para encontrar igrejas perto de você."
        );
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <>
      {/* Nearby Button Section */}
      {geoSupported && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <button
            onClick={handleNearbyClick}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-60"
          >
            {loading ? (
              <>
                <Spinner /> Buscando igrejas próximas...
              </>
            ) : nearbyResults ? (
              <>✕ Fechar igrejas próximas</>
            ) : (
              <>📍 Igrejas perto de mim</>
            )}
          </button>

          {error && (
            <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 text-center">
              {error}
            </p>
          )}

          {showNearby && nearbyResults && (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-500 text-center">
                {nearbyResults.length === 0
                  ? "Nenhuma igreja encontrada nas proximidades."
                  : `${nearbyResults.length} igreja${nearbyResults.length > 1 ? "s" : ""} encontrada${nearbyResults.length > 1 ? "s" : ""}:`}
              </p>
              {nearbyResults.map((church) => {
                const nextConfession = getNextConfession(
                  church.confessionSchedules
                );
                return (
                  <Link
                    key={church.id}
                    href={`/church/${church.id}`}
                    className="block bg-gray-50 rounded-lg border border-gray-100 p-4 hover:shadow-md hover:border-blue-200 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 truncate">
                          {church.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {church.neighborhood}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {church.address}
                        </p>
                        {nextConfession && (
                          <p className="mt-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-md px-2 py-1 inline-block w-fit">
                            Próxima confissão: {nextConfession}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full px-2.5 py-1">
                        {formatDistance(church.distance)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* All churches list with optional distance badges */}
      {churches.map((church) => {
        const nextConfession = getNextConfession(church.confessionSchedules);
        const distance = userLocation
          ? getDistance(
              userLocation.lat,
              userLocation.lng,
              church.latitude,
              church.longitude
            )
          : null;

        return (
          <Link
            key={church.id}
            href={`/church/${church.id}`}
            className="block bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  {church.name}
                </h2>
                {distance !== null && (
                  <span className="shrink-0 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full px-2.5 py-1">
                    {formatDistance(distance)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{church.neighborhood}</p>
              <p className="text-sm text-gray-600">{church.address}</p>
              <p className="text-sm text-gray-500">{church.phone}</p>
              {nextConfession && (
                <p className="mt-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg px-3 py-1.5 inline-block w-fit">
                  Próxima confissão: {nextConfession}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </>
  );
}
