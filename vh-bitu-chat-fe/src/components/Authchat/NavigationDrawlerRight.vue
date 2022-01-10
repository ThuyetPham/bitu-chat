<template>
  <v-navigation-drawer
    app
    clipped
    right
    width="303"
    class="customer-information"
  >
    <b class="register-information">THÔNG TIN KHÁCH HÀNG</b>
    <v-divider
      style="background: #55a6dc; border-width: revert"
      height="20"
      class="color: #55A6DC"
    ></v-divider>
    <validation-observer ref="validator" v-slot="{ handleSubmit }">
      <form class="info-class px-3">
        <div class="info-class-item">
          <validation-provider
            v-slot="{ errors }"
            class="mb-2"
            rules="required"
            name="Họ tên"
          >
            <v-text-field
              label="Họ & Tên*"
              :error-messages="errors"
              type="text"
              v-model="infoCustomer.name"
              maxlength="155"
              dense
              outlined
              solo
              flat
              clearable
            />
          </validation-provider>
        </div>
        <div class="info-class-item">
          <validation-provider
            v-slot="{ errors }"
            class="mb-2"
            rules="required"
            name="Số điện thoại"
          >
            <v-text-field
              label="Số điện thoại*"
              :error-messages="errors"
              type="text"
              v-model="infoCustomer.phone"
              dense
              outlined
              solo
              flat
              clearable
            />
          </validation-provider>
        </div>
        <div class="info-class-item">
          <v-text-field
            label="Năm sinh con"
            type="text"
            v-model="infoCustomer.birthyear"
            dense
            outlined
            solo
            flat
            clearable
          />
        </div>
        <div class="info-class-item" style="display: flex">
          <v-select
            class="pr-1"
            label="Loại hình"
            clearable
            :items="items"
            item-text="name"
            item-value="id"
            v-model="infoCustomer.type"
            dense
            solo
            outlined
            flat
            id="request"
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
            v-model="infoCustomer.industry"
            dense
            outlined
            flat
            id="request"
            :menu-props="{ bottom: true, offsetY: true }"
          ></v-select>
        </div>
        <div class="info-class-item">
          <validation-provider
            v-slot="{ errors }"
            class="mb-2"
            rules="required"
            name="Nhóm sản phẩm"
          >
            <v-select
              solo
              :error-messages="errors"
              label="Nhóm sản phẩm*"
              clearable
              :items="items"
              item-text="name"
              item-value="id"
              v-model="infoCustomer.product"
              dense
              outlined
              flat
              id="request"
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-select>
          </validation-provider>
        </div>
        <div class="info-class-item">
          <v-select
            solo
            label="Môn học"
            clearable
            :items="items"
            item-text="name"
            item-value="id"
            v-model="infoCustomer.subjects"
            dense
            outlined
            flat
            id="request"
            :menu-props="{ bottom: true, offsetY: true }"
          ></v-select>
        </div>
        <div class="info-class-item content">
          <v-textarea
            label="Ghi chú"
            name=""
            id="lessoncontent"
            placeholder="Nội dung"
            v-model="infoCustomer.note"
            outlined
            flat
            clearable
            height="84"
          ></v-textarea>
        </div>
        <div class="button">
          <v-btn
            class="button-save save white--text"
            color="#FF6609"
            block
            @click.prevent="handleSubmit(updateCustomerInformation)"
            >CẬP NHẬT</v-btn
          >
        </div>
      </form>
    </validation-observer>
    <div class="history-update">
      <p>Lịch sử</p>

      <table class="info-history-update">
        <tr>
          <td>Ngày cập nhật:</td>
          <td style="color: black; font-weight: 700">20:00 12/12/2021</td>
        </tr>
        <tr>
          <td>Tên:</td>
          <td>Vso 29</td>
        </tr>
        <tr>
          <td>SĐT:</td>
          <td>0945.818.839</td>
        </tr>
        <tr>
          <td>Năm sinh con:</td>
          <td style="color: red">2003</td>
        </tr>
        <tr>
          <td>Nhóm sản phẩm:</td>
          <td>Toán 3 (tự học)</td>
        </tr>
        <tr>
          <td>Môn học:</td>
          <td>Toán</td>
        </tr>
      </table>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "vh-navigation-drawler-right",
  data: () => ({
    drawer: null,
    infoCustomer: {
      name: "",
      phone: "",
      birthyear: "",
      type: "",
      industry: "",
      product: "",
      subjects: "",
      note: "",
    },

    items: [
      {
        name: 'test01',
        id: 1
      },
      {
        name: 'test02',
        id: 2
      },
    ]
  }),

  created() {
    this.getUpdateCustomer(), this.getRegisterInformation();
  },

  methods: {
    getUpdateCustomer() {},
    getRegisterInformation() {},
    updateCustomerInformation() {},
  },
};
</script>
<style lang="scss" scoped>
.customer-information {
  .info-class {
    margin-top: 20px;
    .info-class-item {
      margin-top: -5px !important;
    }
  }

  .history-update {
    padding: 12px;
    p {
      font-size: 12px;
      color: #6b778c;
      justify-content: center;
      text-align: center;
    }
    .info-history-update {
      text-align: left;
      font-size: 12px;
      color: #6b778c;
      justify-content: space-around;
      width: 100%;
    }
  }
}
</style>
<style lang="scss">
.customer-information {
  .register-information {
    color: #172b4d;
    line-height: 48px;
    padding-left: 12px;
  }
  label.v-label.theme--light {
    font-size: 14px;
  }
}
</style>
