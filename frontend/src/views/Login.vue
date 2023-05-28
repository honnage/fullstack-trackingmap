<template>
  <div class="container">
    <section
      class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div
            class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center"
          >
            <div class="card mb-3">
              <div class="card-body">
                <div class="pt-4 pb-2">
                  <h5 class="card-title text-center pb-0 fs-4">
                    Login to Your Account
                  </h5>
                  <p class="text-center small">
                    Enter your username & password to login
                  </p>
                </div>

                <a-form
                  :model="formState"
                  name="basic"
                  :wrapper-col="{ span: 24 }"
                  @submit.prevent="onSubmit()"
                  class="row g-3 needs-validation"
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
                      <label for="username" class="label"> username </label>
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
                      <label for="password" class="label"> password </label>
                      <a-input-password v-model:value="formState.password" />
                    </a-form-item>
                  </div>

                  <div class="col-12">
                    <button type="submit" class="btn btn-primary w-100">
                      Login
                    </button>
                  </div>
                </a-form>
              </div>
            </div>

            <div class="credits">
              <!-- All the links in the footer should remain intact. -->
              <!-- You can delete the links only if you purchased the pro version. -->
              <!-- Licensing information: https://bootstrapmade.com/license/ -->
              <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ -->
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </div>
      </div>
    </section>
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

          this.$store.commit("setToken", response.data.token);
          localStorage.setItem("user-token", response.data.token);
          localStorage.setItem("user-info", JSON.stringify(response.data.userInfo));

          console.log("this.$store.state.token", this.$store.state.token);
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
