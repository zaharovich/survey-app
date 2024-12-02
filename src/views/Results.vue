<template>
  <div class="results">
    <el-card>
      <h1>Результати</h1>

      <div class="statistics">
        <el-row>
          <el-col :span="8">
            <el-statistic
              title="Середній вік"
              :value="averageAge"
            ></el-statistic>
          </el-col>
          <el-col :span="8">
            <el-statistic
              title="Середня оцінка"
              :value="averageRating"
            ></el-statistic>
          </el-col>
          <el-col :span="8">
            <el-statistic
              title="Середня ймовірність рекомендації"
              :value="averageRecommendation"
            ></el-statistic>
          </el-col>
        </el-row>
      </div>

      <el-form :inline="true" class="filter-form">
        <el-form-item label="Фільтр за ID">
          <el-input
            v-model="filterId"
            placeholder="Введіть ID"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="clearResults"
            >Очистити результати</el-button
          >
        </el-form-item>
      </el-form>

      <el-table :data="filteredResults" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="Ім'я" width="150"></el-table-column>
        <el-table-column prop="age" label="Вік" width="100"></el-table-column>
        <el-table-column
          prop="rating"
          label="Оцінка"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="recommendation"
          label="Ймовірність рекомендації"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SurveyResults",
  data() {
    return {
      results: [],
      filterId: "",
    };
  },
  computed: {
    filteredResults() {
      if (!this.filterId) {
        return this.results;
      }
      return this.results.filter((result) =>
        result.id.toLowerCase().includes(this.filterId.toLowerCase())
      );
    },

    averageAge() {
      const ages = this.results.map((result) => result.age).filter(Boolean);
      return ages.length
        ? (ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1)
        : 0;
    },

    averageRating() {
      const ratings = this.results
        .map((result) => result.rating)
        .filter(Boolean);
      return ratings.length
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
        : 0;
    },

    averageRecommendation() {
      const recommendations = this.results
        .map((result) => result.recommendation)
        .filter(Boolean);
      return recommendations.length
        ? (
            recommendations.reduce((a, b) => a + b, 0) / recommendations.length
          ).toFixed(1)
        : 0;
    },
  },
  methods: {
    clearResults() {
      localStorage.removeItem("results");

      this.results = [];

      this.filterId = "";

      this.$message({
        message: "Усі результати успішно очищено!",
        type: "success",
        showClose: true,
      });
    },
  },
  created() {
    const storedResults = JSON.parse(localStorage.getItem("results") || "[]");
    this.results = storedResults;
  },
};
</script>

<style>
.results {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.statistics {
  margin-bottom: 20px;
}
.filter-form {
  margin-bottom: 20px;
}
</style>
