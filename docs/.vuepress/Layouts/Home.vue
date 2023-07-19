<template>
  <Navbar/>
  <div class="list">
    <h3>友链</h3>
    <ul>
      <li>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAWdJREFUaEPtmLFqAkEURd9+hyDkH/IT/kR+JY2ksrFLUgQknUIgoIVIiiVFBGFhCSi2giCILiRY6ZiQwhAQw+w4Fx4zd+v3Hu/ec2cYNrmsXX1JRF9CwYHTJuHAAQsJk3BgDjDSgQE9kkPCJByYA4x0YEB5aTHSjHRgDsAi3b69kYtqxcmu5aqQ68a9jPKxU/9/TRTsy9IDYWOMZO9TWa4L69EfnxvpdF9kNl9Y99gWwglvdztpdXpy9/hkuxO0joJ92XuINAn7ctRxDiPtaNxRW7SRLmsg+szDIx2d4LIPD2P2kr5lkg6zsl5Z1cMJoyNqpfJPEQWXdexUfbS3NCPtK0KOc3iGHY3jS+ucHwA/7o3yiXQHr778/50Dj7Trxs/9VOrNB9f2k30U7N1SZQNhhJXpxJ9hClbiACOtBARsDRKGWatkMAkrAQFbg4Rh1ioZTMJKQMDWIGGYtUoGk7ASELA1oiP8DR9JR2SEmsS/AAAAAElFTkSuQmCC" alt="">
        <a target="_blank" href="http://echoyuyu.gitee.io/so">宋承昊的博客<br/>全栈大神</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { usePageData } from '@vuepress/client'
import Navbar from '@theme/Navbar.vue'
import { ref } from 'vue'
export default {
  components: {
    Navbar // 官方原生的header,可以直接拿来用
  },
  setup() {
  }
}
</script>
<style lang="scss" scoped>
.list{
  margin-top: 90px;


}
h3{
  text-align: center;
}
ul{
  list-style: none;
  display: flex;
  justify-content: center;
}
li{
  width: 450px;
  height: 100px;
  border: 1px solid #fff;
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.2)!important;
  display: flex;
  align-items: center;
  padding-left: 10px;
  img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    &:hover{
      transform: rotate(666turn);
      transition: all 59s cubic-bezier(.34,0,.84,1) 1s;
    }
  }
 a{
   margin-left: 20px;
 }
}

</style>
