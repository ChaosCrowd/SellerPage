import apiConstant from './apiConstant'

export default {
  addImg (data, resolve, reject) {
    console.log(typeof (data))
    apiConstant.myAxios.post('add/img', data).then(resolve, reject)
  }
}
