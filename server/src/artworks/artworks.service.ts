import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Artwork } from "./schemas/artwork.schema";
import { Observable } from "rxjs";
import { CreateArtworkDto } from "./dto/create-artwork.dto";
import { UpdateArtworkDto } from "./dto/update-artwork.dto";

@Injectable()
export class ArtworksService {

    constructor(
        @InjectModel(Artwork.name) private artworkModel: Model<Artwork>,
    ){}

    async findAll(): Promise<Artwork[]> {
        return this.artworkModel.find().exec();
    }

    async findOne(id: string): Promise<Artwork | null> {
        return this.artworkModel.findById(id).exec();
    }

    async create(artwork: CreateArtworkDto): Promise<Artwork>{
        const createdArtwork = new this.artworkModel(artwork);
        return createdArtwork.save();
    }

    async update(id: string, artwork: UpdateArtworkDto): Promise<Artwork | null>{
        const updatedArtwork = this.artworkModel.findByIdAndUpdate(id, artwork, {returnDocument: 'after'}).exec(); 
        return updatedArtwork;
    }
}