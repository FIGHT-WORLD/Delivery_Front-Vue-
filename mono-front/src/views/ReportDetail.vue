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
                {{ report.title }}
              </h1>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <b-col xl="4" class="order-xl-2 mb-5">
          <b-card>
            <h3>Report Details</h3>
            <p v-if="report.reportType">
              <strong>신고 유형:</strong> {{ report.reportType }}
            </p>
            <p v-if="report.issueDate">
              <strong>문제 발생일:</strong>
              {{ new Date(report.issueDate).toLocaleString() }}
            </p>
            <p v-if="report.userId">
              <strong>작성자 ID:</strong> {{ report.userId }}
            </p>
            <p v-else>No details available</p>
          </b-card>
        </b-col>
        <b-col xl="8" class="order-xl-1">
          <b-card>
            <h3>Content</h3>
            <p>{{ report.content }}</p>
          </b-card>

          <!-- 댓글 리스트 -->
          <!-- 댓글 리스트 -->
          <b-card class="mt-4">
            <h3>Comments</h3>
            <b-list-group v-if="filteredComments.length > 0">
              <b-list-group-item
                v-for="comment in filteredComments"
                :key="comment.commentId"
              >
                <p>
                  <strong>관리자 ID: {{ comment.userId }}</strong> -
                  {{ comment.content }}
                </p>
                <p>
                  <small>{{
                    new Date(comment.createdAt).toLocaleString()
                  }}</small>
                </p>
                <div class="text-right">
                  <b-button
                    variant="danger"
                    size="sm"
                    @click="deleteComment(comment.commentId)"
                    >Delete</b-button
                  >
                </div>
              </b-list-group-item>
            </b-list-group>
            <div v-else>
              <p>No comments yet.</p>
            </div>
          </b-card>

          <!-- 댓글 작성 폼 -->
          <!-- 댓글 작성 폼 -->
          <b-card class="mt-4">
            <b-form @submit.prevent="submitComment">
              <b-form-group label="Comment">
                <b-form-textarea
                  v-model="newComment"
                  rows="3"
                  required
                ></b-form-textarea>
              </b-form-group>
              <div class="text-right">
                <b-button type="submit" variant="primary" size="sm"
                  >Submit</b-button
                >
              </div>
            </b-form>
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
      report: {},
      comments: [],
      newComment: "", // 새로운 댓글 내용을 저장
    };
  },

  computed: {
    filteredComments() {
      return this.comments.filter((comment) => comment.deletedAt === null);
    },
  },
  created() {
    this.fetchReport();
    this.fetchComments(); // 페이지 로드 시 댓글도 함께 로드
  },
  methods: {
    async fetchReport() {
      const reportId = this.$route.params.reportId;
      const token = localStorage.getItem("jwtToken");

      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/reports/admin/${reportId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        this.report = response.data.data;
      } catch (error) {
        console.error("Error fetching report:", error);
        alert("Failed to load report");
      }
    },
    async fetchComments() {
      const reportId = this.$route.params.reportId;
      const token = localStorage.getItem("jwtToken");

      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/report/admin/${reportId}/feedback`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        this.comments = response.data.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
        alert("Failed to load comments");
      }
    },
    async submitComment() {
      const reportId = this.$route.params.reportId;
      const token = localStorage.getItem("jwtToken");
      const userId = localStorage.getItem("userId");

      try {
        await axios.post(
          `http://localhost:8080/api/v1/report/admin/${reportId}/feedback`,
          {
            content: this.newComment,
            username: userId, // 사용자 이름을 함께 전송
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        alert("댓글 작성이 완료됐습니다.");
        this.newComment = ""; // 입력된 댓글 내용 초기화
        this.fetchComments(); // 댓글 새로고침
      } catch (error) {
        console.error("Error submitting comment:", error);
        alert("Failed to submit comment");
      }
    },
    async deleteComment(commentId) {
      const token = localStorage.getItem("jwtToken");
      const confirmDelete = confirm("댓글을 삭제하시겠습니까?");

      if (confirmDelete) {
        try {
          await axios.delete(
            `http://localhost:8080/api/v1/report/admin/${commentId}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          alert("댓글 삭제가 완료되었습니다.");
          this.fetchComments(); // 댓글 새로고침
        } catch (error) {
          console.error("Error deleting comment:", error);
          alert("Failed to delete comment");
        }
      }
    },
  },
};
</script>
