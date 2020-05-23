<template>
  <div>
    <h1 class="page_title">リクエスト</h1>
    <a href="/request" class="request_button">+</a>
    <ul class="request_list">
      <li v-for="request in requests" :key="request.id">
        <h2>{{ request.item }}</h2>
        <p class="time">
          {{ formatTime(request.timeS) }} ～ {{ formatTime(request.timeE) }}
        </p>
        <p class="kashite_button">
          <a>
            <b>
              {{ request.userName }}
            </b>
            さんに貸す
          </a>
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref } from '@vue/composition-api'
import { IReuqestData } from '@@/models/firestore/Request'
import { convertTimestampToDateTimeFormat } from '@/utils/format-data'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $firebase } }) {
    const unsubscribe = [] as Function[]
    onBeforeUnmount(() => {
      unsubscribe.forEach((item) => item())
    })

    const requests = ref([] as IReuqestData[])

    unsubscribe.push(
      $firebase
        .firestore()
        .collection('requests')
        .orderBy('createdAt', 'desc')
        .onSnapshot((requestsQuery) => {
          requests.value = []
          requestsQuery.docs.forEach((requestDocument) => {
            requests.value.push({
              ...requestDocument.data(),
              id: requestDocument.id
            } as IReuqestData)
          })
        })
    )

    const formatTime = (timestamp: any) => {
      return convertTimestampToDateTimeFormat(timestamp)
    }

    return {
      requests,
      formatTime
    }
  }
})
</script>
