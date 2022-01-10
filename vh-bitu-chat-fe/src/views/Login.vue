<template>
    <v-row>
        <v-col class="login-page">
            <v-container
                id="login"
                class="fill-height justify-center"
                tag="section"
            >
                <v-row justify="center">
                    <v-slide-y-transition appear>
                        <v-card
                            light
                            max-width="100%"
                            width="400"
                            class="px-5 py-3 overflow-visible"
                        >
                            <div class="d-flex justify-center mb-3 mt-3">
                                <v-img
                                    max-width="150"
                                    src="@/assets/logo.png"
                                />
                            </div>
                            <base-material-alert
                                v-if="errorMessage"
                                color="warning"
                                dark
                                class="mb-0 mt-2"
                            >
                                <span
                                    class="text-uppercase"
                                    v-text="errorMessage"
                                ></span>
                            </base-material-alert>
                            <validation-observer
                                ref="validator"
                                v-slot="{ handleSubmit }"
                            >
                                <v-card-text class="text-center">
                                    <validation-provider
                                        v-slot="{ errors }"
                                        rules="required"
                                        name="Tên đăng nhập"
                                    >
                                        <v-text-field
                                            v-model="username"
                                            color="secondary"
                                            label="Tên đăng nhập..."
                                            prepend-icon="mdi-face"
                                            placeholder="Tên đăng nhập"
                                            class="mt-2"
                                            :error-messages="errors"
                                            @keyup.enter="handleSubmit(login)"
                                            outlined
                                            :autofocus="true"
                                        />
                                    </validation-provider>
                                    <validation-provider
                                        v-slot="{ errors }"
                                        rules="required"
                                        name="Mật khẩu"
                                    >
                                        <v-text-field
                                            v-model="password"
                                            class="mb-2"
                                            color="secondary"
                                            label="Mật khẩu..."
                                            placeholder="Mật khẩu"
                                            prepend-icon="mdi-lock-outline"
                                            :error-messages="errors"
                                            outlined
                                            @keyup.enter="handleSubmit(login)"
                                            :append-icon="
                                                visibleConfirmPassword
                                                    ? 'mdi-eye'
                                                    : 'mdi-eye-off'
                                            "
                                            @click:append="
                                                () =>
                                                    (visibleConfirmPassword =
                                                        !visibleConfirmPassword)
                                            "
                                            :type="
                                                visibleConfirmPassword
                                                    ? 'password'
                                                    : 'text'
                                            "
                                        />
                                    </validation-provider>
                                    <v-btn
                                        color=""
                                        class="v-btn--text success--text"
                                        @click="handleSubmit(login)"
                                    >
                                        Đăng nhập
                                    </v-btn>
                                </v-card-text>
                            </validation-observer>
                        </v-card>
                    </v-slide-y-transition>
                </v-row>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
import _ from 'lodash';
import { authService } from '../repositories/AuthService'
import TokenService from '../repositories/TokenService'
import { socketService } from '../plugins/socket'

export default {
    name: "PagesLogin",
    $_veeValidate: {
        validator: "new",
    },
    data() {
        return {
            username: null,
            password: null,
            errorMessage: "",
            visibleConfirmPassword: true,
        };
    },
    methods: {
        async login() {
            const valid = this.$refs.validator.validate();

            if (valid) {
                // const loader = this.$loading.show();
                const response = await authService.login({
                    username: this.username,
                    password: this.password,
                });
                // loader.hide();

                if (response.error) {
                    this.errorMessage = _.get(response, "message", "");
                } else {
                    const user = _.get(response, "data.profile", {});
                    const token = _.get(
                        response,
                        "data.accessToken.token",
                        null
                    );
                    // const refreshToken = _.get(
                    //     response,
                    //     "data.refreshToken.token",
                    //     null
                    // );

                    if (!token) {
                        this.errorMessage =
                            "System error, please try again later!";
                        return false;
                    }

                    TokenService.setToken(token)
                    TokenService.updateProfileInto(user)
                    socketService.initSocket()
                    this.$router.push("/chat");
                    // this.$store.dispatch(
                    //     "SET_PERMISSION",
                    //     _.get(
                    //         response,
                    //         "data.profile.role.permissions",
                    //         []
                    //     ).map((p) => `${p.model}_${p.action}`)
                    // );
                    // this.$store.dispatch(
                    //     "SET_MANAGER",
                    //     _.get(response, "data.profile.isManager", 0)
                    // );

                    // if (!_.get(response, "data.profile.isManager", 0)) {
                    //     this.$store.dispatch("SET_MODULE", {
                    //         typeId: _.get(response, "data.profile.typeId", ""),
                    //         schoolLevelId: _.get(
                    //             response,
                    //             "data.profile.schoolLevelId",
                    //             ""
                    //         ),
                    //     });
                    //     TokenService.setModule({
                    //         typeId: _.get(response, "typeId", ""),
                    //         schoolLevelId: _.get(response, "schoolLevelId", ""),
                    //     });
                    // }
                    // let role = _.get(
                    //     response,
                    //     "data.profile.role.permissions",
                    //     []
                    // );
                    // let isDashboardRole =
                    //     role.find((item) => item.model === "dashboard") &&
                    //     _.get(response, "data.profile.isPartner", "");
                    // let isDashboardPartnerRole =
                    //     role.find(
                    //         (item) => item.model === "dashboard-partner"
                    //     ) && _.get(response, "data.profile.isPartner", "");

                    // if (isDashboardRole) {
                    //     this.$router.push("/dashboard");
                    // } else if (isDashboardPartnerRole) {
                    //     this.$router.push("/dashboard-ctv");
                    // } else {
                    //     let check = checkMobile();

                    //     if (check) {
                    //         this.$router.push("/customer-support");
                    //     } else {
                    //         // redirect to product page
                    //         const redirectPage =
                    //             this.$route.query.redirect ||
                    //             "contact/contact-list"; //'/dashboard'
                    //         this.$router.push(redirectPage);
                    //     }
                    // }
                }
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.login-page {
    background-image: url("~@/assets/clint-mckoy.jpg");
    background-repeat: no-repeat;
    background-size: auto;
}
</style>
