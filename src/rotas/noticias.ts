import { cone } from "../database";
import { z } from "zod";
import { FastifyInstance } from "fastify";

export async function transactionsRouteNoticias(app: FastifyInstance) {
    
    app.post('/noticias/criar', async (request, reply) => {
        
        const criarTransacao = z.object({
            nome: z.string(),
            imagem: z.string(),
            data: z.string(),
            autor: z.string(),
            descricao: z.string(),
        })

        const body = criarTransacao.parse(request.body);

        const transacao = await cone('noticias').insert({
            nome: body.nome,
            imagem: body.imagem,
            data: body.data,
            autor: body.autor,
            descricao: body.descricao,
        })

        return reply.status(201).send();
    })

    app.get('/noticias', async (request, reply) => {

        const noticias = await cone('noticias').select();

        return { noticias };
    })

    app.get('/noticias/:id', async (request, reply) => {
        const getParamsScheema = z.object({
            id: z.any(),
        })

        const params = getParamsScheema.parse(request.params)

        const noticias = await cone('noticias').where('id', params.id).first()

        return { noticias }
    })

    app.delete('/noticias/deletar/:id', async (request, reply) => {
        const getParamsScheema = z.object({
            id: z.any(),
        })

        const params = getParamsScheema.parse(request.params)

        const noticias = await cone('noticias').where('id', params.id).del()

        return reply.status(404).send();
    })

    app.get('/noticias/nome/:nome', async (request, reply) => {
        const getParamsScheema = z.object({
            nome: z.string(),
        })

        const params = getParamsScheema.parse(request.params)

        const noticias = await cone('noticias').where('nome', params.nome).first()

        return { noticias }
    })

    app.put('/noticias/atualizar/:id' , async (request ,reply) =>{
        const criarTransacao = z.object({
            nome: z.string(),
            imagem: z.string(),
            data: z.string(),
            autor: z.string(),
            descricao: z.string(),
        })

        const getParamsScheema = z.object({
         id : z.any(),
      })
        const body = criarTransacao.parse(request.body);
        const params = getParamsScheema.parse(request.params);

        const transacao =  await cone('noticias').where('id',params.id).update({
            nome: body.nome,
            imagem: body.imagem,
            data: body.data,
            autor: body.autor,
            descricao: body.descricao,

        })
            return reply.status(200).send(); 
      })
}