<template>
  <section>
    <carousel :navigationEnabled="true"
              :paginationEnabled="false"
              :perPage="3">
      <slide v-for="deck in decks" @slideclick="ignoreClick">
        <deck :name="deck.name"
              :description="deck.description"
              :image="deck.image"
              :cards="deck.cards">
        </deck>
      </slide>
    </carousel>
    <h1>Choose Your Deck</h1>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

import { Carousel, Slide } from 'vue-carousel'

import Deck from '../components/Deck.vue'

import DeckIndex from '../decks/index.json'

export default {
  name: 'ChooseDeckCard',
  components: {
    Carousel,
    Slide,
    Deck
  },
  data: function() {
    return {
      decks: DeckIndex
    }
  },
  computed: {
    ...mapState(['game']),
  },
  methods: {
    ignoreClick() {
      return
    },
    ...mapMutations(['loadDeck']),
  }
}
</script>
