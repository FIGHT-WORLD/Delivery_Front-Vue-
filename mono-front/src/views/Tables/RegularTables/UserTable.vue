<template>
  <b-card no-body>
    <b-card-header class="border-0">
      <h3 class="mb-0">유저 목록</h3>
    </b-card-header>

    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="users"
      @row-click="handleRowClick"
    >
      <el-table-column label="유저 이름" min-width="200px" prop="username">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.username
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="닉네임" prop="nickname" min-width="200px">
      </el-table-column>

      <el-table-column label="이메일" prop="email" min-width="250px">
      </el-table-column>

      <el-table-column label="역할" prop="role" min-width="150px">
      </el-table-column>

      <el-table-column label="가입일" prop="createdAt" min-width="200px">
        <template v-slot="{ row }">
          {{ formatDate(row.createdAt) }}
        </template>
      </el-table-column>

      <el-table-column
        label="유저 ID"
        prop="userId"
        min-width="100px"
        v-if="false"
      >
      </el-table-column>
    </el-table>

    <b-card-footer class="py-4 d-flex justify-content-end">
      <base-pagination
        v-model="currentPage"
        :per-page="10"
        :total="totalElements"
      ></base-pagination>
    </b-card-footer>
  </b-card>
</template>

<script>
import axios from "axios";
import { Table, TableColumn } from "element-ui";

export default {
  name: "users-table",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      users: [], // API에서 받은 데이터 저장
      currentPage: 1,
      totalElements: 0,
    };
  },
  methods: {
    fetchUsers() {
      const token = localStorage.getItem("jwtToken");
      axios
        .get("http://localhost:8080/api/v1/users", {
          params: {
            page: this.currentPage - 1,
            size: 10,
          },
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          this.users = response.data.data.content;
          this.totalElements = response.data.data.totalElements;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          alert("Failed to load users");
        });
    },
    handleRowClick(row) {
      this.$router.push({ path: `/users/${row.userId}` }); // userId에 맞게 라우팅
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
    this.fetchUsers(); // 컴포넌트가 마운트될 때 데이터 가져오기
  },
};
</script>
