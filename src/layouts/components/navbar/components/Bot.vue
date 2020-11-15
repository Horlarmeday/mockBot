<template>
  <div id="mockBot">
    <div class="popup">
      <div class="conversation"></div>
      <form @submit.prevent="submitData">
        <textarea placeholder="Type your message..." @keypress="enterKey"></textarea>
        <button type="submit" class="btn">Send</button>
      </form>
    </div>

    <button type="reset" class="btn cancel" @click="cancelBot">Chat</button>
  </div>
</template>

<script>
import chart from './stateChart'
export default {
  data () {
    return {
      state: 'init',
      stateChart: chart,
      timer: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      setTimeout(() => {
            this.ask()
          }, 1000);
      
    },
    cancelBot() {
      let chatEl = document.getElementById("mockBot");
      let pop = chatEl.getElementsByClassName("popup")[0]

      let closeBtN = chatEl.getElementsByClassName("cancel")[0]

      if (pop.style.display !== "block") {
          pop.style.display = "block";
          closeBtN.innerHTML = "Close";

          if ("init" == this.state) {
            this.ask(""); // move to first state and send first msg
          }
      } else {
          pop.style.display = "none";
          closeBtN.innerHTML = "Chat";
      }
    },

    enterKey(event) {
      if (event.which === 13 && !event.shiftKey) {
        event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.preventDefault();
      }
    },

    submitData() {
      let chatEl = document.getElementById("mockBot");
      let chatFrm = chatEl.getElementsByTagName("form")[0];
      let chatInp = chatFrm.getElementsByTagName("textarea")[0]

      if (chatInp.value !== "") {
        this.ask(chatInp.value);
      }
      chatInp.value = "";
    },

    ask(msg) {
      this.clearTimer();

        if (msg !== "") {
          this.outPut(msg, false);
        }

        const chart = this.stateChart[ this.state ];

        const changes = chart.changes;

        if (!this.matchChange(changes, msg)) {

            if (chart.hasOwnProperty("parentChart")) {
                const parentChart = this.stateChart[ chart.parentChart ];

                if (!this.matchChange(parentChart.changes, msg)) {

                  this.changeState(chart.defaultState);
                }
            } else {
              this.changeState(chart.defaultState);
            }
        }
    },

    changeState(newState) {

      this.clearTimer();

      const newChart = this.stateChart[ newState ];
      if (newChart.hasOwnProperty("timeoutState")) {
          const timeout = 1000 * (newChart.hasOwnProperty("timeout") ? newChart.timeout : 10);
          this.timer = setTimeout(() => {
            this.changeState(newChart.timeoutState);
          }, timeout);
      }

      const newMsg = newChart.first;
      this.state = newState;
      this.outPut(newMsg, true);

    },

    matchChange(changes, msg) {

      let newState = null;

      changes.forEach((change) => {
        const regex = new RegExp(change.pattern, "ig");
        if (msg.match(regex)) {
          newState = change.newState;

          return;
        }
      });

      if (null !== newState) {
          this.changeState(newState);
          return true;
      } else {
          return false;
      }
    },

    clearTimer() {
      if (null !== this.timer) {
        clearTimeout(this.timer);
      }
    },

    outPut(msg, reply) {
      let chatEl = document.getElementById('mockBot')
      let chatDiv = chatEl.getElementsByClassName("conversation")[0]

      if ("" == msg) {
          return;
      }

      var para = document.createElement("p");
      para.setAttribute("class", reply ? "msg reply" : "msg question");
      if (reply) {
          para.innerHTML = msg;
      } else {
          var txt = document.createTextNode(msg);
          para.appendChild(txt);
      }

      chatDiv.appendChild(para);
      para.scrollIntoView();
    }
  }
}
</script>

<style scoped>
@import url('../../../../assets/css/bot.css');
</style>