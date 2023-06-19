<script>
import { ref, reactive, onMounted, computed } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { VueDatePicker },
  setup() {
    const specElems = ref([]);
    onMounted(async () => {
      const { data } = await axios.post(
        "https://pp.credit/Services/BrokerService/api/Application/Dictionary",
        {
          dictName: "ARM_OccupationArea",
        }
      );
      specElems.value = data.description;
    });

    const formData = reactive({
      name: "",
      birthday: new Date(),
      specialization: "",
    });

    const rules = computed(() => ({
      name: { required, minLength: minLength(2) },
      birthday: { required },
      specialization: { required },
    }));

    const v$ = useVuelidate(rules, formData);

    const format = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
    };

    const router = useRouter();

    const submitHandler = async () => { 
      if (v$.value.$invalid) {
        v$.value.$touch();
        console.log("invalid");
        return;
      }

      try {
        router.push("/users");
      } catch (e) {
        console.log(e);
      }
    };

    return {
      formData,
      format,
      specElems,
      v$,
      submitHandler,
    };
  },
};
</script>

<template>
  <div class="card-wrapper mt-4">
    <form @submit.prevent="submitHandler">
      <div class="card">
        <div class="card-title text-center py-2">Регистрация</div>
        <div class="card-body">
          <div class="mb-3">
            <label for="name" class="form-label">ФИО</label>
            <input
              v-model="formData.name"
              type="text"
              class="form-control"
              id="name"
              placeholder="Введите ФИО"
            />
            <small
              class="helper-text invalid"
              v-if="v$.name.$dirty && v$.name.$invalid"
            >
              Введите ФИО
            </small>
          </div>
          <div class="mb-3">
            <label for="birthday" class="form-label">Дата рождения</label>
            <VueDatePicker
              v-model="formData.birthday"
              :format="format"
              type="text"
              id="birthday"
            />
            <small
              class="helper-text invalid"
              v-if="v$.birthday.$dirty && v$.birthday.$invalid"
            >
              Введите дату рождения
            </small>
          </div>
          <div class="mb-3">
            <label for="specialization" class="form-label">Специализация</label>
            <select
              v-model="formData.specialization"
              name="specialization"
              class="form-select"
            >
              <template v-for="elem in specElems" :key="elem.code">
                <option :value="elem.code">{{ elem.value }}</option>
              </template>
            </select>
            <small
              class="helper-text invalid"
              v-if="v$.specialization.$dirty && v$.specialization.$invalid"
            >
              Выберите специализацию
            </small>
          </div>
        </div>
        <div class="card-footer text-center py-4">
          <button type="submit" class="btn btn-primary">Отправить</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  width: 500px;
}

.helper-text.invalid {
  color: red;
}
</style>
