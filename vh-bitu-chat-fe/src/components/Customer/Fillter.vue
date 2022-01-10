<template>
  <div class="fillter">
    <v-text-field
      label="Tìm tên, số điện thoại"
      outlined
      solo
      flat
      dense
    ></v-text-field>
    <v-select
      label="Nhóm sản phẩm"
      outlined
      solo
      flat
      dense
      append-icon="mdi-chevron-down"
      :menu-props="{ bottom: true, offsetY: true }"
    ></v-select>
    <v-select
      label="Lọc theo nhãn"
      outlined
      solo
      flat
      dense
      append-icon="mdi-chevron-down"
      :menu-props="{ bottom: true, offsetY: true }"
    ></v-select>
    <v-select
      label="Lọc theo Fanpage"
      outlined
      solo
      flat
      dense
      append-icon="mdi-chevron-down"
      :menu-props="{ bottom: true, offsetY: true }"
    ></v-select>
    <div id="date-customer">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateRangeText"
            label="Ngày bắt đầu ~ Ngày kết thúc"
            readonly
            v-bind="attrs"
            v-on="on"
            outlined
            solo
            flat
            dense
          ></v-text-field>
        </template>

        <v-date-picker v-model="dates" range no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </div>
    <v-btn color="#009FE0" class="white--text ml-3" style="margin-top:2px">Tìm kiếm</v-btn>
  </div>
</template>
<script>
export default {
  data: () => ({
    dates: [],
    menu: false
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>
<style lang="scss" scoped>
.fillter {
  display: flex;
  width: 1092px;
}
</style>
<style lang="scss">
.fillter {
  label.v-label.theme--light {
    font-size: 14px !important;
  }
  .v-input__slot {
    width: 175px;
  }
  #date-customer {
    .v-input__slot {
      width: 250px;
    }
  }
}
</style>
