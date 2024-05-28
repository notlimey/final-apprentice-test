'use client';

import type { Restaurant } from '@/common/types/restaurants.types';
import ReactMapGl, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Expand, MapPin } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export default function RestaurantMap(restaurant: Restaurant) {
	const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
	const [fullscreen, setFullscreen] = useState(false);

	return (
		<>
			<div className='relative w-full h-full'>
				<ReactMapGl
					mapboxAccessToken={mapboxToken}
					mapStyle='mapbox://styles/mapbox/streets-v12'
					initialViewState={{ latitude: restaurant.latitude, longitude: restaurant.longitude, zoom: 15 }}
					maxZoom={20}
					minZoom={3}
				>
					<Marker latitude={restaurant.latitude} longitude={restaurant.longitude}>
						<MapPin className='size-8 fill-red-500' />
					</Marker>
				</ReactMapGl>
				<button
					type='button'
					className='absolute top-4 right-4 p-3 bg-white rounded-full shadow-md'
					onClick={() => setFullscreen(true)}
				>
					<Expand className='size-6' />
				</button>
			</div>
			{fullscreen && (
				<div className={clsx('fixed inset-0 flex justify-center items-center z-10')}>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div className='absolute inset-0 bg-black bg-opacity-50' onClick={() => setFullscreen(false)} />
					<div className='w-full h-full z-10 max-w-[80vh] max-h-[80vh] mx-auto bg-white rounded-lg shadow-lg overflow-hidden'>
						<ReactMapGl
							mapboxAccessToken={mapboxToken}
							mapStyle='mapbox://styles/mapbox/streets-v12'
							initialViewState={{
								latitude: restaurant.latitude,
								longitude: restaurant.longitude,
								zoom: 15,
							}}
							maxZoom={20}
							minZoom={3}
						>
							<Marker latitude={restaurant.latitude} longitude={restaurant.longitude}>
								<MapPin className='size-12 fill-red-500' />
							</Marker>
						</ReactMapGl>
					</div>
				</div>
			)}
		</>
	);
}
