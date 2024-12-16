
import mongoose from "mongoose";


interface IRecipe extends Document {
    title: string
    ingredients: string[]
    instructions: string
    prepTime: number
    difficulty: 'Fácil' | 'Médio' | 'Difícil'
}

const RecipeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    ingredients: {type: [String], required: true},
    instructions: {type: String, required: true},
    prepTime: {type: Number, required: true},
    difficulty: {
        type: String,
        enum: ['Fácil', 'Médio', 'Difícil'],
        required: true

    }
});

export default mongoose.model<IRecipe>('Recipe', RecipeSchema)