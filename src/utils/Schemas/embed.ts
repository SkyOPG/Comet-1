import mongo from 'mongoose';

const { model, Schema } = mongo;

type options = {
    OwnerID: string,
    Name: string,
    Embed: {
        Title: string,
        Description: string,
        Footer: {
            Text: string,
            IconURL: string
        },
        Color: string,
        Thumbnail: string,
        Author: {
            Name: string,
            IconURL: string,
            URL: string
        }
    }
}

const embedS = new Schema({
    OwnerID: String,
    Name: String,
    Embed: {
        Title: String,
        Description: String,
        Footer: {
            Text: String,
            IconURL: String
        },
        Color: String,
        Thumbnail: String,
        Author: {
            Name: String,
            IconURL: String,
            URL: String
        }
    }
})

const SchemaModel = model("embedBuilder", embedS)

export default {
    model: SchemaModel,
    create: (model: any, opts: options): void => {
        model.create(opts as options)
    },
    delete: async (model: any, user: any) => {
        await model.deleteOne({
            OwnerID: user.id
        });
    }
}