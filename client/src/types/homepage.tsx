import type { Artwork } from "./artwork";
import type { Social } from "./socials";

export interface Homepage {
    _id: string,
    heroTitle: string,
    heroSubtitle: string,
    heroImage: string,
    featuredArtwork: Artwork[],
    socials: Social[]
}