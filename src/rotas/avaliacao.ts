import { cone } from "../database";
import { z } from 'zod';
import { FastifyInstance } from "fastify";

export async function transactionsRouteAvaliacao(app : FastifyInstance){

    app.post('/avaliacao/criar' , async (request ,reply) =>{
        
        const criarTransacao = z.object({
          nome: z.string(),
          comentario: z.string(),
          nota: z.number(),
          filmes_id :z.number(),
          series_id :z.number(),
          usuarios_id :z.number(),
        
        })
      
        const body = criarTransacao.parse(request.body);
      
        const transacao =  await cone('avaliacao').insert({
          nome : body.nome,
          comentário: body.comentario,
          nota: body.nota,
          filmes_id:body.filmes_id,
          series_id:body.series_id,
          usuarios_id:body.usuarios_id,


        })
            return reply.status(201).send();
         
      })
    
        app.get('/avaliacao' , async (request ,reply) =>{
    
            const avaliacao = await cone('avaliacao').select();
    
            return {avaliacao};
        })
    
      app.get('/avaliacao/:id' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            id : z.any(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const avaliacao = await cone('avaliacao').where('id',params.id).first();
    
        return {avaliacao};
      })
    
      app.delete('/avaliacao/deletar/:id' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            id : z.any(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const avaliacao = await cone('avaliacao').where('id',params.id).del();
    
        return reply.status(404).send();
      })

      app.get('/avaliacao/nome/:nome' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            nome : z.string(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const avaliacao = await cone('avaliacao').where('nome',params.nome).first();
    
        return {avaliacao};
      })

      app.put('/avaliacao/atualizar/:id' , async (request ,reply) =>{
        const criarTransacao = z.object({
          nome: z.string(),
          comentario: z.string(),
          nota: z.number(),
          filmes_id :z.number(),
          series_id :z.number(),
          usuarios_id :z.number(),
        })

        const getParamsScheema = z.object({
         id : z.any(),
      })
        const body = criarTransacao.parse(request.body);
        const params = getParamsScheema.parse(request.params);

        const transacao =  await cone('avaliacao').where('id',params.id).update({
          nome : body.nome,
          comentário: body.comentario,
          nota: body.nota,
          filmes_id:body.filmes_id,
          series_id:body.series_id,
          usuarios_id:body.usuarios_id,

        })
            return reply.status(200).send(); 
      })
    }
    

    