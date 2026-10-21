export interface Artwork {
    _id: string,
    title: string,
    description: string,
    imageUrl: string,
    category: string,
    tags: string[],
    isFeatured: boolean
}