import { Injectable } from "@nestjs/common";

@Injectable()
export class ArtworksService {

    //TEMP: mocked data to test the connection between the back and the front
    private artworks = [
        {
            id: 1,
            title: "chibi drawing",
            description: "description",
            imageURL: 'images/dessin.png',
            category: "dessin",
            tags: ["digital"],
            isFeatured: true,
        },
        {
            id: 2,
            title: "slickpirits",
            description: "description",
            imageURL: 'images/slickspirits.png',
            category: "design",
            tags: ["logo", "vectoriel"],
            isFeatured: false,
        },        
    ];

    findAll() {
        return this.artworks;
    }

    findOne(m_id: number){
        return this.artworks.find(artwork => artwork.id === m_id);
    }
}