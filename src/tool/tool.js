export default {
  isValidName (name) {
    if (name.length === 0) {
      return '用户名不能为空'
    } else if (name.length < 4) {
      return '用户名长度必须大于4位'
    } else {
      return ''
    }
  },

  isValidPassword (password) {
    if (password.length === 0) {
      return '密码不能为空'
    } else if (password.length < 6) {
      return '密码长度必须大于6位'
    } else {
      return ''
    }
  },

  isValidPrice (price) {
    if (price === '') {
      return '价格不能为空'
    } else if (price < 0) {
      return '价格不能为负数'
    } else if (!/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(price)) {
      return '价格小数位不能超过2位'
    } else {
      return ''
    }
  },

  isValidDishName (dishName) {
    if (dishName === '') {
      return '菜名不能为空'
    } else {
      return ''
    }
  },

  isValidPhone (phone) {
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      return '请输入正确的电话号码'
    } else {
      return ''
    }
  },

  isValidEmail (email) {
    var Regex = /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$)|(^$)/
    if (email === '') {
      return '邮箱不能为空'
    } else if (!Regex.test(email)) {
      return '请输入正确的邮箱'
    } else {
      return ''
    }
  }
}
