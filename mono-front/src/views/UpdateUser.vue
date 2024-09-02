<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="
        min-height: 600px;
        background-image: url(img/theme/profile-cover.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <b-container fluid class="p-0">
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center p-0">
          <b-row class="w-100 m-0">
            <b-col lg="12" md="12" class="p-0">
              <h1
                class="display-2 text-white text-center"
                style="word-break: break-word; width: 100%"
              >
                {{ user.username }}
              </h1>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6 d-flex justify-content-center">
      <b-row class="w-100 justify-content-center">
        <b-col xl="8" lg="10" md="12" sm="12" class="order-xl-1">
          <b-card
            class="text-center"
            style="max-width: 800px; margin: -120px auto 0 auto"
          >
            <h3>유저 상세 정보</h3>
            <p><strong>이름:</strong> {{ user.username }}</p>
            <p><strong>이메일:</strong> {{ user.email }}</p>
            <p>
              <strong>닉네임:</strong>
              <b-form-input v-model="user.nickname"></b-form-input>
            </p>
            <p>
              <strong>비밀번호:</strong>
              <b-form-input type="password" v-model="password"></b-form-input>
            </p>
            <p><strong>가입일:</strong> {{ formatDate(user.createdAt) }}</p>
            <b-button variant="primary" size="sm" @click="updateUserNickname"
              >확인</b-button
            >
          </b-card>
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
      user: {},
      password: "", // 비밀번호 필드를 추가
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      const userId = this.$route.params.userId;
      const token = localStorage.getItem("jwtToken");

      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/users/${userId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        this.user = response.data.data;
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("Failed to load user data");
      }
    },
    async updateUserNickname() {
      const userId = this.$route.params.userId;
      const token = localStorage.getItem("jwtToken");

      try {
        const response = await axios.patch(
          `http://localhost:8080/api/v1/users/${userId}`,
          {
            nickname: this.user.nickname,
            password: this.password, // 비밀번호를 함께 전송
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        alert("Nickname updated successfully");
      } catch (error) {
        console.error("Error updating user nickname:", error);
        alert("Failed to update nickname");
      }
    },
    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("ko-KR", options);
    },
  },
};
</script>
