import { cone } from "../database";
import {z} from 'zod';
import { FastifyInstance } from "fastify";

export async function transactionsRouteAtores(app : FastifyInstance){

    app.post('/atores/criar' , async (request ,reply) =>{
        
        const criarTransacao = z.object({
          nome: z.string(),
          idade: z.number(),
          nacionalidade: z.string()
        })
      
        const body = criarTransacao.parse(request.body);
      
        const transacao =  await cone('atores').insert({
          nome : body.nome,
          idade: body.idade,
          nacionalidade: body.nacionalidade
        })
            return reply.status(201).send();
         
      })
    
        app.get('/atores' , async (request ,reply) =>{
    
            const atores = await cone('atores').select();
    
            return {atores};
        })
    
      app.get('/atores/:id' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            id : z.any(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const atores = await cone('atores').where('id',params.id).first();
    
        return {atores};
      })
    
      app.delete('/atores/deletar/:id' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            id : z.any(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const atores = await cone('atores').where('id',params.id).del();
    
        return reply.status(404).send();
      })

      app.get('/atores/nome/:nome' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            nome : z.string(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const atores = await cone('atores').where('nome',params.nome).first();
    
        return {atores};
      })

      app.put('/atores/atualizar/:id' , async (request ,reply) =>{
        
        const criarTransacao = z.object({
          nome: z.string(),
          idade: z.number(),
          nacionalidade: z.string()
        })

        const getParamsScheema = z.object({
         id : z.string(),
      })
        const body = criarTransacao.parse(request.body);
        const params = criarTransacao.parse(request.params);
        const transacao =  await cone('atores').where('id',getParamsScheema).update({
        nome : body.nome,
        idade: body.idade,
        nacionalidade: body.nacionalidade
         

        })
            return reply.status(200).send();
         
      })
    }