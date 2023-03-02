import { cone } from "../database";
import {z} from 'zod';
import { FastifyInstance } from "fastify";

export async function transactionsRouteGeneros(app : FastifyInstance){

    app.post('/generos/criar' , async (request ,reply) =>{
        
        const criarTransacao = z.object({
        nome: z.string(),
        
       
        })
      
        const body = criarTransacao.parse(request.body);
      
        const transacao =  await cone('generos').insert({
         nome: body.nome,
         

        })
            return reply.status(201).send();
         
      })
    
        app.get('/generos' , async (request ,reply) =>{
    
            const generos = await cone('generos').select();
    
            return generos;
        })
    
      app.get('/generos/:id' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            id : z.any(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const generos = await cone('generos').where('id',params.id).first();
    
        return generos;
      })
    
      app.delete('/generos/deletar/:id' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            id : z.any(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const generos = await cone('generos').where('id',params.id).del();
    
        return reply.status(404).send();
      })

      app.get('/generos/nome/:nome' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            nome : z.string(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const generos = await cone('generos').where('nome',params.nome).first();
    
        return generos;
      })


      app.put('/generos/atualizar/:id' , async (request ,reply) =>{
        
        const criarTransacao = z.object({
        nome: z.string(),      
        })

        const getParamsScheema = z.object({
         id : z.any(),
      })

        const body = criarTransacao.parse(request.body);
        const params = getParamsScheema.parse(request.params);

        const transacao =  await cone('generos').where('id',params.id).update({
         nome: body.nome,
        })
            return reply.status(200).send();
         
      })
    }

