import fastify from "fastify";
import { transactionsRoute } from "./rotas/series";

const app = fastify();

app.register(transactionsRoute);

app.listen({
    port:3333,
}).then(()=> {
    console.log("o servidor esta rodando")
});