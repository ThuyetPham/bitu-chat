<template>
    <v-row>
        <v-col>
            <v-btn color="primary" elevation="2" @click="clickMe">Connect to FB</v-btn>
            <br>
            <v-col
            cols="12"
            sm="6"
            md="3"
            >
            <v-text-field
                label="Regular"
                v-model="msg"
            ></v-text-field>
            </v-col>
            <br>
            <v-btn color="primary" elevation="2" @click="sendMessage">Send message</v-btn>
            <br>
            <h2>Send file</h2>
            <v-file-input accept="image/*" 
                label="Select files"
                prepend-icon="photo"
                chips color="pink"
                v-model="file"></v-file-input>
            <br>
            <v-btn color="primary" elevation="2" @click="sendFile">Send file</v-btn>
            <br>
            <br>
            <v-btn color="primary" elevation="2" @click="regLongLiveToken">Set long live access token</v-btn>
        </v-col>
    </v-row>
</template>

<script>
import fb from '../../plugins/fb-app'

export default {
    name: "send-message-fb",
    data: () => ({
        msg: 'Wasabi is good',
        files: null,
        readers: [],
        file: null,
        recipientId: '',
        accessToken: ""
    }),
    components: {},
    props: {
    },
    created() {
    },
    methods: {
        clickMe() {
            window.FB.login(function(){
                fb.showMyPages();
            },{ scope: fb.permissions });
        },
        sendMessage() {
            const params = {
                recipientId: this.recipientId,
                accessToken: this.accessToken,
                content: this.msg,
            };
            fb.sendMessage(params);
        },
        sendFile() {
            const params = {
                recipientId: this.recipientId,
                accessToken: this.accessToken,
                fileUrl: 'https://dphw5vqyyotoi.cloudfront.net/upload/5c209fe6176b0/2021/12/03/c9c1_photo_2021-12-03_11-01-00.jpg',
                type: 'image',
            };
            fb.sendFile(params);
        },
        regLongLiveToken() {
            const params = {
                accessToken: this.accessToken,
            };
            fb.regLongLiveToken(params);
        },
    },
};
</script>
