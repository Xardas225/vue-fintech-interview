<script>
import { reactive, toRaw } from "vue";
import { usersStore } from "@/store";

export default {
  setup() {
    const store = usersStore();
    const users = store.getUsers;

    const deleteUser = (id) => {
      store.deleteUser(id);
    };

    const editing = reactive({
      id: null,
      value: "",
      isEdit: false,
      type: "",
    });

    /**
     * @param {string} value - новое редактируемое значение
     * @param {number} id - id пользователя
     * @param {string} type - тип поля для изменения
     */
    const editUser = (value, id, type) => {
      editing.isEdit = true;
      editing.value = value;
      editing.id = id;
      editing.type = type;
    };

    const saveEdit = () => {
      if (editing.value == "") return;
      store.editUser(toRaw(editing));
      editing.isEdit = false;
    };

    return {
      users,
      deleteUser,
      editUser,
      editing,
      saveEdit,
    };
  },
};
</script>

<template>
  <div class="table-wrapper mt-4">
    <table>
      <thead>
        <tr>
          <th class="px-4">ID</th>
          <th class="px-4">ФИО</th>
          <th class="px-4">Дата рождения</th>
          <th class="px-4">Код специализации</th>
          <th class="px-4">Важность</th>
          <th class="px-4"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="text-center">{{ user.id }}</td>
          <td class="text-center">
            {{ user.fio }}
            <button
              class="btn btn-primary"
              @click="editUser(user.fio, user.id, 'fio')"
            >
              ред.
            </button>
          </td>
          <td class="text-center">{{ user.birthday }}</td>
          <td class="text-center">{{ user.spec }}</td>
          <td class="text-center">
            {{ user.importance }}
            <button
              class="btn btn-primary"
              @click="editUser(user.importance, user.id, 'importance')"
            >
              ред.
            </button>
          </td>
          <td>
            <button class="btn btn-danger" @click="deleteUser(user.id)">
              Удалить запись
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div
    class="d-flex flex-column justify-content-start"
    v-if="editing.isEdit"
  >
    <span class="mb-2">Редактирование пользователя {{ editing.id }}</span>
    <input
      class="form-control mb-2"
      type="text"
      name="edit"
      id="edit"
      v-model="editing.value"
    />
    <button class="btn btn-success" @click="saveEdit">Сохранить</button>
  </div>
</template>

<style lang="scss">
.table {
  &-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.editing {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 200px;
  }
}
</style>
