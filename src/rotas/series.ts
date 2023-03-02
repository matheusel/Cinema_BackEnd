import { cone } from "../database";
import { number, z } from 'zod';
import { FastifyInstance } from "fastify";

export async function transactionsRouteSeries(app : FastifyInstance){

    app.post('/series/criar', async (request ,reply) =>{
        
        const criarTransacao = z.object({
          nome: z.string(),
          sinopse: z.string(),
          direcao: z.string(),
          lancamento: z.any(),
          classificacao: z.string(),
          temporadas: z.number(),
          trailer: z.string(),
          imagem: z.string(),
          generos_id :number(),
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
          generos_id:body.generos_id,
        })
            return reply.status(201).send();
         
      })
    
        app.get('/series' , async (request ,reply) =>{
    
            const series = await cone('series').select();
    
            return series;
        })

        app.get('/series/generos/:id' , async (request ,reply) =>{

          const getParamsScheema = z.object({
            id : z.any(),
        })
    
          const params = getParamsScheema.parse(request.params);
    
          const series = await cone('series').select('series.nome','series.sinopse','series.direcao','series.lancamento','series.classificacao','series.temporadas','series.trailer','series.imagem').join('generos','generos.id','=','series.generos_id').where('generos.id',params.id).distinct();
  
          return series;
      })
    
      app.get('/series/:id' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            id : z.any(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const series = await cone('series').where('id',params.id).first();
    
        return series;
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
    
        return series;
      })

      app.put('/series/atualizar/:id' , async (request ,reply) =>{
        const criarTransacao = z.object({
          nome: z.string(),
          sinopse: z.string(),
          direcao: z.string(),
          lancamento: z.any(),
          classificacao: z.string(),
          temporadas: z.number(),
          trailer: z.string(),
          imagem: z.string(),
          generos_id :number(),
        })

        const getParamsScheema = z.object({
         id : z.any(),
      })
        const body = criarTransacao.parse(request.body);
        const params = getParamsScheema.parse(request.params);

        const transacao =  await cone('series').where('id',params.id).update({
          nome : body.nome,
          sinopse: body.sinopse,
          direcao: body.direcao,
          lancamento: body.lancamento,
          classificacao: body.classificacao,
          temporadas: body.temporadas,
          trailer: body.trailer,
          imagem: body.imagem,
          generos_id:body.generos_id,

        })
            return reply.status(200).send(); 
      })
    }
    

    