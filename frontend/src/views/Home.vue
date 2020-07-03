<template>
  <div class="container">
    <b-form-file
      :state="Boolean(selectedFile)"
      class="container-md file-upload"
      drop-placeholder="Drop file here..."
      placeholder="Choose a file or drop it here..."
      v-model="selectedFile"
    ></b-form-file>

    <b-progress :max="100" :value="progress" animated show-progress v-show="uploading"></b-progress>

    <div class="container-md">
      <div :key="index" class="item" v-for="(item, index) in fileList">
        {{item.name}}
        <b-icon @click="donwload(item)" class="ic-download" icon="download"></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { common } from '@/api'
import downloadFile from '@/utils/download-file'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      selectedFile: undefined,
      fileList: [],
      uploading: false,
      progress: 0,
    }
  },
  watch: {
    selectedFile(val) {
      console.log(val)
      if (!val) return
      this.uploading = true
      common
        .uploadFile(val, this.onFileUploadProgress)
        .then(resp => {
          console.log(`success ${resp}`)
          this.loadFiles()
          this.uploading = false
          this.progress = 0
        })
        .catch(e => {
          console.log(e)
          this.uploading = false
          this.progress = 0
        })
    },
  },
  mounted() {
    this.loadFiles()
  },
  methods: {
    loadFiles() {
      common.getAllFiles().then(resp => {
        this.fileList = resp.data
      })
    },
    onFileUploadProgress(value) {
      console.log(value)
      this.progress = value
    },
    donwload(file) {
      console.log(file)
      // window.open(file.fullPath, '_blank')
      downloadFile(file.fullPath)
    },
  },
}
</script>

<style lang="less" scoped>
.file-upload {
  margin-top: 100px;
  // height: 100px;
}

.item {
  height: 60px;
  line-height: 60px;

  &:hover {
    color: #fff;
    background-color: #d3e8e1;
  }
}

.ic-download {
  width: 20px;
  height: 20px;
  &:hover {
    cursor: pointer;
  }
}
</style>
