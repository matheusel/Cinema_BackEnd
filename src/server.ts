import fastify from "fastify";
import { transactionsRouteSeries } from "./rotas/series";
import { transactionsRouteFilmes } from "./rotas/filmes";
import { transactionsRouteAvaliacao } from "./rotas/avaliacao";
import { transactionsRouteUsuarios } from "./rotas/usuarios";
import { transactionsRouteNoticias } from "./rotas/noticias";


const app = fastify();

app.register(transactionsRouteUsuarios);
app.register(transactionsRouteNoticias);
app.register(transactionsRouteFilmes);
app.register(transactionsRouteSeries);
app.register(transactionsRouteAvaliacao);

app.listen({
    port:3333,
}).then(()=> {
    console.log("o servidor esta rodando")
});