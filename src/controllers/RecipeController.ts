import { Request, Response } from "express"
import Recipe from '../models/Recipe'

export const recipeController = {

    async create(req: Request, res:Response): Promise<any> {
        try{
            
            // validação de minimo de caracteres no title
            const { title } = req.body
            if(!title || title.length < 3) 
                return res.status(400).json({error: "'O título deve ter pelo menos 3 letras"})

            //validação dos ingredientes nao serem null ou array estar vazio
            const {ingredients} = req.body
            if(!ingredients || ingredients === null) {
                return res.status(400).json({ error: 'A lista de ingredientes é obrigatória'})
            } 
             
            if (Array.isArray(ingredients) && ingredients.length === 0) { 
                return res.status(400).json({ error: 'A lista de ingredientes não pode estar vazia' });
            }

                       
            const recipe = await Recipe.create(req.body)                   
            return res.status(201).json(recipe)

        } catch(error){         
            return res.status(400).json({error: 'Erro ao criar a receita'})

        }
    },

    async list(req:Request, res:Response): Promise<any> {
        try{          
            const recipes = await Recipe.find()
            return res.json(recipes)
        }catch(error){
            return res.status(400).json({error: 'Erro ao listar receitas'})
        }
    },

    async getById(req: Request, res: Response): Promise<any> {
        try{
            const recipe = await Recipe.findById(req.params.id)
            if(!recipe) {
             return res.status(404).json({error: 'Receita não encontrada'})
            }
             return  res.json(recipe)

        }catch(error){
            return res.status(400).json({ error: 'Erro ao buscar receita'})

        }
    },

    async deleteById(req: Request, res: Response): Promise<any> {
        try{
            const {id} = req.body
            const recipe = await Recipe.findByIdAndDelete(req.params.id)
            if(!recipe){
                return res.status(404).json({ error: "Receita não encontrada "})
            }
            return res.status(200).json({ message: "Receita deletada com sucesso!"})
        }catch(error){
            return res.status(500).json({error: "Erro ao deletar a receita"})

        }
    }
}
