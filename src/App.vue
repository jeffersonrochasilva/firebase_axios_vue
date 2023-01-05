<template>
  <div id="app">
    <!-- <router-view /> -->
    <h1>HTTP com Axios e Firebase</h1>
    <div class="container">
      <label>Nome </label>
      <input
        type="text"
        placeholder="Digite seu noem"
        v-model="usuario.nome"
      /><br /><br />
      <label>email </label>
      <input
        type="text"
        placeholder="Digite seu email"
        v-model="usuario.email"
      />
      <hr />
      <button
        class="button"
        @click.privent="salvar"
        style="background: #1e90ff"
      >
        Salvar
      </button>
      <button
        class="button"
        @click.privent="obterUsuario"
        style="background: #32cd32"
      >
        Obter Usuário
      </button>
    </div>
    <hr />
    <ul class="list" v-if="usuarios.length > 0">
      <li v-for="(item, i) in usuarios" :key="i">
        <strong>Nome: {{ item.nome }}</strong
        ><br />
        <strong>Email: {{ item.email }}</strong
        ><br />
        <strong>ID: {{ item.id }}</strong
        ><br />

        <button
          class="button"
          @click="excluir(item.id)"
          style="background: #ffdb58; color: #000"
        >
          Excluir
        </button>
        <button
          class="button"
          @click="carregar(item)"
          style="background: #cd5c5c; color: #000"
        >
          Carregar
        </button>
      </li>
    </ul>
    <br />
    <br />
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      usuarios: [],
      usuario: {
        nome: "",
        email: "",
      },
    };
  },
  methods: {
    limpar() {
      this.usuario.nome = "";
      this.usuario.email = "";
      this.id = null;
    },
    excluir(id) {
      this.$http.delete(`usuarios/${id}.json`).then(() => {
        this.limpar();
        this.obterUsuario();
      });
    },
    carregar(item) {
      this.usuario.nome = item.nome;
      this.usuario.email = item.email;
      this.usuario.id = item.id;
      this.id = item.id;
    },
    salvar() {
      const method = this.id ? "patch" : "post";
      const filnalUrl = this.id ? `/${this.id}.json` : ".json";

      this.$http[method](`/usuarios${filnalUrl}`, this.usuario)
        .then((res) => {
          this.limpar();
          this.obterUsuario();
        })
        .catch((error) => {
          console.log(error, "ERROR");
        });
    },
    obterUsuario() {
      this.$http.get("usuarios.json").then((res) => {
        this.usuarios = res.data;
        console.log(this.usuarios);
      });
    },
  },
  // created() {
  //   this.$http
  //     .post("usuarios.json", {
  //       nome: "Maria",
  //       email: "maria@gmail.com",
  //     })
  //     .then((res) => {
  //       console.log(res, "res");
  //     })
  //     .catch((e) => {
  //       console.log(e, "ERROR");
  //     });
  // },
};
</script>

<style>
.button {
  width: 100px;
  height: 30px;
  border-radius: 4px;
  background: rgb(117, 188, 236);
  color: #fff;
  border-style: none;
  margin: 10px;
}
#app {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  border: 1px solid gray;
  padding: 30px;
}
li {
  width: 600px;
  border: 1px solid gray;
  padding: 15px 55px;
  list-style: none;
}
ul {
  margin: 0;
  padding: 0;
}
input {
  width: 600px;
}
h1,
span,
label,
button,
strong {
  font-family: sans-serif;
}

hr {
  margin: 30px 0;
}
</style>
