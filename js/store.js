import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const state = {
  game: {
    players: [],
    teams: [],
    rounds: [],
    deck: [],
    skipped: [],
    correctAnswers: [],
    currentCatchphrase: '',
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
  },
}

const mutations = {
  addPlayer(state, payload) {
    if (payload.name.trim() === '') {
      return
    }
    if (state.game.teams.length > 0 ) {
      if (state.game.team_counter > state.game.teams.length - 1) {
        state.game.team_counter = 0
      }
      
      var player = {
        index: state.game.teams[state.game.team_counter].players.length,
        name: payload.name,
        score: 0,
        team: state.game.teams[state.game.team_counter].name
      }

      if (payload.index) {
        state.game.players.splice(payload.index, 0, player)
      } else {
        state.game.players.push(player)
      }

      state.game.team_counter++
    } else {
      state.game.team_counter = 0

      var player = {
        index: state.game.players.length,
        name: payload.name,
        score: 0,
        team: undefined 
      }

      if (payload.index === undefined) {
        state.game.players.push(player)
      } else {
        player.index = payload.index
        state.game.players.splice(payload.index, 0, player)
      }
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
  },
  loadDeck(state, deck) {
    deck.cards = shuffle(deck.cards)
    state.game.deck = JSON.parse(JSON.stringify(deck)) 
    state.game.skipped = []
    state.game.correctAnswers = []
  }, 
  retrieveCard(state) {
    if (state.game.deck.cards.length > 0) {
      var candidate = state.game.deck.cards.pop()

      if (state.game.correctAnswers.includes(candidate) == false) {
        state.game.currentCatchphrase = candidate
      } else {
        this.commit('retrieveCard')
      }
    } else {
      state.game.currentCatchphrase = 'Out of Cards - Choose another deck'
    }

  },
  addSkipped(state, catchphrase) {
    state.game.skipped.push(catchphrase)
    state.game.deck.cards = shuffle(state.game.deck.cards)
  },
  addCorrectAnswer(state, catchphrase) {
    state.game.correctAnswers.push(catchphrase)
  },
  increasePlayerScore(state, payload) {
    var new_players = []

    state.game.players.forEach(function(player) {
      if (player.name === payload.player_name) {
        player.score = player.score + payload.value
      }
      new_players.push(player)
    })

    state.game.players = new_players
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [createPersistedState({key: 'app'})]
})
