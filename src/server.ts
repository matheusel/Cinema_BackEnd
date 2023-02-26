import fastify from "fastify";
import { transactionsRouteAtores } from "./rotas/atores";
import { transactionsRouteAvaliacao } from "./rotas/avaliacao";
import { transactionsRouteFilmes } from "./rotas/filmes";
import { transactionsRouteGeneros} from "./rotas/generos";
import { transactionsRouteNoticias } from "./rotas/noticias";
import { transactionsRouteSeries } from "./rotas/series";
import { transactionsRouteUsuarios } from "./rotas/usuarios";




const app = fastify();
app.register(transactionsRouteAtores);
app.register(transactionsRouteAvaliacao);
app.register(transactionsRouteFilmes);
app.register(transactionsRouteGeneros);
app.register(transactionsRouteNoticias);
app.register(transactionsRouteSeries);
app.register(transactionsRouteUsuarios);



app.listen({
    port:3333,
}).then(()=> {
    console.log("o servidor esta rodando")
});