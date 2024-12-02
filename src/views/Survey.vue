<template>
  <div class="survey">
    <el-card>
      <h1>Опитування</h1>
      <el-form :model="formData" ref="formRef" @submit.prevent="submitForm">
        <el-form-item label="Ваше ім'я">
          <el-input
            v-model="formData.name"
            placeholder="Введіть ваше ім'я"
          ></el-input>
        </el-form-item>

        <el-form-item label="Ваш вік">
          <el-input
            v-model="formData.age"
            placeholder="Введіть ваш вік"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="Оцінка товару від 1 до 5">
          <el-rate
            v-model="formData.rating"
            :max="5"
            :allow-half="false"
            show-score
          ></el-rate>
        </el-form-item>

        <el-form-item
          label="Ймовірність, що ви порадите нашу компанію знайомим або друзям"
        >
          <el-slider
            v-model="formData.recommendation"
            :min="0"
            :max="10"
            show-tooltip
          ></el-slider>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">Надіслати</el-button>
        </el-form-item>
      </el-form>
      <el-alert
        v-if="successMessage"
        :title="successMessage"
        type="success"
        show-icon
        class="mt-2"
      ></el-alert>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SurveyForm",
  data() {
    return {
      formData: {
        name: "",
        age: null,
        rating: 3,
        recommendation: 5,
      },
      successMessage: "",
    };
  },
  methods: {
    generateUniqueId() {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numbers = "0123456789";

      let id = "";
      for (let i = 0; i < 3; i++) {
        id += letters.charAt(Math.floor(Math.random() * letters.length));
        id += numbers.charAt(Math.floor(Math.random() * numbers.length));
      }

      return id;
    },
    submitForm() {
      // генерим уникальный id
      const uniqueId = this.generateUniqueId();

      // генерим ответ
      const response = {
        id: uniqueId,
        name: this.formData.name,
        age: this.formData.age,
        rating: this.formData.rating,
        recommendation: this.formData.recommendation,
      };

      const storedResults = JSON.parse(localStorage.getItem("results") || "[]");

      storedResults.push(response);

      localStorage.setItem("results", JSON.stringify(storedResults));

      this.successMessage = `Відповідь успішно збережена! Ваш ID: ${uniqueId}`;

      // клининг формы
      this.formData.name = "";
      this.formData.age = null;
      this.formData.rating = 3; // сброс
      this.formData.recommendation = 5;
    },
  },
};
</script>

<style>
.survey {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.mt-2 {
  margin-top: 20px;
}
</style>
