import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const state = {
  game: {
    players: [],
    teams: [],
    rounds: [],
    deck: [],
    currentRound: 1,
    team_counter: 0,
  }
}

const getters = {
  teamsWithPlayers(state) {
    if (state.game.teams === undefined) {
      return state.game.teams
    }
    var teams_with_players = []

    state.game.teams.forEach(function(team) {
      var individual_scores = []

      team.players = state.game.players.filter(player => team.name === player.team)
      team.players.forEach(function(player) {
        individual_scores.push(player.score)
      })
      team.score = individual_scores.reduce(function(a, b) {
        return a + b
      }, 0)

      teams_with_players.push(team)
    })

    return teams_with_players 
  },
  getPlayersFromTeam: (state) => (team_name) => {
    return state.game.players.filter(player => team_name === player.team)
  }
}

const mutations = {
  addPlayer(state, name) {
    if (name.trim() === '') {
      return
    }
    if (state.game.teams.length > 0 ) {
      if (state.game.team_counter > state.game.teams.length - 1) {
        state.game.team_counter = 0
      }

      state.game.players.push({
        index: state.game.teams[state.game.team_counter].players.length,
        name: name,
        score: 0,
        team: state.game.teams[state.game.team_counter].name
      })

      state.game.team_counter++
    } else {
      state.game.team_counter = 0

      state.game.players.push({
        index: state.game.players.length,
        name: name,
        score: 0,
        team: undefined 
      })
    }
  },
  removePlayer(state, name) {
    state.game.players = state.game.players.filter(player => name !== player.name)
  },
  changeAttributeOfPlayer(state, payload) {
    var new_players = []

    state.game.players.forEach(function(player) {
      if (player.name === payload.player_name) {
        player[payload.attribute] = payload.value
      }
      new_players.push(player)
    })

    state.game.players = new_players
  },
  changeAttributesOfPlayer(state, payload) {
    var new_players = []

    state.game.players.forEach(function(player) {
      if (player.name === payload.player_name) {
        payload.attributes.forEach(function(attribute) {
          player[attribute.attribute] = attribute.value
        })
      }

      new_players.push(player)
    })

    state.game.players = new_players
  },
  addTeam(state, name) {
    if (name.trim() === '') {
      return
    }
    state.game.teams.push({
      name: name,
      score: 0
    })
  },
  removeTeam(state, name) {
    state.game.teams = state.game.teams.filter(team => name !== team.name)

    state.game.players = state.game.players.filter(player => name !== player.team)

    if (state.game.teams === undefined) {
      state.game.teams = []
    }
  }
}

const vuexPersist = new VuexPersist({
  key: 'app',
  storage: window.localStorage
})

export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [vuexPersist.plugin]
})
