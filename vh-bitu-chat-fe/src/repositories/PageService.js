import ApiService from './ApiService';
// import Repository from './Repository'

class PageService extends ApiService {
    resource = '/page';

    getListPages() {
        // const resource = `${Repository.defaults.apiURL}`;
        // return Repository.get(`${resource}${this.resource}/list`)
        const params = {}
        return this.get(`${this.resource}/list`, params);
    }

    syncFbPage(params) {
        // const params = {
        //     pages:[
        //         {
        //             page_id: 777777,
        //             name: "Ten cua page 777777",
        //             page_token: "abc_token_moi_2",
        //             avatar: "http://homnaylathu6.com",
        //             labels:["61ceca595598dfbec927b56b"],
        //             url:"abc.com",
        //             desc:"Mo ta",
        //             assigns:[
        //                 {
        //                     e_id: 1111,
        //                     e_name:"CS Name",
        //                     e_avatar:"avatar.com"
        //                 }
        //             ],
        //             type_id:1,
        //             type_name:"Type Name",
        //             school_level_id:2,
        //             school_level_name:"school_level_name",
        //             product_group_id:1,
        //             product_group_name:"product_group_name",
        //             enable_webhook:1,
        //             enable_hide_comment: 1
        //         }
        //     ]
        // }
        return this.post(`${this.resource}/sync`, params);
    }
}

const pageService = new PageService;
export { pageService };
export default PageService;
