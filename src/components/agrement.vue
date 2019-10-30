<template>
    <div class="agreement-container">
        <div class="content">{{getProgramIfo.clause}}</div>
        <div class="btn">
            <button @click="read(false)">不同意</button>
            <button @click="read(true)">同意</button>
        </div>
    </div>
</template>

<script>
import { http } from "../http/http.js";
    export default {
        name: "registrationAgreement",
        data(){
            return {
             getProgramIfo:{}     
            }
        },
        methods: {
            read(tag) {
                this.$emit('setAgreement', tag);
            }
        },
        created(){
         http.getProIfo({id:1}).then(res =>{
      
        this.getProgramIfo=res.data.data[0].infos[0];
        // console.log( this.getProgramIfo);
     })   
        }
    };
</script>

<style>
    .agreement-container {
        font-family: 宋体;
        background-color: #ffffff;
        padding: 10px;
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        box-shadow: 1px 1px 9px #909090;
        border-radius: 4px;
        overflow: hidden;
    }
    .agreement-container .article-content {
        overflow-y: auto;
        height: calc(100% - 40px);
    }

    /* 大标题 */
    .agreement-container h3.title {
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        text-transform: none;
        margin: 10pt 0pt 0pt;
        text-align: center;
    }

    /* 版本号 */
    .agreement-container .version {
        font-size: 10pt;
        line-height: 115%;
        margin: 0pt 0pt 10pt;
        orphans: 0;
        text-align: right;
        widows: 0;
    }

    .agreement-container .version span {
        background-color: #ffffff;
        font-size: 10pt;
        font-style: normal;
        text-transform: none;
    }

    /* 章 */
    .agreement-container .chapter {
        text-align: center;
        font-weight: 600;
        margin: 20px 0px;
    }

    .agreement-container .chapter span {
        background-color: #ffffff;
        font-family: 宋体;
        font-size: 20px;
    }

    /* 一级标题 */
    .agreement-container .first-level {
        margin: 20px 0px;
    }

    .agreement-container .first-level .first-level-tit {
        font-size: 16px;
        font-weight: 600;
    }

    .agreement-container .first-level .first-level-con {
        font-size: 16px;
    }

    /* 二级标题 */
    .agreement-container .sec-level {
        margin: 10pt 0pt 10pt 48pt;
        text-align: justify;
        text-indent: -36.45pt;
    }

    .agreement-container .sec-level .sec-level-tit,
    .agreement-container .sec-level .sec-level-con {
        font-size: 14px;
    }

    /* 三级标题 */
    .agreement-container .third-level {
        margin: 10pt 0pt 10pt 60pt;
        text-align: justify;
        text-indent: -36.45pt;
    }

    .agreement-container .third-level .third-level-tit,
    .agreement-container .third-level .third-level-con {
        font-size: 12px;
    }
    /* 按钮 */
    .agreement-container .btn {
        text-align: center;
        margin-top: 10px;
    }
    .agreement-container .btn button {
        height: 30px;
        width: calc(50% - 30px);
        background-color: #0e97de;
        border: none;
        color: #fff;
        border-radius: 4px;
        margin-left: 10px;
    }
</style>