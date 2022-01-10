<template>
  <v-app id="inspire">
    <!-- <SystemBar /> -->

    <AppBar />

    <NavigationDrawlerLeft :users="users" />

    <NavigationDrawlerRight v-if="selectedUser" />

    <Main :user="selectedUser" :messages="messages" />

    <Footer :user="selectedUser" :page="page" v-if="selectedUser" />
    <TestPage />
  </v-app>
</template>

<script>
// import SystemBar from './Authchat/SystemBar.vue';
import AppBar from "../baseComponents/AppBar.vue";
import NavigationDrawlerLeft from "../components/Authchat/NavigationDrawlerLeft.vue";
import NavigationDrawlerRight from "../components/Authchat/NavigationDrawlerRight.vue";
import Main from "../components/Authchat/Main.vue";
import Footer from "../components/Authchat/Footer.vue";
import TestPage from "../components/TestPage.vue";
import { chatService } from "../repositories/ChatService";
import eventBus from "../plugins/eventBus";
// import moment from "moment"
// import Menu from './Authchat/Menu.vue';

export default {
  name: "chat",
  data: () => ({
    drawer: null,
    msg: "some text here",
    users: [],
    selectedUser: null,
    messages: [],
    page: {},
  }),
  components: {
    // SystemBar,
    AppBar,
    NavigationDrawlerLeft,
    NavigationDrawlerRight,
    Main,
    Footer,
    TestPage,
    // Menu,
  },
  created() {
    this.getConversationCreatd();
    // let params = {
    //   start_date: "2022-01-02 10:00:00",
    //   end_date: "2022-01-10 00:00:00",
    // };
    // Get chatData
    // chatService
    //   .getConversation(params)
    //   .then((res) => {
    //     this.users = res.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // Listen event when pickUser on left sidebar
    eventBus.$on("pick-user", (user) => {
      this.getConvMessage(user._id);
      // let id = user._id;
      // let params = {
      //   limit: 20,
      // };

      // chatService
      //   .getConvMessage(id, params)
      //   .then((res) => {
      //     this.selectedUser = res.data.customer;
      //     this.messages = res.data.messages;
      //     this.page = res.data.page;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    });
  },
  sockets: {
    connect: function () {
      console.log("socket connected: pặc pặc");
    },
    new_conversation: function (data) {
      console.log("Có tin nhắn này: ", data);
    },
    update_conversation: function (data) {
      console.log("Update_conversation: ", data);
      this.getConversationCreatd();
      this.getConvMessage(data.id);
    },
    new_conversation_detail: function (data) {
      console.log("Cái này là gì: ", data);
    },
  },
  methods: {
    getConversationCreatd() {
      let params = {
        start_date: "2022-01-02 10:00:00",
        end_date: "2022-01-11 00:00:00",
      };
      // Get chatData
      chatService
        .getConversation(params)
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getConvMessage(id) {
      let params = {
        limit: 100,
      };

      chatService
        .getConvMessage(id, params)
        .then((res) => {
          this.selectedUser = res.data.customer;
          this.messages = res.data.messages;
          this.page = res.data.page;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getConversationNew() {},
    // getMessage(user) {
    //   console.log(user, "HEEEEEEEEEE");
    //   this.selectedUser = user;
    //   chatService.getListMessage(user.id).then((res) => {
    //     this.messages = res.list;
    //   });
    // },
  },
  beforeDestroy() {
    // removing eventBus listener
    eventBus.$off("pick-user");
  },
};
</script>
