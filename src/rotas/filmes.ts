import { cone } from "../database";
import { z } from 'zod';
import { FastifyInstance } from "fastify";


export async function transactionsRouteFilmes(app: FastifyInstance) {

  app.post('/filmes/criar', async (request, reply) => {


    const criarTransacao = z.object({
      nome: z.string(),
      sinopse: z.string(),
      direcao: z.string(),
      duracao: z.string(),
      classificacao: z.string(),
      lancamento: z.string(),
      imagem: z.string(),
      trailer: z.string(),
      generos_id :z.number(),
    })

    const body = criarTransacao.parse(request.body);

    const transacao = await cone('filmes').insert({
      nome: body.nome,
      sinopse: body.sinopse,
      direcao: body.direcao,
      duracao: body.duracao,
      classificacao: body.classificacao,
      lancamento: body.lancamento,
      imagem: body.imagem,
      trailer: body.trailer,
      generos_id:body.generos_id,
    })
    return reply.status(201).send();

  })

  app.get('/filmes', async (request, reply) => {

    const filmes = await cone('filmes').select();

    return filmes;
  })

  app.get('/filmes/:id', async (request, reply) => {

    const getParamsScheema = z.object({
      id: z.any(),
    })

    const params = getParamsScheema.parse(request.params);

    const filmes = await cone('filmes').where('id', params.id).first();

    return filmes;
  })

  app.get('/filmes/generos/:id' , async (request ,reply) =>{

    const getParamsScheema = z.object({
      id : z.any(),
  })

    const params = getParamsScheema.parse(request.params);

    const filmes = await cone('filmes').select('filmes.nome','filmes.sinopse','filmes.direcao','filmes.lancamento','filmes.classificacao','filmes.trailer','filmes.imagem').join('generos','generos.id','=','filmes.generos_id').where('generos.id',params.id).distinct();

    return filmes;
})

  app.delete('/filmes/deletar/:id', async (request, reply) => {

    const getParamsScheema = z.object({
      id: z.any(),
    })

    const params = getParamsScheema.parse(request.params);

    const filmes = await cone('filmes').where('id', params.id).del();

    return reply.status(404).send();
  })

  app.get('/filmes/nome/:nome' , async (request ,reply) =>{
    
    const getParamsScheema = z.object({
        nome : z.string(),
    })

    const params = getParamsScheema.parse(request.params);

    const filmes = await cone('filmes').where('nome',params.nome).first();

    return filmes;
  })

  app.put('/filmes/atualizar/:id' , async (request ,reply) =>{
    const criarTransacao = z.object({
      nome: z.string(),
      sinopse: z.string(),
      direcao: z.string(),
      duracao: z.string(),
      classificacao: z.string(),
      lancamento: z.string(),
      imagem: z.string(),
      trailer: z.string(),
      generos_id :z.number(),
    })

    const getParamsScheema = z.object({
     id : z.any(),
  })
    const body = criarTransacao.parse(request.body);
    const params = getParamsScheema.parse(request.params);

    const transacao =  await cone('filmes').where('id',params.id).update({
      nome: body.nome,
      sinopse: body.sinopse,
      direcao: body.direcao,
      duracao: body.duracao,
      classificacao: body.classificacao,
      lancamento: body.lancamento,
      imagem: body.imagem,
      trailer: body.trailer,
      generos_id:body.generos_id,
    })
        return reply.status(200).send(); 
  })
}
