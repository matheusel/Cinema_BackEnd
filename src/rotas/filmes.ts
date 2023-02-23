import { cone } from "../database";
import { z } from 'zod';
import { FastifyInstance } from "fastify";


export async function transactionsRoute(app: FastifyInstance) {

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

    })
    return reply.status(201).send();

  })

  app.get('/filmes', async (request, reply) => {

    const filmes = await cone('filmes').select();

    return { filmes };
  })

  app.get('/filmes/:id', async (request, reply) => {

    const getParamsScheema = z.object({
      id: z.any(),
    })

    const params = getParamsScheema.parse(request.params);

    const filmes = await cone('filmes').where('id', params.id).first();

    return { filmes };
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

    return {filmes};
  })
}
