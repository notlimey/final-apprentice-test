import HeroSection from '@/common/sections/home/HeroSection';
import RestaurantResultsSection from '@/common/sections/home/RestaurantResultsSection';
import SearchSection from '@/common/sections/home/SearchSection';
import type { Restaurant } from '@/common/types/restaurants.types';

const HomeView = ({ initial }: { initial: Restaurant[] }) => {
	return (
		<div className='max-w-[1240px] px-5 mx-auto flex flex-col gap-y-[12px]'>
			<HeroSection
				img={{
					src: '/images/hero-img.jpeg',
					alt: 'Hero image',
				}}
				title='Matopplevelser i Innlandet'
				subtitle='Finn ditt neste måltid, både nært og fjernt'
				useNextImage
			/>
			<SearchSection />
			<RestaurantResultsSection initial={initial} />
		</div>
	);
};

export default HomeView;
