<template>
  <section>
    <section class="green">
        <h2 class="headline">Round {{ name }}</h2>
    </section>
    <contestant v-for="contestant in roundOrder"
                :player-name="contestant.name"
                :player-team="contestant.team"
                :point-value="pointValue"
                :contest-length="contestLength">
    </contestant>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

import Contestant from '../components/Contestant.vue'

export default {
  name: 'Round',
  components: {
    Contestant
  },
  props: ['name',
          'point-value',
          'contest-length'],
  computed: {
    roundOrder: function() {
      var order = []

      var team_counter = 0 
      var index_counter = 0
      
      for (var i=1; i <= this.game.players.length; i++) {
        if (team_counter > this.game.teams.length - 1) {
          team_counter = 0 
          index_counter++
        }
        
        if (index_counter > this.teamsWithPlayers[team_counter].players.length - 1) {
          continue
        }

        order.push(this.teamsWithPlayers[team_counter].players[index_counter])

        team_counter++
      }

      return order
    },
    ...mapState(['game']),
    ...mapGetters(['teamsWithPlayers']),
  }
}
</script>
