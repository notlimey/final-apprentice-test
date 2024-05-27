import HeroSection from '@/common/sections/home/HeroSection';
import SearchSection from '@/common/sections/home/SearchSection';

const HomeView = () => {
	return (
		<div className='max-w-[1240px] px-5 mx-auto flex flex-col gap-y-[12px]'>
			<HeroSection />
			<SearchSection />
		</div>
	);
};

export default HomeView;
