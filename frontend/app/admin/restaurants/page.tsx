import NewRestaurantForm from '@/common/components/restaurants/NewRestaurantForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';

export default function Restaurants() {
	return (
		<>
			<div className='max-w-[1240px] mx-auto py-12 px-5'>
				<Card>
					<CardHeader>
						<CardTitle>Opprett ny restaurant</CardTitle>
					</CardHeader>
					<CardContent>
						<NewRestaurantForm />
					</CardContent>
				</Card>
			</div>
		</>
	);
}
