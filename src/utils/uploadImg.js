import axios from "axios";
import { Toast } from "vant";

const uploadImg = (file) => {

  let params = new FormData();
  params.append("file", file);
  let config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }
  return new Promise((resolve, reject) => {
    Toast.loading("上传中...")
    axios.post(process.env.VUE_APP_BASE_URL + "/upload", params, config)
      .then(res => {
        if (res && res.data && res.data.code === 200) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      })
      .catch(err => {
        reject(err)
      }).finally(() => {
        Toast.clear()
      })
  })

}

export default {
  install(vm) {
    vm.prototype.$upload = uploadImg
  }
};