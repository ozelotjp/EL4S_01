<template>
  <form class="login">
    <h1 class="page_title">リクエストを追加</h1>

    <label>貸して欲しいモノ</label>
    <input v-model="state.item" type="text" name="target" />

    <label>貸出開始時間</label>
    <input v-model="state.timeS" type="datetime-local" name="startTime" />

    <label>返却予定時間</label>
    <input v-model="state.timeE" type="datetime-local" name="endTime" />

    <label>コメント</label>
    <input v-model="state.comment" type="text" name="comment" />

    <button type="button" @click="addRequest">KASHITE</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { IUserData } from '@@/models/firestore/User'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase, $router } }) {
    const state = reactive({
      userName: '',
      item: '黒本',
      location: '222教室',
      timeS: '2020/05/23 17:10:00',
      timeE: '2020/05/23 18:50:00',
      comment: ''
    })

    $firebase
      .firestore()
      .collection('users')
      .doc($firebase.auth().currentUser!.uid)
      .get()
      .then((userDocument) => {
        const userData = {
          ...userDocument.data(),
          id: userDocument.id
        } as IUserData
        state.userName = userData.name
      })

    const addRequest = () => {
      $firebase
        .firestore()
        .collection('requests')
        .add({
          createdAt: $firebase.firestore.FieldValue.serverTimestamp(),
          item: state.item,
          location: state.location,
          timeS: $firebase.firestore.Timestamp.fromDate(new Date(state.timeS)),
          timeE: $firebase.firestore.Timestamp.fromDate(new Date(state.timeE)),
          user: $firebase.auth().currentUser!.uid,
          userName: state.userName
        })
        .then(() => {
          $router.push('/')
        })
    }

    return {
      state,
      addRequest
    }
  }
})
</script>
