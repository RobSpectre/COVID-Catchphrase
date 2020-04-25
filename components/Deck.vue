<template>
  <div class="max-w-sm" v-bind:class="{ selecteddeck: isSelected }">
    <div class="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-l-lg">
      <div class="flex-1 flex flex-col">
        <div class="bg-white px-6 py-10">
          <div>
            <span class="text-center text-2xl leading-8 font-medium
            text-gray-900 font-semibold">{{ name }}</span>
            <div class="mt-4 flex items-center justify-center">
              <span class="px-3 flex items-start text-6xl leading-none tracking-tight text-gray-900">
                <img class="inline-block h-24 w-24 rounded-full" :src="image"/>
              </span>
            </div>
          </div>
        </div>
        <div class="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10">
          <p class="mt-3 text-base leading-6 text-gray-500">{{ description }}</p>
          <div class="mt-1 flex-shrink-0 sm:mt-0 mx-auto">
            <div class="flex overflow-hidden">
              <span class="inline-flex items-center p-3 rounded-full
              text-3xl font-medium leading-5 bg-blue text-white">
                {{ cards.length }} cards
              </span>
            </div>
          </div>
          <div class="mt-8">
            <div class="rounded-lg shadow-md">
              <a class=
              "block w-full text-center rounded-lg border border-transparent
                 bg-green px-6 py-3 text-base leading-6 font-semibold text-white
                 hover:text-white focus:outline-none focus:shadow-outline
                 transition ease-in-out duration-150 uppercase"
                 href="#" v-on:click.prevent="selectDeck()">Pick This Deck</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {

  name: 'Deck',
  data: function() {
    return {
      isSelected: false
    }
  },
  props: ['name',
          'description',
          'image',
          'cards'],
  methods: {
    selectDeck() {
      this.isSelected = true
      this.loadDeck({name: this.name,
                     description: this.description,
                     image: this.image,
                     cards: this.cards}) 
    },
    ...mapMutations(['loadDeck']),
  }
}

</script>
