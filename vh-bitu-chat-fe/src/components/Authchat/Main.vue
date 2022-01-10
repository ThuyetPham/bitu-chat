<template>
  <v-main id="main-box" v-if="user" class="overflow-hidden">
      <v-app-bar
        color="white"
        height="100"
        style="box-shadow: 0px 4px 6px 0px #0000000f !important"
      >
        <v-list-item>
          <template>
            <v-list-item-avatar width="60" height="60">
              <v-img
                width="60"
                :alt="`${user.name} avatar`"
                :src="user.avatar_url"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                >{{ user.name }}
                <v-icon
                  v-if="user.phones.length > 0"
                  small
                  class="pl-2"
                  color="green lighten-1"
                  >mdi-phone</v-icon
                >
                <span
                  v-if="user.phones.length > 0"
                  style="color: Blue; font-size: 13px"
                >
                  {{ user.phone }}
                </span></v-list-item-title
              >
              <v-list-item-subtitle
                v-if="user.e_id"
                style="font-size: 12px"
                class="mt-1"
              >
                Được xem bởi {{ user.e_name }} vào lúc
                {{ user.first_read }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-btn icon>
          <v-icon color="blue">mdi-facebook</v-icon>
        </v-btn>
      </v-app-bar>
      <v-sheet class="chat-main" :class="active ? 'activeHeight' : ''">
        <div>
          <v-app-bar
            v-for="(message, index) in messages"
            :key="index"
            color="rgba(0,0,0,0)"
            flat
          >
            <v-spacer v-if="message.message.is_echo"></v-spacer>
            <v-avatar
              v-if="!message.message.is_echo"
              class="mt-n5 ml-2"
              size="30"
              elevation="10"
            >
              <img :alt="`${user.name} avatar`" :src="user.avatar_url" />
            </v-avatar>
            <v-card
              max-width="350px"
              :color="message.message.is_echo ? '#172B4D' : '#FFFFFF'"
              dark
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div
                    style="font-size: 13px"
                    :style="{
                      color: message.message.is_echo ? '#ffffff' : '#172B4D',
                    }"
                  >
                    {{ message.message.text }}
                  </div>
                  <!-- <v-list-item-subtitle
                    >{{message.message.ts}}
                    <span class="ml-16">Seen 1:03PM</span></v-list-item-subtitle
                  > -->
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-avatar
              v-if="message.message.is_echo"
              class="mt-n5"
              size="30"
              elevation="10"
            >
              <img :src="imgDefault" />
            </v-avatar>
          </v-app-bar>
        </div>
      </v-sheet>
  </v-main>
</template>

<script>
import eventBus from "../../plugins/eventBus";
export default {
  name: "vh-main",
  data: () => ({
    active: false,
    imgDefault:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4MJsV58xh-vFYz3u4WMpS65vCvnGwBYc54SfmKToORTHdZALkZNGvpBlt4dc45A0M-y0&usqp=CAU",
  }),

  components: {},
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    messages: {
      type: Array,
      default: () => [],
    },
  },

  created() {
    eventBus.$on("file-img", (val) => {
      if (val == null) {
        this.active = false;
      } else {
        this.active = true;
      }
    });
  },
};
</script>
<style lang="scss">
#main-box {
  .v-list-item--three-line {
    min-height: 0px !important;
  }
  .v-sheet:not(.v-sheet--outlined) {
    box-shadow: none !important;
  }
  .v-text-field__details {
    display: none;
  }
  .chat-main {
    overflow-y: auto;
    max-height: calc(100vh - 310px);

    &.activeHeight {
      max-height: calc(100vh - 388px);
    }
    //  max-height: calc(100vh);
    background: #fff8f3;
    &::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      box-shadow: 0px 4px 4px 0px #00000029 inset;
      border-radius: 4px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #a0a0a0;
      border-radius: 10px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #bebebe;
    }
  }
}
</style>
