<template>
  <v-main>
    <div class="sync-page pa-8">
      <h2>Quản lý fanpage</h2>
      <v-spacer></v-spacer>
      <v-btn class="blue--text" outlined @click="getPageFormFB">
        <v-icon color="#009FE0">mdi-autorenew</v-icon> Đồng bộ fanpage và lấy
        token</v-btn
      >
    </div>
    <div class="fillter-fanpage px-8">
      <div style="width: 318px">
        <label for="">Tìm kiếm theo tên fanpage</label>
        <v-text-field
          label="Nhập tên Fanpage tại đây"
          prepend-inner-icon="mdi-magnify"
          dense
          outlined
          solo
          flat
        ></v-text-field>
      </div>
      <div style="width: 318px" class="px-8">
        <label for="">Nhân viên</label>
        <v-select
          dense
          outlined
          solo
          flat
          label="--Tên nhân viên--"
          append-icon="mdi-chevron-down"
          :menu-props="{ bottom: true, offsetY: true }"
        ></v-select>
      </div>
      <v-btn
        depressed
        class="white--text mt-6"
        height="40"
        color="#1890FF"
        width="167"
        >Lọc</v-btn
      >
    </div>
    <div class="info-fanpage px-8 mt-2">
      <v-card
        width="346"
        class="mr-5 px-5 pb-4"
        v-for="(item, index) in data"
        :key="index"
      >
        <v-app-bar
          color="white"
          height="82"
          style="box-shadow: none !important"
        >
          <template>
            <v-list-item-avatar size="50" >
              <v-img  :alt="`${item.desc} avatar`" :src=" item.img ? item.img : imgGroup"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="blue--text"
                >{{ item.name }}
              </v-list-item-title>
              <v-list-item-subtitle
                class="blue--text mt-1"
                style="font-size: 12px"
              >
                <v-icon color="blue">mdi-facebook</v-icon
                >/{{ item.url }}</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text
                v-text="item.action"
              ></v-list-item-action-text>
            </v-list-item-action>
          </template>

          <v-switch dense inset></v-switch>
        </v-app-bar>
        <v-divider></v-divider>
        <v-list-item-subtitle
          class="mt-3"
          style="font-size: 14px; color: #6b778c"
        >
          Có 0/{{ item.assigns.length }} tư vấn viên đang nhận xử
          lý</v-list-item-subtitle
        >
        <div style="display: flex" class="mt-2 mb-6">
          <div v-for="(i, index) in item.assigns" :key="index">
            <v-avatar color="gray" class="mr-5" size="35" v-if="index < 4">
              <v-img :src="i.img ? i.img : imgUser"></v-img
            ></v-avatar>
          </div>

          <v-avatar
            class="mr-5"
            size="35"
            v-if="item.assigns.length >= 4"
            color="#009FE0"
          >
            <span style="color: white; font-size: 14px"
              >+{{ item.assigns.length - 4 }}</span
            ></v-avatar
          >
          <v-avatar size="35" color="#F5F9FA">
            <v-icon color="#009FE0" small>mdi-plus</v-icon></v-avatar
          >
        </div>
        <div class="info-class-item" style="display: flex">
          <v-select
            class="pr-1"
            label="Loại hình"
            clearable
            :items="items"
            item-text="name"
            item-value="id"
            dense
            solo
            outlined
            flat
            id="request"
            append-icon="mdi-chevron-down"
            :menu-props="{ bottom: true, offsetY: true }"
          ></v-select>
          <v-select
            class="pl-1"
            solo
            label="Nhóm ngành"
            clearable
            :items="items"
            item-text="name"
            item-value="id"
            dense
            outlined
            flat
            id="request"
            append-icon="mdi-chevron-down"
            :menu-props="{ bottom: true, offsetY: true }"
          ></v-select>
        </div>
        <div class="info-class-item">
          <v-select
            solo
            label="Nhóm sản phẩm*"
            clearable
            :items="items"
            item-text="name"
            item-value="id"
            dense
            outlined
            flat
            id="request"
            append-icon="mdi-chevron-down"
            :menu-props="{ bottom: true, offsetY: true }"
          ></v-select>
        </div>
        <div style="font-size: 14px">
          <span v-if="item.is_synced === 0"
            >Lấy dữ liệu cũ
            <v-btn outlined small class="blue--text ml-1">Run</v-btn></span
          >
          <span style="color: green" v-if="item.is_synced === 1"
            >Đã lấy dữ liệu trong 30 ngày</span
          >
        </div>
      </v-card>
    </div>
  </v-main>
