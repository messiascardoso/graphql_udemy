const { ApolloServer, gql } = require('apollo-server')

// Pontos de entrada da sua API! / Consultas
// ! vira um campo obrigatorio

const typeDefs = gql`
  # Cria um novo tipo de dado (Existe somente 5 tipos: Int, String, float, Boolean, ID )
  scalar Date

  type Usuario {
    id: ID!
    nome: String!
    email: String!
    idade: Int
    salario: Float
    blabla: String
  }

  type Query {
    ola: String
    horaAtual: Date
    usuarioLogado: Usuario
  }
`

//Conjunto de funcoes para resolver dados 
// Para para query precisa de um revolver
const resolvers = {
    // Foi criado para resolver o atributo `salario_real` que é diferente do type
    Usuario: {
      salario(usuario) {
        return usuario.salario_real
      },
      blabla(blabla) {
        return 'blabla 222'
      }
    },

   Query: {
      ola() {
        return 'Hello Word!'
      },
      horaAtual() {
        return new Date().toISOString()
      },
      usuarioLogado() {
        return {
          id: 1,
          nome: 'Messias',
          email: 'usuario@gmail.com',
          idade: 30,
          salario_real: 1000,
        }
      }
   }
}


const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
})