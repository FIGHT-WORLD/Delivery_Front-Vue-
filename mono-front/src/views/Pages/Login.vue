<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Welcome!</h1>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-header class="bg-transparent pb-5"></b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    alternative
                    class="mb-3"
                    name="username"
                    :rules="{ required: true }"
                    prepend-icon="ni ni-email-83"
                    placeholder="username"
                    v-model="model.username"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    name="password"
                    :rules="{ required: true, min: 6 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="password"
                    v-model="model.password"
                  >
                  </base-input>

                  <b-form-checkbox v-model="model.rememberMe"
                    >Remember me</b-form-checkbox
                  >
                  <div class="text-center">
                    <base-button
                      type="primary"
                      native-type="submit"
                      class="my-4"
                      >Sign in</base-button
                    >
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="" class="text-light"
                ><small>Forgot password?</small></router-link
              >
            </b-col>
            <b-col cols="6" class="text-right">
              <router-link to="/auth/register" class="text-light"
                ><small>Create new account</small></router-link
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      model: {
        username: "", // 사용자가 입력할 사용자 이름
        password: "", // 사용자가 입력할 비밀번호
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        // 로그인 요청
        const response = await axios.post(
          "http://localhost:8080/api/v1/users/login",
          {
            username: this.model.username,
            password: this.model.password,
          }
        );

        // Authorization 헤더에서 JWT 토큰 추출
        const authorizationHeader = response.headers["authorization"]; // 헤더 키는 소문자 'authorization'으로 접근

        if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
          // "Bearer "를 포함한 전체 토큰 저장
          localStorage.setItem("jwtToken", authorizationHeader);

          localStorage.setItem("username", this.model.username);
          // 로그인 성공 후, 대시보드로 이동
          this.$router.push({ name: "user" });
        } else {
          alert("로그인 응답에 JWT 토큰이 없습니다.");
        }
      } catch (error) {
        console.error("Login failed:", error);
        alert(
          "Login failed: " +
            (error.response ? error.response.data.message : error.message)
        );
      }
    },
  },
};
</script>
