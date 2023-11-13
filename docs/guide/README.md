
  <div class="sentenceBox">
  <div> {{sentenceArr.hitokoto}}</div>
 <div class="author"> ——《{{sentenceArr.from}}》</div>
  </div>

<script>
import { ref,onMounted,reactive } from 'vue'
import axios from 'axios'
export default {
  setup() {
    let sentenceArr = ref([]);
        onMounted(()=>{
          axios.get('https://v1.hitokoto.cn/?c=k').then(res=>{
            console.log(res.data.hitokoto);
            sentenceArr.value=res.data;
          });
        });
      return {
       sentenceArr
      }
 }
}
</script>
<style lang="scss" scoped>
.sentenceBox{
  margin-top: 90px;
 text-align: center;
.author{
margin-top: 30px;
}
}
</style>
    
