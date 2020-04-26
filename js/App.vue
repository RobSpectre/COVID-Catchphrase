<template>
  <div class="reveal" id="app">
    <div class="slides">
      <section class="intro" data-background-video="images/intro.mp4"
                             data-background-color="#000"
                             data-background-video-muted
                             data-background-video-loop>
        <div class="title">
          <img style="margin-top: 7em;" src="images/covid_catchphrase.png" />
        </div>
      </section>
      <section class="intro" data-background-video="images/instructions.mp4"
                             data-background-color="#000"
                             data-background-video-muted
                             data-background-video-loop>
        <h1>Headsup!</h1>
      </section>
      <section data-background-image="images/zoom.gif">
        <h1>Zoom</h1>
      </section>
      <section>
        <h3 class="fragment">Two Teams</h3>
        <h3 class="fragment">Alternate scoring</h3>
        <h3 class="fragment">Contestant</h3>
        <h3 class="fragment">Team Provides Clues</h3>
        <h3 class="fragment">2 Minute</h3>
        <h1>Gameplay</h1>
      </section>
      <section class="green">
        <h2 class="headline">Demo</h2>
      </section>
      <section class="darkgray">
        <h2 class="headline">covfefe</h2>
      </section>
      <section class="darkgray">
        <h2 class="headline">England</h2>
      </section>
      <section class="darkgray">
        <h2 class="headline">Bourbon</h2>
      </section>
      <section class="darkgray">
        <h2 class="headline">hockey</h2>
      </section>
      <section class="darkgray">
        <h2 class="headline">ragequit</h2>
      </section>
      <add-player-card></add-player-card>
      <choose-deck-card></choose-deck-card>
      <round name="One"
             point-value=1
             contest-length=90></round>
      <section class="intro" data-background-video="images/covid-19.mp4"
                             data-background-color="#000"
                             data-background-video-loop>
        <div class="title">
          <img style="margin-top: 7em;" src="images/covid_catchphrase.png" />
          <h3>Beverage Break</h3>
          <h3>covid-19</h3>
          <h3>Rad Jet bro</h3>
        </div>
      </section>
      <add-player-card></add-player-card>
      <choose-deck-card></choose-deck-card>
      <round name="Two"
             point-value=2
             contest-length=60></round>
      <section class="intro" data-background-video="images/turn_the_frogs.mp4"
                             data-background-color="#000"
                             data-background-video-loop>
        <div class="title">
          <img style="margin-top: 7em;" src="images/covid_catchphrase.png" />
          <h3>Beverage Break</h3>
          <h3>Alex Jones is so weird</h3>
          <h3>How did this happen</h3>
        </div>
      </section>
      <add-player-card></add-player-card>
      <round name="Final"
             point-value=3
             contest-length=90></round>
      <add-player-card></add-player-card>
    </div>
  </div>
</template>

<script>
import store from './store'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

import AddPlayerCard from '../components/AddPlayerCard.vue'
import ChooseDeckCard from '../components/ChooseDeckCard.vue'
import Round from '../components/Round.vue'

export default {
  name: 'app',
  store,
  components: {
    AddPlayerCard,
    ChooseDeckCard,
    Round
  },
  mounted() {
    initReveal()
  },
  computed: mapState(['game'])
}
</script>
