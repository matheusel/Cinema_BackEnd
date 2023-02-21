import { cone } from "../database";
import {z} from 'zod';
import { FastifyInstance } from "fastify";

export async function transactionsRoute(app : FastifyInstance){

    app.post('/series/criar' , async (request ,reply) =>{
        
        const criarTransacao = z.object({
          nome: z.string(),
          sinopse: z.string(),
          direcao: z.string(),
          lancamento: z.any(),
          classificacao: z.string(),
          temporadas: z.number(),
          trailer: z.string(),
          imagem: z.string(),
        })
      
        const body = criarTransacao.parse(request.body);
      
        const transacao =  await cone('series').insert({
          nome : body.nome,
          sinopse: body.sinopse,
          direcao: body.direcao,
          lancamento: body.lancamento,
          classificacao: body.classificacao,
          temporadas: body.temporadas,
          trailer: body.trailer,
          imagem: body.imagem,


        })
            return reply.status(201).send();
         
      })
    
        app.get('/series' , async (request ,reply) =>{
    
            const series = await cone('series').select();
    
            return {series};
        })
    
      app.get('/series/:id' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            id : z.any(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const series = await cone('series').where('id',params.id).first();
    
        return {series};
      })
    
      app.delete('/series/deletar/:id' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            id : z.any(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const series = await cone('series').where('id',params.id).del();
    
        return reply.status(404).send();
      })

      app.get('/series/nome/:nome' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            nome : z.string(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const series = await cone('series').where('nome',params.nome).first();
    
        return {series};
      })
    }
    

    