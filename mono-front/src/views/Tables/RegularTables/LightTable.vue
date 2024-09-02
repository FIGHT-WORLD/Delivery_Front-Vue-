<template>
  <b-card no-body>
    <b-card-header class="border-0">
      <h3 class="mb-0">문의 목록</h3>
    </b-card-header>

    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="reports"
      @row-click="handleRowClick"
    >
      <el-table-column label="제목" min-width="310px" prop="title">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.title
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="신고 유형" prop="reportType" min-width="140px">
      </el-table-column>

      <el-table-column
        label="내용"
        prop="content"
        min-width="240px"
        class-name="text-truncate"
      >
        <template v-slot="{ row }">
          <span class="text-truncate">{{ row.content }}</span>
        </template>
      </el-table-column>

      <el-table-column label="작성일" prop="createdAt" min-width="200px">
        <template v-slot="{ row }">
          <span>{{ new Date(row.createdAt).toLocaleString() }}</span>
        </template>
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
  name: "reports-table",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      reports: [], // API에서 받은 데이터 저장
      currentPage: 1,
      totalElements: 0,
    };
  },
  methods: {
    fetchReports() {
      const token = localStorage.getItem("jwtToken");
      axios
        .get("http://localhost:8080/api/v1/reports/admin", {
          params: {
            page: this.currentPage - 1,
            size: 10,
            sortBy: "createdAt",
            direction: "desc",
          },
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          this.reports = response.data.data.content;
          this.totalElements = response.data.data.totalElements;
        })
        .catch((error) => {
          console.error("Error fetching reports:", error);
          alert("Failed to load reports");
        });
    },
    handleRowClick(row) {
      this.$router.push({ path: `/report/admin/${row.reportId}` });
    },
  },
  mounted() {
    this.fetchReports(); // 컴포넌트가 마운트될 때 데이터 가져오기
  },
};
</script>
