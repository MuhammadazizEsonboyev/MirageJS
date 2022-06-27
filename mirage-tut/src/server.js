import { createServer, Model, hasMany , belongsTo} from "miragejs";

// let movies = [
//     {id : 1, name : 'Ali', year: 2020},
//     {id : 2, name : 'Dior', year: 2023},
//     {id : 3, name : 'Shox', year: 2034},
// ]

createServer({
  models: {
    movie: Model.extend({
      actors: hasMany()
    }),
    actor: Model.extend({
      movie: belongsTo()
    })
  },
  seeds(server) {
    const matt = server.create("actor", { name: "Matthew McConaughey" });
    const anne = server.create("actor", { name: "Anne Hathaway" });
    const leo = server.create("actor", { name: "Jessica Chastain" });
    const tom = server.create("actor", { name: "Ali Abdullayev" });
    const cillian = server.create("actor", { name: "Mirka Dirka" });

    server.create("movie", {
      name: "Inception",
      year: 2010,
      actors: [leo, tom]
    });
    server.create("movie", {
      name: "Interstellar",
      year: 2014,
      actors: [matt, anne]
    });
    server.create("movie", {
      name: "Dunkirk",
      year: 2017,
      actors: [cillian, tom]
    });
  },
  routes() {
    this.namespace = "api";

    this.get("/movies", (schema, request) => {
      return schema.movies.all();
    });

    this.post("/movies", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);

      return schema.movies.create(attrs);
    });

    this.patch("/movies/:id", (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody);
      let id = request.params.id;
      let movie = schema.movies.find(id);

      return movie.update(newAttrs);
    });

    this.get("/movies");
    this.get("/movies/:id");
    this.del("/movies/:id");
    this.get("/movies/:id/actors", (schema, request) => {
        let movie = schema.movies.find(request.params.id)

        return movie.actors
    });
  }
});
