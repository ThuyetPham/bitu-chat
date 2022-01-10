let showMyPages, sendMessage, sendFile, regLongLiveToken;
const permissions = [ 'pages_messaging','pages_messaging_subscriptions', 'read_page_mailboxes' ];
const subscribed_fields = [ 'messages', 'feed', 'message_echoes'];
const appId = process.env.VUE_APP_FB_APP_ID;
const clientSecret = process.env.VUE_APP_FB_CLIENT_SECRET;

(function(){
    // Example
    // window.addEventListener("load",function(){
    //     document.getElementById("buttonLogin").addEventListener("click",function(e){

    //         FB.getLoginStatus(function (response) {
    //             if (response.status === 'connected') {
    //                 showMyPages();
    //             }
    //             else {
    //                 window.FB.login(function(){
    //                     showMyPages();
    //                 },{scope:permissions});
    //             }
    //         });
    //     })
    // });

    // In component must be use indow.FB.api('/me/accounts') nested in window.FB.login
    // window.FB.login(function(){
    //     fb.showMyPages();
    // },{ scope: fb.permissions });

    showMyPages = function() {
        window.FB.api('/me/accounts', (resp) => {
            console.log("pages", resp)
            for(let page of resp.data) {
                connectTo(page)
            }
        }, { scope: permissions });
    }

    const connectTo = function(page) {
        window.FB.api('/' + page.id + '/subscribed_apps', 'post', { scope: permissions, access_token: page.access_token, subscribed_fields }, (r) => {
            if(r.success) {
                console.log('subscribed', r)
            } else {
                console.log('error in subscription', r.error)
            }
        })
    }

    sendMessage = function(params) {
        const body = {
            recipient: {
                id: params.recipientId
            },
            message: {
                "text": params.content
            }
        };
        window.FB.api('/me/messages?access_token=' + params.accessToken, 'post', body, (r) => {
            if(r.message_id) {
                console.log('success', r)
            } else {
                console.log('error in subscription', r.error)
            }
        })
    }

    sendFile = function(params) {
        const body = {
            recipient: {
                id: params.recipientId
            },
            message: {
                attachment: {
                    type: params.type,
                    payload: {
                        is_reusable: true,
                        url: params.fileUrl
                    },
                },
            },
        };
        window.FB.api('/me/message_attachments?access_token=' + params.accessToken, 'post', body, (r) => {
            if(r.attachment_id) {
                console.log('success', r)
                const msgParams = {
                    recipient: {
                        id: params.recipientId
                    },
                    message: {
                        attachment: {
                            type: 'image',
                            payload: {
                                attachment_id: r.attachment_id
                            },
                        },
                    },
                };
                window.FB.api('/me/messages?access_token=' + params.accessToken, 'post', msgParams, (r) => {
                    if(r.message_id) {
                        console.log('success', r)
                    } else {
                        console.log('error in subscription', r.error)
                    }
                })
            } else {
                console.log('error in subscription', r.error)
            }
        })
    }

    regLongLiveToken = function(params) {
        window.FB.api('/oauth/access_token?grant_type=fb_exchange_token&client_id=' + appId + '&client_secret=' + clientSecret + '&fb_exchange_token=' + params.accessToken, 'get', (r) => {
            console.log(r);
        })
    }
})();

window.fbAsyncInit = function() {
    window.FB.init({
        appId            : appId,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v12.0'
    });
};

const fb = {
    showMyPages,
    sendMessage,
    sendFile,
    regLongLiveToken,
    permissions,
}

export default fb;