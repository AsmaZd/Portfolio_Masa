import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Artwork } from "./artwork.schema";

@Injectable()
export class ArtworksService {

    // //TEMP: mocked data to test the connection between the back and the front
    // private artworks = [
    //     {
    //         id: 1,
    //         title: "chibi drawing",
    //         description: "description",
    //         imageURL: 'images/dessin.png',
    //         category: "dessin",
    //         tags: ["digital"],
    //         isFeatured: true,
    //     },
    //     {
    //         id: 2,
    //         title: "slickpirits",
    //         description: "description",
    //         imageURL: 'images/slickspirits.png',
    //         category: "design",
    //         tags: ["logo", "vectoriel"],
    //         isFeatured: false,
    //     },        
    // ];

    constructor(
        @InjectModel(Artwork.name) private artworkModel: Model<Artwork>,
    ){}

    async findAll(): Promise<Artwork[]> {
        return this.artworkModel.find().exec();
    }

    async findOne(id: string): Promise<Artwork | null> {
        return this.artworkModel.findById(id).exec();
    }
}