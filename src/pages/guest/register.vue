<template>
  <form class="login">
    <h1 class="page_title">新規登録</h1>

    <label>氏名</label>
    <input v-model="state.name" type="text" name="inputName" />

    <label>学籍番号</label>
    <input v-model="state.id" type="number" name="inputID" maxlength="5" />

    <label>クラス記号</label>
    <input v-model="state.class" type="text" name="inputClass" maxlength="8" />

    <label>パスワード</label>
    <input v-model="state.password" type="password" name="inputPass" />

    <button name="submit" type="button" @click="register">START</button>

    <nuxt-link class="change" to="/guest/login">ログインはこちら</nuxt-link>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  setup(_, { root: { $firebase, $router } }) {
    const state = reactive({
      name: '桑原大夢',
      id: '70060',
      class: 'IH14A223',
      password: 'password'
    })

    $firebase.auth().onAuthStateChanged((user) => {
      if (user === null) {
        return
      }
      $router.push('/')
    })

    const register = () => {
      $firebase
        .auth()
        .createUserWithEmailAndPassword(
          `nhs${state.id}@nagoya.hal.ac.jp`,
          state.password
        )
        .then((credential) => {
          $firebase
            .firestore()
            .collection('users')
            .doc(credential.user!.uid)
            .set({
              name: state.name,
              class: state.class
            })
        })
        .catch((error) => {
          window.alert(error.message)
        })
    }

    return {
      state,
      register
    }
  }
})
</script>
