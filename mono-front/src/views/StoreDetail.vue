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
                {{ store.name }}
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
            <h3>가게 상세 정보</h3>
            <p><strong>이름:</strong> {{ store.name }}</p>
            <p><strong>주소:</strong> {{ store.address }}</p>
            <p><strong>오픈 시간:</strong> {{ formatTime(store.open_at) }}</p>
            <p><strong>오픈 시간:</strong> {{ formatTime(store.close_at) }}</p>
            <p><strong>마감 시간:</strong> {{ store.close_at }}</p>
            <p><strong>가게 번호:</strong> {{ store.phone_number }}</p>
            <p><strong>업종:</strong> {{ store.store_category }}</p>
            <p><strong>영업 정보:</strong> {{ store.status }}</p>
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
      store: {},
    };
  },
  created() {
    this.fetchStore();
  },
  methods: {
    async fetchStore() {
      const store_id = this.$route.params.store_id;
      const token = localStorage.getItem("jwtToken");

      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/stores/${store_id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        this.store = response.data.data;
      } catch (error) {
        console.error("Error fetching store:", error);
        alert("Failed to load store data");
      }
    },
    formatTime(timeString) {
      if (timeString) {
        // "23:02:00" 형식에서 시간과 분을 추출
        let [hour, minute] = timeString.split(":");
        hour = parseInt(hour, 10);

        // AM/PM 결정
        const ampm = hour >= 12 ? "PM" : "AM";

        // 12시간 형식으로 변환
        hour = hour % 12 || 12;

        // "HH:MM AM/PM" 형식으로 반환
        return `${hour}:${minute} ${ampm}`;
      }
      return "";
    },
  },
};
</script>
