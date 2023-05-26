<template>
  <div class="register container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <img src="/logo.png" alt="Logo" class="img-logo" />
        <div class="card">
          <h1 class="card-header">LOGIN</h1>
          <div class="card-body">
            <a-form
              :model="formState"
              name="basic"
              :wrapper-col="{ span: 24 }"
              @submit.prevent="onSubmit()"
            >
              <div class="form-item-wrapper">
                <a-form-item
                  name="username"
                  :rules="[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]"
                >
                  <label for="username" class="label"> ชื่อผู้ใช้งาน </label>
                  <a-input v-model:value="formState.username" />
                </a-form-item>
              </div>

              <div class="form-item-wrapper">
                <a-form-item
                  name="password"
                  :rules="[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]"
                >
                  <label for="password" class="label"> รหัสผ่าน </label>
                  <a-input-password v-model:value="formState.password" />
                </a-form-item>
              </div>

              <div class="form-group buttons">
                <button type="submit" class="btn btn-info btn-block">
                  เข้าสู่ระบบ
                </button>

                <button
                  type="button"
                  @click="onRedirectToRegister()"
                  class="btn btn-secondary btn-block"
                >
                  ลงทะเบียน
                </button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "RegisterPage",
  setup() {
    const onFinish = async (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return {
      onFinish,
      onFinishFailed,
    };
  },
  data() {
    return {
      formState: {
        username: "",
        password: "",
      },
      checkUsername: false,
      checkPassword: false,
    };
  },
  methods: {
    onSubmit() {
      const username = this.formState.username;
      const password = this.formState.password;
      const regexPassword = /^(?=.*[a-z])[a-zA-Z0-9]{8,15}$/;

      const isValidPassword = regexPassword.test(password);

      if (isValidPassword) {
        this.checkPassword = true;
      } else {
        this.checkPassword = false;
      }

      if (username != "") {
        this.checkUsername = true;
      } else {
        this.checkUsername = false;
      }

      console.log("this.formState", this.formState);
      axios
        // .post(`http://localhost:8088/api/v2/login`, this.formState)
        .post(`api/v2/login`, this.formState)
        .then((response) => {
          console.log("response", response.data);

          this.$store.commit('setToken', response.data.token);
          localStorage.setItem("token-user", JSON.stringify(response.data.token));
          localStorage.setItem("username", JSON.stringify(response.data.username));

          console.log('this.$store.state.token', this.$store.state.token)
          this.$router.push("/");

          this.openNotificationWithIcon(
            "success",
            "Login success",
            "Welcome back"
          );
          this.onReset();
        })
        .catch((err) => {
          console.log("error", err);
          this.openNotificationWithIcon(
            "error",
            "Login fail",
            err.response.data.message
          );
        });
    },

    onReset() {
      this.formState = {
        username: "",
        password: "",
      };
    },

    onRedirectToRegister() {
      this.$router.push("/register");
    },

    openNotificationWithIcon(type, title, details) {
      this.$notification[type]({
        message: `${title}`,
        description: `${details}`,
      });
    },
  },
});
</script>

<style scoped>
.img-logo {
  width: 50px;
  display: block;
  margin: auto;
  margin-top: 10%;
  margin-bottom: 30px;
}

h1 {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 5px;
}

.card {
  margin-bottom: 15%;
}

.card-body {
  padding-left: 15%;
  padding-right: 15%;
}

.btn-info {
  color: #ffffff;
}

.buttons .btn-secondary {
  margin-top: 20px;
}

.buttons {
  margin-top: 30px;
  margin-bottom: 50px;
}

.btn-block {
  width: 100%;
}
</style>
