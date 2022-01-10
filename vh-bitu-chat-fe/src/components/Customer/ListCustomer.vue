<template>
  <div>
    <span class="quantily-customer"
      >Tìm thấy
      <span style="font-weight: 700">{{ desserts.length }}</span> khách
      hàng</span
    >
    <v-simple-table fixed-header height="calc(100vh - 276px)">
      <template v-slot:default>
        <thead>
          <tr class="thead-customer" style="height: 54px">
            <th class="text-left" style="align-items: center; height: 54px">
              <v-checkbox v-model="selectAll" class="mr-9"></v-checkbox>

              <span style="position: absolute; top: 22px; left: 84px">
                Khách hàng</span
              >
            </th>
            <th class="text-left">Điện thoại</th>
            <th class="text-left">Nhãn</th>
            <th class="text-left">Fanpage</th>
            <th class="text-left">Nhân viên</th>
            <th class="text-left">Fapage Scope ID</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style="height: 54px"
            v-for="(item, index) in desserts"
            :key="item.id"
          >
            <td style="display: flex; align-items: center; height: 54px">
              <v-checkbox
                v-model="selected"
                :value="item.id"
                number
                class="mr-6"
              ></v-checkbox>
              <v-avatar width="30" height="30">
                <img :src="item.img"
              /></v-avatar>
              {{ index + 1 + ".  " }}
              {{ item.name }}
            </td>
            <td>{{ item.phone }}</td>
            <td>
              <div class="label-customer">{{ item.label }}</div>
            </td>
            <td>{{ item.fanpage }}</td>
            <td>{{ item.staff }}</td>
            <td>{{ item.scopeID }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: [],
      desserts: [
        {
          img: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          name: "Eduardo Cooper",
          phone: "0945.818.839",
          label: "Khách hàng",
          fanpage: "Fp 1",
          staff: "CTV1",
          scopeID: "12893198",
          id: 1,
        },
        {
          img: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          name: "Eduardo Cooper",
          phone: "0945.818.839",
          label: "Khách hàng",
          fanpage: "Fp 1",
          staff: "CTV1",
          scopeID: "12893198",
          id: 2,
        },
        {
          img: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          name: "Eduardo Cooper",
          phone: "0945.818.839",
          label: "Khách hàng",
          fanpage: "Fp 1",
          staff: "CTV1",
          scopeID: "12893198",
          id: 3,
        },
        {
          img: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          name: "Eduardo Cooper",
          phone: "0945.818.839",
          label: "Khách hàng",
          fanpage: "Fp 1",
          staff: "CTV1",
          scopeID: "12893198",
          id: 4,
        },
        {
          img: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          name: "Eduardo Cooper",
          phone: "0945.818.839",
          label: "Khách hàng",
          fanpage: "Fp 1",
          staff: "CTV1",
          scopeID: "12893198",
          id: 5,
        },
        {
          img: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          name: "Eduardo Cooper",
          phone: "0945.818.839",
          label: "Khách hàng",
          fanpage: "Fp 1",
          staff: "CTV1",
          scopeID: "12893198",
          id: 6,
        },
        {
          img: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          name: "Eduardo Cooper",
          phone: "0945.818.839",
          label: "Khách hàng",
          fanpage: "Fp 1",
          staff: "CTV1",
          scopeID: "12893198",
          id: 7,
        },
        {
          img: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          name: "Eduardo Cooper",
          phone: "0945.818.839",
          label: "Khách hàng",
          fanpage: "Fp 1",
          staff: "CTV1",
          scopeID: "12893198",
          id: 8,
        },
      ],
    };
  },

  computed: {
    selectAll: {
      get: function () {
        return this.desserts
          ? this.selected.length == this.desserts.length
          : false;
      },
      set: function (value) {
        var selected = [];

        if (value) {
          this.desserts.map(function (user) {
            selected.push(user.id);
          });
        }

        this.selected = selected;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.quantily-customer {
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 36px;
}
.thead-customer th {
  background: #fafafa !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #262626 !important;
}
.label-customer {
  font-size: 10px;
  width: 61px;
  background: #fd7c23;
  text-transform: uppercase;
  height: 16px;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 4px;
  padding: 1px 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
