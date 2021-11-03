<template>
  <div class="edit">
    <div class="edit-item">
      <span class="label">修改头像</span>
      <upload-img
        imgMaxWidth="210"
        action="/api/upload?type=user"
        :imageUrl='avatar'
        @res-url='hand'

      ></upload-img>
    </div>
    <div class="edit-item">
      <span class="label">修改名称</span>
      <div>
        <el-input v-model="name" class="create-input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="edit-item">
      <span class="label">个人简介</span>
      <div>
        <el-input  v-model="sign"  type="textarea" class="create-input" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div>
      <el-button 
      class="send" 
      type="primary" 
      size="medium"
      @click="save"
    >保存</el-button>
    </div>
  </div>
</template>
<script>
import UploadImg from '@/components/upload-img'
import {userEdit} from '@/service/api'
export default {
  components: {UploadImg},
  data(){
    const userInfo = this.$store.state.userInfo;
    // console.log(userInfo);
    return {
      name:userInfo.name,
      sign:userInfo.sign,
      avatar:userInfo.avatar
    }
  },
  methods:{
   async save(){
        let edit = await userEdit({
            name:this.name,
            sign:this.sign,
            avatar:this.avatar}) ;
        if(edit.code === 0){
          this.$router.push({
            name:'space'
          })
        }
    },
    hand(data){
      this.avatar=data.resImgUrl
    }    
  }
}
</script>
<style lang="stylus">
.edit
  background-color #fff
  padding 10px 0 20px 20px
  .edit-item 
    display flex
    margin-bottom 20px
    .label
      margin-right 10px
</style>