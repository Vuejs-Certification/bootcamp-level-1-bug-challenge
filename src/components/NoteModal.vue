<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  info: {
    type: Object,
    required: true,
  },
});

const modalTitle = computed(() =>
  props.info.type === "add" ? "Add Note" : "Edit Note",
);

const emit = defineEmits(["update:modelValue", "edit", "add"]);

const note = ref({
  id: props.info.id,
  title: props.info.title,
  content: props.info.content,
});

function closeModal() {
  emit("update:modelValue", false);
}

function submit() {
  emit(props.info.type, note.value);
  closeModal();
}
</script>

<template>
  <div>
    <transition name="modal">
      <div class="note-modal" v-if="modelValue">
        <div class="note-modal-overlay" @click="closeModal"></div>
        <div class="note-modal-container">
          <div class="note-modal-content">
            <h3>{{ modalTitle }}</h3>
            <form id="modalForm" @submit="submit">
              <div>
                <label for="title">Title</label>
                <input v-model="note.title" type="text" id="title" />
              </div>
              <div>
                <label for="content">Content</label>
                <textarea v-model="note.content" id="content"></textarea>
              </div>
              <div class="btns">
                <button
                  class="save"
                  :class="{
                    'btn-disabled': !note.title || !note.content,
                  }"
                  type="submit"
                  form="modalForm"
                  data-test="submit"
                >
                  Save
                </button>
                <button class="cancel" type="button" @click="closeModal">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
