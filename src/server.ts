import fastify from "fastify";
import { transactionsRouteSeries } from "./rotas/series";
import { transactionsRouteFilmes } from "./rotas/filmes";
import { transactionsRouteAvaliacao } from "./rotas/avaliacao";

const app = fastify();

app.register(transactionsRouteSeries, transactionsRouteFilmes, transactionsRouteAvaliacao);

app.listen({
    port:3333,
}).then(()=> {
    console.log("o servidor esta rodando")
});