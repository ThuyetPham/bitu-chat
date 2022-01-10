<template>
  <v-footer
    id="footer-main"
    app
    color="transparent"
    inset
    style="display: block"
  >
    <div class="label-footer" style="display: none">
      <ul>
        <li v-for="i in labelsOne" :key="i.id">
          <input
            type="checkbox"
            name=""
            :id="`a+${i.id}`"
            :value="i.id"
            v-model="selected"
            style="display: none"
          />
          <label
            :style="{
              background: i.color,
            }"
            :for="`a+${i.id}`"
          >
            <div
              class="label-title"
              :style="{
                background: i.color,
              }"
            >
              {{ i.title }}
            </div>
          </label>
        </li>
      </ul>
      <ul>
        <li v-for="i in labelsTwo" :key="i.id">
          <input
            type="checkbox"
            name=""
            :id="`b+${i.id}`"
            :value="i.id"
            v-model="selected"
            style="display: none"
          />
          <label
            :style="{
              background: i.color,
            }"
            :for="`b+${i.id}`"
          >
            <div
              class="label-title"
              :style="{
                background: i.color,
              }"
            >
              {{ i.title }}
            </div>
          </label>
        </li>
      </ul>
    </div>
    <div class="img-footer px-2" flat color="#F6F6F6" style="display: flex" v-show="valueImg" >
      <div class="img-item-footer" v-for="(i, index) in data" :key="index">
        <v-img width="50" height="50" class="rounded-lg" :src="i.img"> </v-img>
        <v-icon @click="deleteImg" x-small color="black">mdi-close-circle</v-icon>
      </div>
    </div>
    <form action="" @submit.prevent="sendMessage">
      <div flat color="#F6F6F6" class="px-3">
        <v-text-field
          v-model="msg"
          label="Nhập nội dung tin nhắn"
          flat
          outlined
          height="50"
          dense
          solo
        ></v-text-field>
      </div>
      <div flat color="#F6F6F6" class="px-3">
        <v-list-item class="px-0">
          <v-list-item-subtitle style="color: #219653"
            >Đã gửi tin nhắn thành công</v-list-item-subtitle
          >

          <v-spacer></v-spacer>

          <v-file-input
          
          v-model="valueImg"
            hide-input
            prepend-icon="mdi-image-outline"
          >
          </v-file-input>

          <v-icon class="mx-1">mdi-comment-text-outline</v-icon>
          <v-btn icon type="submit">
            <v-icon class="ml-2" color="#009FE0">mdi-send</v-icon>
          </v-btn>
        </v-list-item>
      </div>
    </form>
  </v-footer>
</template>

<script>
import fb from "../../plugins/fb-app";
import eventBus from "../../plugins/eventBus";
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    page: {
      type: Object,
      default: () => {},
    },
  },
  name: "vh-footer",
  data: () => ({
    valueImg: null,
    selected: [],
    msg: "",
    data: [
      {
        img: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      },
    ],

    labelsOne: [
      {
        id: 1,
        title: "Tiềm năng",
        color: "#FE7D20",
      },
      {
        id: 2,
        title: "CHAT LẠI",
        color: "#0D8786",
      },
      {
        id: 3,
        title: "TỰ HỌC",
        color: "#42F444",
      },
      {
        id: 4,
        title: "CHĂM LẠI",
        color: "#2AA7F1",
      },
      {
        id: 5,
        title: "Tiềm năng",
        color: "#F42CA1",
      },
      {
        id: 6,
        title: "Tiềm năng",
        color: "#FE7D20",
      },
      {
        id: 7,
        title: "Tiềm năng",
        color: "#6179B7",
      },
      {
        id: 8,
        title: "Tiềm năng",
        color: "#FE7D20",
      },
      {
        id: 9,
        title: "Tiềm năng",
        color: "#FE7D20",
      },
      {
        id: 10,
        title: "CHAT LẠI",
        color: "#0D8786",
      },
      {
        id: 11,
        title: "TỰ HỌC",
        color: "#42F444",
      },
      {
        id: 12,
        title: "CHĂM LẠI",
        color: "#2AA7F1",
      },
      {
        id: 13,
        title: "Tiềm năng",
        color: "#F42CA1",
      },
    ],
    labelsTwo: [
      {
        id: 14,
        title: "CHĂM LẠI",
        color: "#2AA7F1",
      },
      {
        id: 15,
        title: "Tiềm năng",
        color: "#F42CA1",
      },
      {
        id: 16,
        title: "Tiềm năng",
        color: "#FE7D20",
      },
      {
        id: 17,
        title: "Tiềm năng",
        color: "#6179B7",
      },
      {
        id: 18,
        title: "Tiềm năng",
        color: "#FE7D20",
      },
      {
        id: 19,
        title: "Tiềm năng",
        color: "#FE7D20",
      },
      {
        id: 20,
        title: "CHAT LẠI",
        color: "#0D8786",
      },
      {
        id: 21,
        title: "TỰ HỌC",
        color: "#42F444",
      },
      {
        id: 22,
        title: "CHĂM LẠI",
        color: "#2AA7F1",
      },
      {
        id: 23,
        title: "Tiềm năng",
        color: "#F42CA1",
      },
    ],
  }),
  
  watch: {
    valueImg: {
      handler: (val) => {
        eventBus.$emit("file-img", val)
      },
      deep: true
    }
  },

  methods: {
    chooseLabel(id) {
      console.log(id, "ID");
    },

    sendMessage() {
      const params = {
        recipientId: this.user.psid,
        accessToken: this.page.page_token,
        content: this.msg,
      };
      try {
         fb.sendMessage(params);
         this.msg = ''
         
      } catch (error) {
        console.log(error)
      }
     

    },

    deleteImg() {
      this.valueImg = null
    }
  },
};
</script>
<style lang="scss">
#footer-main {
  background: #F6F6F6 !important;
  .v-text-field {
    padding-top: 0px !important;
    margin-top: 0px !important;
  }
  padding: 0px !important;
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    padding-top: 0px;
    margin-bottom: 8px;
    display: none;
  }
}
</style>
<style lang="scss" scoped>
#footer-main {
  .label-footer {
    overflow: auto;
    /* width */
    &::-webkit-scrollbar {
      width: 10px;
      height: 3px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    ul {
      list-style: none;
      display: -webkit-box;
      padding-left: 0px !important;
      li {
        font-size: 11px;
        text-align: center;
        color: white;
        cursor: pointer;
        .label-title {
          height: 20px;
          width: 95px;
          opacity: 0.3;
          text-transform: uppercase;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-top: 4px;
        }

        input:checked + label {
          .label-title {
            height: 20px;
            width: 95px;
            opacity: 1 !important;
          }
        }
      }
    }
  }
  .img-footer {
    padding-bottom: 2px;
    overflow: auto;
    margin-bottom: 4px;
    /* width */
    &::-webkit-scrollbar {
      width: 10px;
      height: 3px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    .img-item-footer {
      position: relative;
      margin: 15px 0px 0px 6px;
      .v-icon {
        position: absolute;
        right: -6px;
        top: -5px;
        cursor: pointer;
      }
    }
  }
}
</style>
