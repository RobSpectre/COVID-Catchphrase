<template>
  <section class="darkgray">
    <div v-if="started">
      <div class="grid grid-cols-3">
        <div class="content-center">
          <img class="h-8 w-auto" src="/images/covid_catchphrase.png" />
        </div>
        <div>
          <h3 class="text-white col-span-2 text-center">{{ timeLeft }}</h3>
        </div>
      </div>
      <h2 class="headline"i v-if="started">{{ game.currentCatchphrase }}</h2>
      <div>
        <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div>
                <div class="text-lg leading-5 font-medium text-black truncate
                  uppercase">
                  Skips
                </div>
                <div class="mt-6 text-6xl leading-9 font-semibold text-black">
                 {{ skips.length }} 
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-hidden">
            <div class="px-2 py-3 sm:p-6 mt-3">
              <button v-if="notEnded" type="button" class="inline-flex items-center px-6 py-3
              border border-transparent text-base leading-6 font-medium
              rounded-md text-white bg-blue hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg- transition ease-in-out duration-150"
                                    @click="skip">                
                Skip
              </button>
              <button v-if="notEnded" type="button" class="inline-flex items-center px-6 py-3
              border border-transparent text-base leading-6 font-medium
              rounded-md text-white bg-green hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg- transition ease-in-out duration-150"
                                    @click="score">                
                Correct 
              </button>
            </div>
          </div>
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div>
                <div class="text-lg leading-5 font-medium text-black truncate
                  uppercase">
                Correct
                </div>
                <div class="mt-6 text-6xl leading-9 font-semibold text-black">
                  {{ correctAnswers.length }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div class="overflow-hidden">
            <div class="px-4 py-5 sm:p-6">
              <div>
                <div class="text-base font-medium text-white">
                  <span class="block" v-for="skipped in skips">{{ skipped }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-hidden">
            <div class="px-2 py-3 sm:p-6">
              <div>
                <div class="text-lg leading-5 font-medium text-white truncate
                  uppercase">
                  {{ playerTeam }} 
                </div>
                <div class="text-2xl font-medium text-white" v-for="player in getPlayersFromTeam(playerTeam)">
                  <span class="block" v-if="player.name !== playerName">{{
                  player.name }} </span>
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-hidden">
            <div class="px-4 py-5 sm:p-6">
              <div>
                <div class="text-base font-medium text-white">
                  <span class="block" v-for="correct in correctAnswers">{{ correct  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mt-20">
			<div class="relative bg-gray-800">
				<div class="h-32 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
					<img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6875F5&sat=-100&blend-mode=multiply" alt="Support team" />
				</div>
				<div class="relative max-w-screen-xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
					<div class="md:ml-auto md:w-1/2 md:pl-10">
						<div class="text-base leading-6 font-semibold uppercase tracking-wider text-gray-300">
							Award winning support
						</div>
						<span class="mt-2 text-white text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10">
							We’re here to help
						</span>
						<p class="mt-3 text-lg leading-7 text-gray-300">
              Rob is really running out of time to ship this for tonight. Enjoy
              this crisp, royalty free UI.
						</p>
						<div class="mt-8">
							<div class="inline-flex rounded-md shadow">
								<a href="#" class="inline-flex items-center justify-center px-5
                  py-3 border border-transparent text-base leading-6
                  font-medium rounded-md text-gray-900 bg-green
                  hover:text-gray-600 focus:outline-none focus:shadow-outline
                  transition duration-150 ease-in-out uppercase"
                  v-on:click.prevent="startGame">
								 Let's Go!
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
    </div>
    <h1>{{ playerName }}</h1>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'


export default {
  name: 'Contestant',
  data: function() {
    return {
      correctAnswers: [],
      skips: [],
      started: false,
      timeLeft: parseInt(this.contestLength),
      points: parseInt(this.pointValue),
      notEnded: true,
      soundMap: {
        correct: [
          '/sounds/Success_1.mp3',
          '/sounds/Success_2.mp3',
          '/sounds/Yeah.mp3',
          '/sounds/smb_powerup.wav',
          '/sounds/4.mp3',
          '/sounds/8.mp3',
          '/sounds/12.mp3',
          '/sounds/item-2.mp3',
          '/sounds/key.mp3'
        ],
        wrong: [
          '/sounds/Wrong_1.mp3',
          '/sounds/Wrong_2.mp3',
          '/sounds/Wrong_3.mp3',
          '/sounds/Moan.mp3',
          '/sounds/smb_bump.wav',
          '/sounds/battery-critical.mp3',
          '/sounds/error.mp3',
          '/sounds/hardware-fail.mp3',
          '/sounds/hardware-remove.mp3',
          '/sounds/shutdown.mp3',
          '/sounds/nope.mp3',
          '/sounds/ok.mp3',
          '/sounds/really.mp3',
          '/sounds/wow.mp3',
          '/sounds/3.mp3',
          '/sounds/why-you-fail.mp3',
          '/sounds/kill.mp3'
        ],
        wins: [
          '/sounds/Victory.mp3',
          '/sounds/smb_stage_clear.wav'
        ],
        fails: [
          '/sounds/Game_Over.mp3'
        ]
      }
    }
  },
  props: ['player-name',
          'player-team',
          'point-value',
          'contest-length'],
  computed: {
    ...mapState(['game']),
    ...mapGetters(['getPlayersFromTeam']),
  },
  methods: {
    startGame() {
      this.started = true
      this.iterateClock()
      this.cycleContest()
    },
    iterateClock() {
      if (this.timeLeft > 0 ) {
        if (this.timeLeft == 20) {
          this.play("/sounds/smb_warning.wav")
        }
        this.timeLeft--
        setTimeout(this.iterateClock,
                   1000)
      } else {
        this.notEnded = false
        this.play(this.sound_win())
      }
    },
    cycleContest() {
      this.retrieveCard()
    },
    skip() {
      this.play(this.sound_wrong())
      this.skips.push(this.game.currentCatchphrase)
      this.addSkipped(this.game.currentCatchphrase)
      this.cycleContest()
    },
    score() {
      this.play(this.sound_correct())
      this.increasePlayerScore({player_name: this.playerName,
                                 value: this.points})
      this.correctAnswers.push(this.game.currentCatchphrase)
      this.addCorrectAnswer(this.game.currentCatchphrase)
      this.cycleContest()
    },
    play(sound) {
      var audio = new Audio(sound)
      audio.play()
    },
    sound_correct: function() {
        return this.soundMap.correct[Math.floor(Math.random()*this.soundMap.correct.length)]
    },
    sound_wrong: function() {
        return this.soundMap.wrong[Math.floor(Math.random()*this.soundMap.wrong.length)]
    },
    sound_win: function() {
        return this.soundMap.wins[Math.floor(Math.random()*this.soundMap.wins.length)]
    },
    sound_fail: function() {
        return this.soundMap.fails[Math.floor(Math.random()*this.soundMap.fails.length)]
    },
    ...mapMutations(['increasePlayerScore',
                     'retrieveCard',
                     'addSkipped',
                     'addCorrectAnswer']),
  }
}
</script>
