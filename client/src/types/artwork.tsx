export interface Artwork {
    _id: string,
    title: string,
    description: string,
    imageUrl: string,
    category: string,
    brand: string,
    tags: string[],
    isFeatured: boolean
}