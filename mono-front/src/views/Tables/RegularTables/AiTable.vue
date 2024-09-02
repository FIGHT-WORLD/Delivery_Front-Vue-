<template>
  <b-card no-body>
    <b-card-header class="border-0">
      <h3 class="mb-0">AI 요청 기록</h3>
    </b-card-header>

    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="aiRequests"
      @row-click="handleRowClick"
    >
      <el-table-column label="상점 ID" min-width="100px" prop="storeId">
      </el-table-column>

      <el-table-column label="요청 날짜" min-width="200px" prop="createdAt">
        <template v-slot="{ row }">
          {{ formatDate(row.createdAt) }}
        </template>
      </el-table-column>

      <el-table-column label="요청 내용" prop="asking" min-width="300px">
      </el-table-column>

      <el-table-column label="응답 내용" prop="answer" min-width="400px">
      </el-table-column>

      <el-table-column
        label="메뉴 ID"
        prop="menuId"
        min-width="100px"
      >
      </el-table-column>

      <!-- <el-table-column
        label="프롬프트 ID"
        prop="promptId"
        min-width="300px"
      >
      </el-table-column> -->
    </el-table>

    <b-card-footer class="py-4 d-flex justify-content-end">
      <base-pagination
        v-model="currentPage"
        :per-page="pageSize"
        :total="totalElements"
        @page-changed="fetchAiRequests"
      ></base-pagination>
    </b-card-footer>
  </b-card>
</template>

<script>
import axios from "axios";
import { Table, TableColumn } from "element-ui";

export default {
  name: "ai-requests-table",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      aiRequests: [], // API에서 받은 데이터 저장
      currentPage: 1,
      pageSize: 10,
      totalElements: 0,
    };
  },
  methods: {
    fetchAiRequests() {
      const token = localStorage.getItem("jwtToken");
      axios
        .get("http://localhost:8080/api/v1/ai/admin/ai-request", {
          params: {
            page: this.currentPage - 1,
            size: this.pageSize,
          },
        headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          this.aiRequests = response.data.data.content;
          this.totalElements = response.data.data.totalElements;
        })
        .catch((error) => {
          console.error("Error fetching AI requests:", error);
          alert("Failed to load AI requests");
        });
    },
    handleRowClick(row) {
      this.$router.push({ path: `/ai-request/${row.promptId}` }); // 프롬프트 ID에 맞게 라우팅
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
  mounted() {
    this.fetchAiRequests(); // 컴포넌트가 마운트될 때 데이터 가져오기
  },
};
</script>