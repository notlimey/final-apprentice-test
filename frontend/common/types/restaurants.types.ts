

export type Restaurant = {
    id: string;
    name: string;
    slug: string;
    description: string;
    foodType: string;
    address: string;
    state: string;
    city: string;
    zipCode: string;
    phoneNumber: string;
    website: string;
    imageUrl: string;
    openingHours: OpeningHours;
    latitude: number;
    longitude: number;
    summary: string;
    averageFoodQualityRating: number;
    averageServiceQualityRating: number;
    averageAmbianceRating: number;
    averageValueForMoneyRating: number;
    averageOverallRating: number;
};


export type OpeningHours = {
    monday: HourSpan | null;
    tuesday: HourSpan | null;
    wednesday: HourSpan | null;
    thursday: HourSpan | null;
    friday: HourSpan | null;
    saturday: HourSpan | null;
    sunday: HourSpan | null;
};

export type Timespan = `${number}:${number}:${number}`;

export type HourSpan = {
    opensAt: Timespan;
    closesAt: Timespan;
}