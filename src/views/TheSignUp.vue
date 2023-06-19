<script>
import axios from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";
import { ref, reactive, onMounted, computed } from "vue";
import { usersStore } from "@/store";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, alpha } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { getFormatDate } from "@/plugins/getFormatDate";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { VueDatePicker },
  setup() {
    const store = usersStore();

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
      fio: "",
      birthday: "",
      spec: "",
    });

    const rules = computed(() => ({
      fio: { required, minLength: minLength(2), alpha },
      birthday: { required },
      spec: { required },
    }));

    const v$ = useVuelidate(rules, formData);

    const router = useRouter();

    const submitHandler = async () => {
      if (v$.value.$invalid) {
        v$.value.$touch();
        return;
      }

      try {
        store.addUser({
          fio: formData.fio,
          spec: formData.spec,
          birthday: getFormatDate(formData.birthday),
          importance: Math.floor(Math.random() * (3 - 1 + 1)) + 1,
        });
        router.push("/users");
      } catch (e) {
        console.log(e);
      }
    };

    return {
      formData,
      specElems,
      v$,
      submitHandler,
      getFormatDate,
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
              v-model="formData.fio"
              type="text"
              class="form-control"
              id="fio"
              placeholder="Введите ФИО"
            />
            <small
              class="helper-text invalid"
              v-if="v$.fio.$dirty && v$.fio.$invalid"
            >
              Введите ФИО
            </small>
          </div>
          <div class="mb-3">
            <label for="birthday" class="form-label">Дата рождения</label>
            <VueDatePicker
              v-model="formData.birthday"
              :format="getFormatDate"
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
            <label for="spec" class="form-label">Специализация</label>
            <select v-model="formData.spec" name="spec" class="form-select">
              <template v-for="elem in specElems" :key="elem.code">
                <option :value="elem.code">{{ elem.value }}</option>
              </template>
            </select>
            <small
              class="helper-text invalid"
              v-if="v$.spec.$dirty && v$.spec.$invalid"
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