</template>
<script>
const permissions = [
  "pages_messaging",
  "pages_messaging_subscriptions",
  "read_page_mailboxes",
];
const appId = process.env.VUE_APP_FB_APP_ID;
const clientSecret = process.env.VUE_APP_FB_CLIENT_SECRET;
const subscribed_fields = [ 'messages', 'feed', 'message_echoes'];
import { pageService } from "../../repositories/PageService.js";
export default {
  data() {
    return {
      imgGroup: 'https://developer.jboss.org/images/jive-sgroup-default-portrait-large.png',
      imgUser: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4MJsV58xh-vFYz3u4WMpS65vCvnGwBYc54SfmKToORTHdZALkZNGvpBlt4dc45A0M-y0&usqp=CAU',
      items: [],

      data: [],
    };
  },

  async created() {
    const res = await pageService.getListPages();
    this.data = res.data
  },

  methods: {
    regLongLiveToken(params) {
      return new Promise((resolve, reject) => {
        try {
          window.FB.api(
            "/oauth/access_token?grant_type=fb_exchange_token&client_id=" +
              appId +
              "&client_secret=" +
              clientSecret +
              "&fb_exchange_token=" +
              params.accessToken,
            "get",
            (r) => {
              resolve(r.access_token);
            }
          );
        } catch (error) {
          reject(error);
        }
      });
    },
    connectTo(page) {
      window.FB.api(
        "/" + page.id + "/subscribed_apps",
        "post",
        {
          scope: permissions,
          access_token: page.access_token,
          subscribed_fields,
        },
        (r) => {
          if (r.success) {
            console.log("subscribed", r);
          } else {
            console.log("error in subscription", r.error);
          }
        }
      );
    },
    getPageFormFB() {
      window.FB.login(
        () => {
          window.FB.api(
            "/me/accounts?fields=picture{url},about,id,general_manager,general_info,founded,genre,page_token,access_token,privacy_info_url,name&limit=10",
            async (resp) => {
              console.log("pages", resp);
              let pages = [];
              for (let page of resp.data) {
                let page_token = await this.regLongLiveToken({
                  accessToken: page.access_token,
                });
                pages.push({
                  page_id: page.id,
                  name: page.name,
                  page_token,
                  url: page.page_token,
                });
                this.connectTo(page);
              }
              await pageService.syncFbPage({ pages });
              const res = await pageService.getListPages();
              if (res.success) {
                console.log(res, "RESSSSSSSSS1");
                // this.data = res.data
              }
            },
            { scope: permissions }
          );
        },
        { scope: permissions }
      );
    },
  },
};
</script>
<style lang="scss">
.sync-page {
  display: flex;
  h2 {
    font-size: 24px;
    color: #6b778c;
    font-weight: 400;
  }
  span.v-btn__content {
    font-size: 14px;
    font-weight: 400;
    text-transform: none;
  }
  button.blue--text.v-btn.v-btn--outlined.theme--light.v-size--default {
    background: white;
  }
}
.fillter-fanpage {
  display: flex;
  label {
    font-size: 14px;
    color: #172b4d;
  }
}
.info-fanpage {
  display: flex;
  .v-toolbar__content {
    padding: 0px 0px !important;
  }
}
</style>
