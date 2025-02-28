import React, { Component } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../../components/Loading'
import styles from './index.module.css'
import BackButton from '../../img/back.png'
import Logo from '../../img/Login_logo.png'


export default class BindEmail extends Component {
  鉴权
    componentDidMount() {
    //如果没有拿到 token
    if (!localStorage.getItem('token')) {
      this.props.history.push('/tudo/login')
    }
  }

  state = {
    email: '',
    key: '',
    loading: false, //控制进度条的出现与否
  }

  To_Email = () => {
    this.props.history.push("/tudo/email")
  }

  getEmail = (event) => {
    this.setState({
      email: event.target.value   //获得email
    })
  }

  getKey = (event) => {
    this.setState({
      key: event.target.value     //获得验证码
    })
  }

  sendEmail = () => {
    this.setState({
      loading: true
    })
    const token = localStorage.getItem('token')
    const { email } = this.state
    //发送绑定邮箱的验证码
    axios({
      method: 'post',
      url: 'https://nspyf.top:11000/auth/email/binding-key',
      headers: {
        'Token': token
      },
      data: {
        email
      }
    })
      .then(
        response => {
          this.setState({
            loading: false
          })
          toast.success('发送成功！请在你的邮箱内查收验证码', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
        error => {
          this.setState({
            loading: false
          })
          const { data } = error.response
          toast.error(data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      )
  }

  retrieveEmail = () => {
    const token = localStorage.getItem('token')
    axios({
      method: 'get',
      url: '/api/auth/email',
      headers: {
        'Token': token
      }
    })
      .then(
        response => {
          return response.data.email
        },
        error => {
          this.setState({
            Sendloading: false
          })
          const { data } = error.response
          toast.error(data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return ""
        }
      )
    return ""
  }

  deleteEmail = () => {
    this.setState({
      Sendloading: true
    })
    const token = localStorage.getItem('token')
    axios({
      method: 'delete',
      url: '/api/auth/email/binding',
      headers: {
        'Token': token
      }
    })
      .then(
        response => {
          this.setState({
            Sendloading: false
          })
          toast.success('邮箱绑定已取消！', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
        error => {
          this.setState({
            Sendloading: false
          })
          const { data } = error.response
          toast.error(data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      )
  }

  BindHandler = () => {
    this.setState({
      loading: true
    })
    const token = localStorage.getItem('token')
    const { email, key } = this.state
    //验证验证码绑定邮箱的请求
    axios({
      method: 'post',
      url: 'https://nspyf.top:11000/auth/email/binding',
      headers: {
        'Token': token
      },
      data: {
        email,
        key
      }
    })
      .then(response => {
        this.setState({
          loading: false
        })
        toast.success('绑定成功！', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(error => {
        this.setState({
          loading: false
        })
        const { data } = error.response
        toast.error(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  render() {
    return (
      <div className={styles.body_div}>
        <div className={styles.backButton_div}>
          <img className={styles.backButton} src={BackButton} alt="backImg" onClick={this.To_Email} />
        </div>
        <div className={styles.inputDiv}>
          <img className={styles.logo} src={Logo} alt="loginLogo" />
          <input type="text" className={styles.InputEmail} placeholder="请输入邮箱" onChange={this.getEmail} />
          <div className={styles.SendDiv}>
            <input type="text" className={styles.InputKey} placeholder="请输入验证码" onChange={this.getKey} /><button className={styles.SendButton} onClick={this.sendEmail}> 发送验证码 </button>
          </div>
          {this.state.loading ? <Loading /> : null}
          <button className={styles.ConfirmButton} onClick={this.BindHandler}>绑定</button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
        </div>
      )
    }
}

