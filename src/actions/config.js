
if(process.env.NODE_ENV =='development'){
    module.exports = {
        imgUrl:'http://jianai.sagacityidea.cn/',                  //正式
        urlNoApi:"http://jianai.sagacityidea.cn/gene-api/",      //正式
        url:'http://jianai.sagacityidea.cn/gene-api/api',        //正式
        // imgUrl:'http://jiyin-test.sagacityidea.cn/',                //测试
        // urlNoApi:"http://jiyin-test.sagacityidea.cn/gene-api/",     //测试
        // url:'http://jiyin-test.sagacityidea.cn/gene-api/api',       //测试
        // imgUrl:'http://gene.wisdomcare.com.cn/',
        // urlNoApi:"http://gene.wisdomcare.com.cn/gene-api/",
        // url:'http://gene.wisdomcare.com.cn/gene-api/api',
        //appId:'wx786fe6708aaf5cb1',  //测试
        appId:'wxc772f9ac9691f3c1' ,  //正式
        // mchId:'1367240802',//商户id
        //reUrl:'https%3a%2f%2fopen.weixin.qq.com%2fconnect%2foauth2%2fauthorize%3fappid%3dwxc772f9ac9691f3c1%26redirect_uri%3dhttp%3a%2f%2fjianai.sagacityidea.cn%2fgeneapi%2f%2523%2fmain%26response_type%3dcode%26scope%3dsnsapi_userinfo%23wechat_redirect',
        reUrl:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc772f9ac9691f3c1&redirect_uri=http%3a%2f%2fjianai.sagacityidea.cn%2fgeneapi&response_type=code&scope=snsapi_userinfo#wechat_redirect', //正式
        //reUrl:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx786fe6708aaf5cb1&redirect_uri=http%3a%2f%2fjiyin-test.sagacityidea.cn%2fgeneapi&response_type=code&scope=snsapi_userinfo#wechat_redirect', //测试
        expire_after:99999999,
        sdk_appid:1400253983,
        GENE_TYPE:'1146986504893591554', 
        SAMPLE_TYPE:'1146986130749091842',
        CANCER_SPECIES:'1146984910613475330',
        HOSP_NUMBER:'1157885260554412033',
        // WXKEY:"zhiaimedsagacityide2019022114162",
        // WXKEY:"hellosagacityideacompay123456789",
        qrCodeUrl:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe6b63dd863a509e2&redirect_uri=http%3a%2f%2fgene.wisdomcare.com.cn%2fgeneapi%2f%23%2flogin%2f',

    }
}else{
    // 1400253983
    module.exports = {
        imgUrl:'http://jianai.sagacityidea.cn/',                  //正式
        urlNoApi:"http://jianai.sagacityidea.cn/gene-api/",      //正式
        url:'http://jianai.sagacityidea.cn/gene-api/api',        //正式
        // imgUrl:'http://jiyin-test.sagacityidea.cn/',                //测试
        // urlNoApi:"http://jiyin-test.sagacityidea.cn/gene-api/",     //测试
        // url:'http://jiyin-test.sagacityidea.cn/gene-api/api',       //测试
        // imgUrl:'http://jiyin-test.sagacityidea.cn/',
        // urlNoApi:"http://jiyin-test.sagacityidea.cn/gene-api/",
        // url:'http://jiyin-test.sagacityidea.cn/gene-api/api',
        // imgUrl:'http://gene.wisdomcare.com.cn/',
        // urlNoApi:"http://gene.wisdomcare.com.cn/gene-api/",
        // url:'http://gene.wisdomcare.com.cn/gene-api/api',
        // appId:'wxe6b63dd863a509e2',
        //appId:'wx786fe6708aaf5cb1',   //测试
        appId:'wxc772f9ac9691f3c1' ,  //正式

        // mchId:'1523120921',//商户id
        reUrl:'https%3a%2f%2fopen.weixin.qq.com%2fconnect%2foauth2%2fauthorize%3fappid%3dwxc772f9ac9691f3c1%26redirect_uri%3dhttp%3a%2f%2fjianai.sagacityidea.cn%2fgeneapi%2f%2523%2fmain%26response_type%3dcode%26scope%3dsnsapi_userinfo%23wechat_redirect',        //正式
        //reUrl:'https%3a%2f%2fopen.weixin.qq.com%2fconnect%2foauth2%2fauthorize%3fappid%3dwx786fe6708aaf5cb1%26redirect_uri%3dhttp%3a%2f%2fjiyin-test.sagacityidea.cn%2fgeneapi%2f%2523%2fmain%26response_type%3dcode%26scope%3dsnsapi_userinfo%23wechat_redirect',  //测试
         //reUrl:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe6b63dd863a509e2&redirect_uri=http%3a%2f%2fgene.wisdomcare.com.cn%2fgeneapi&response_type=code&scope=snsapi_userinfo#wechat_redirect', 
        qrCodeUrl:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe6b63dd863a509e2&redirect_uri=http%3a%2f%2fgene.wisdomcare.com.cn%2fgeneapi%2f%23%2flogin%2f',
        expire_after:99999999,
        sdk_appid:1400253983, 
        GENE_TYPE:'1146986504893591554',
        SAMPLE_TYPE:'1146986130749091842',
        CANCER_SPECIES:'1146984910613475330',
        HOSP_NUMBER:'1157885260554412033',
        // WXKEY:"hellosagacityideacompay123456789"
        // WXKEY:"zhiaimedsagacityide2019022114162"
    }
}

/**
 *   ec_key:`-----BEGIN PRIVATE KEY-----
        MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgOjqWRsZdgSsuPlzM
        a7DXSCuUb+WIAXPprNFHhe8W9sehRANCAAQHpHLrPhLXH+ak7U5ZAKy0bLiQLzmp
        0yIApQTgzLYV+hYkEUld4MedYNaHkVs9oeT6ffb5lfSv0pNGWciskSko
        -----END PRIVATE KEY-----
        `,
        ec_publics:`-----BEGIN PUBLIC KEY-----
        MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEB6Ry6z4S1x/mpO1OWQCstGy4kC85
        qdMiAKUE4My2FfoWJBFJXeDHnWDWh5FbPaHk+n32+ZX0r9KTRlnIrJEpKA==
        -----END PUBLIC KEY-----
        `,

 */
// imgUrl:'http://hyh5test.doctorworking.net/',
//         url:'http://geneapi.skyfar.net/api',
//         // url:"http://192.168.20.106:8281/api",
//         appId:'wxd22aecdd178950f8',
//         mchId:'1520009891',//商户id
//         reUrl:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd22aecdd178950f8&redirect_uri=http%3a%2f%2fgenewx.skyfar.net&response_type=code&scope=snsapi_userinfo#wechat_redirect',
//         expire_after:99999999,
//         sdk_appid:1400253983,
//         GENE_TYPE:'1146986504893591554', 
//         SAMPLE_TYPE:'1146986130749091842',
//         CANCER_SPECIES:'1146984910613475330',
//         WXKEY:"798e5efaf1f887c6507eb39ed16f30c4"