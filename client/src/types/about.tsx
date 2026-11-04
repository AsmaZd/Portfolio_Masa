interface JourneyItems {
    _id: string,
    title: string,
    description: string, 
    date: string
}

export interface About {
    _id: string,
    photo: string,
    bio: string,
    journey: JourneyItems[]
    cvUrl: string
}