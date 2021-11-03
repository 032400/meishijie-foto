<template>
  <el-upload
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      accept=".jpg, .jpeg, .png, .gif, .bmp"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</template>
<script>
export default {
  props:{
    action:String,
    maxSize:{
      type:Number,
      default:2
    },
    imageUrl:{
      type:String,
      default:''
    },
    imgMaxWidth:{
      type:[Number,String],
      default:'auto'
    }

  },
   methods: {
      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        console.log(this.imageUrl)
        console.log(res,file)
        // if (res.code === 1) {
        //   this.$message({
        //     message:res.mes,
        //     type:'warning'
        //   })
        //   return;
        // }
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$emit('res-url',{
          resImgUrl:this.imageUrl
        })
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
        // return isLt2M ;
        // return isJPG 
      }
    }
}
</script>
<style lang="stylus" scoped>
  .el-upload
    img 
        width 100px
        height 100px
</style>