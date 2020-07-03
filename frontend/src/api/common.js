import axios from '@/utils/request'

export default {
  getAllFiles() {
    return axios.get('/api/file')
  },
  uploadFile(file, onUploadProgress) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        onUploadProgress(percentCompleted);
      },
    }

    const formData = new FormData()
    formData.append('file', file)
    return axios.post('/api/upload', formData, config)
  },
}
