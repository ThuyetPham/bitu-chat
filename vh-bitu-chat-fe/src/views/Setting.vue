<template>
  <v-app id="inspire">
    <!-- <SystemBar /> -->

    <AppBar />
    
    <SideBar />

    <PageManagement />
  </v-app>
</template>

<script>
import AppBar from "../baseComponents/AppBar.vue";
import SideBar from "../components/SettingChat/SideBar.vue";
import PageManagement from "../components/SettingChat/PageManagement.vue";
// import LabelManagement from "../components/SettingChat/LabelManagement.vue"
// import OtherSettings from "../components/SettingChat/OtherSettings.vue"

export default {
  name: "chat",
  data: () => ({}),
  components: {
    AppBar,
    SideBar,
    PageManagement,
    // LabelManagement,
    // OtherSettings
  },
};
</script>
<style lang="scss" scoped>
#inspire {
  background: #f9fafc;
  .customer {
    background: #ffffff;
    padding: 24px;
    margin: 30px;
    margin-top: 96px;
    border-radius: 10px;
  }
}
</style>
