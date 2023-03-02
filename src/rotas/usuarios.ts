import { cone } from "../database";
import {z} from 'zod';
import { FastifyInstance } from "fastify";

export async function transactionsRouteUsuarios(app : FastifyInstance){

    app.post('/usuarios/criar' , async (request ,reply) =>{
        
        const criarTransacao = z.object({
          nome: z.string(),
          email: z.string(),
          senha: z.string(),
          perfil: z.string()
        })
      
        const body = criarTransacao.parse(request.body);
      
        const transacao =  await cone('usuarios').insert({
          nome : body.nome,
          email : body.email,
          senha : body.senha,
          perfil : body.perfil
        })
            return reply.status(201).send();
         
      })
    
        app.get('/usuarios' , async (request ,reply) =>{
    
            const usuarios = await cone('usuarios').select();
    
            return usuarios;
        })
    
      app.get('/usuarios/:id' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            id : z.any(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const usuarios = await cone('usuarios').where('id',params.id).first();
    
        return usuarios;
      })

      
      app.get('/usuarios/perfil' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            perfil : z.string(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const usuarios = await cone('usuarios').where('perfil',params.perfil).first();
    
        return usuarios;
      })
    
      app.delete('/usuarios/deletar/:id' , async (request ,reply) =>{
    
        const getParamsScheema = z.object({
            id : z.any(),
        })
    
        const params = getParamsScheema.parse(request.params);
    
        const usuarios = await cone('usuarios').where('id',params.id).del();

        return reply.status(404).send();
      })
      app.put('/usuarios/atualizar/:id' , async (request ,reply) =>{
        const criarTransacao = z.object({
          nome: z.string(),
          email: z.string(),
          senha: z.string(),
          perfil: z.string()
        })

        const getParamsScheema = z.object({
         id : z.any(),
      })
        const body = criarTransacao.parse(request.body);
        const params = getParamsScheema.parse(request.params);

        const transacao =  await cone('usuarios').where('id',params.id).update({
          nome : body.nome,
          email : body.email,
          senha : body.senha,
          perfil : body.perfil

        })
            return reply.status(200).send(); 
      })
    }
      
