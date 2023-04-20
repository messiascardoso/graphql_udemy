const { ApolloServer, gql } = require('apollo-server')

const perfis = [
  {id: 1, nome: 'comum'},
  {id: 2, nome: 'administrador'}
];

const usuarios = [
  {
    id: 1,
    nome: 'usuario 1',
    email: 'usuario@gmail.com',
    idade: 19
  },
  {
    id: 2,
    nome: 'usuario 2',
    email: 'usuario2@gmail.com',
    idade: 29
  },
  {
    id: 3,
    nome: 'usuario 3',
    email: 'usuario3@gmail.com',
    idade: 39
  },
]

// Pontos de entrada da sua API! / Consultas
// ! vira um campo obrigatorio

const typeDefs = gql`
  # Cria um novo tipo de dado (Existe somente 5 tipos: Int, String, float, Boolean, ID )
  scalar Date

  type Produto {
    nome: String
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  type Perfil {
    id: Int
    nome: String
  }

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
    produtoEmDestaque: Produto
    numerosMegaSena: [Int]!
    usuarios: [Usuario]!
    usuario( id: Int ): Usuario
    perfis: [Perfil]!
    perfil(id: Int): Perfil
  }
`

//Conjunto de funcoes para resolver dados 
// Para para query precisa de um revolver
const resolvers = {

    Produto:  {
      precoComDesconto(produto) {
        if (produto.desconto) {
          return produto.preco * (1 - produto.desconto)
        }else {
          return produto.preco
        }
      }
    },
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
      },
      produtoEmDestaque() {
        return {
          nome: 'Notebook gamer',
          preco: 500,
          desconto: 0.20
        }
      },
      numerosMegaSena() {
        const crescente = (a, b) => a- b;
        return Array(6).fill(0)
        .map(n => parseInt(Math.random() * 60 + 1 ))
        .sort(crescente)
      },
      usuarios() {
        return usuarios
      },
      usuario(_, {id}) {
        const usuario = usuarios.find(u => u.id == id)
        return usuario ? usuario : null
      },
      perfis() {
        return perfis
      },
      perfil(_, {id}) {
        const perfil = perfis.find(u => u.id == id)
        return perfil ? perfil : null
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