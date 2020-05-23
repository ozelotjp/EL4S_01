<template>
  <!-- main -->
  <!-- form area -->
  <form class="login">
    <h1 class="page_title">ログイン</h1>

    <label>学籍番号</label>
    <input v-model="state.id" type="number" />

    <label>パスワード</label>
    <input v-model="state.password" type="password" />

    <button type="button" @click="login">
      START
    </button>

    <nuxt-link class="change" to="/guest/register">
      新規会員登録はこちら
    </nuxt-link>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  setup(_, { root: { $firebase, $router } }) {
    const state = reactive({
      id: '70060',
      password: 'password'
    })

    $firebase.auth().onAuthStateChanged((user) => {
      if (user === null) {
        return
      }
      $router.push('/')
    })

    const login = () => {
      $firebase
        .auth()
        .signInWithEmailAndPassword(
          `nhs${state.id}@nagoya.hal.ac.jp`,
          state.password
        )
        .catch((error) => {
          window.alert(error.message)
        })
    }

    return {
      state,
      login
    }
  }
})
</script>
