<!--You do not need to change anything in this file-->
<script setup>
import { ref } from "vue";
import NoteModal from "@/components/NoteModal.vue";
import {
  TrashIcon,
  DocumentPlusIcon,
  PencilSquareIcon,
} from "@heroicons/vue/24/outline";

const notes = ref([
  {
    id: "note-" + crypto.randomUUID(),
    title: "Meeting with Clients",
    content: "Discuss project updates and deliverables with clients at 2 PM.",
  },
  {
    id: "note-" + crypto.randomUUID(),
    title: "Grocery Shopping",
    content: "Buy milk, eggs, bread, and vegetables from the supermarket.",
  },
  {
    id: "note-" + crypto.randomUUID(),
    title: "Gym Workout",
    content:
      "Complete a 30-minute cardio session followed by strength training exercises.",
  },
]);

const modalVisible = ref(false);
const editInfo = ref({
  title: "",
  content: "",
  id: "",
  type: "add",
});

function editNote(id) {
  const note = notes.value.find((note) => note.id === id);
  editInfo.value = {
    title: note.title,
    content: note.content,
    id: note.id,
    type: "edit",
  };
  modalVisible.value = true;
}

function addNote() {
  editInfo.value = {
    title: "",
    content: "",
    id: "note-" + crypto.randomUUID(),
    type: "add",
  };
  modalVisible.value = true;
}

function removeNote(id) {
  notes.value = notes.value.filter((note) => note.id !== id);
}

function edit(note) {
  const index = notes.value.findIndex((n) => n.id === note.id);
  notes.value[index] = note;
}

function add(note) {
  notes.value.unshift(note);
}
</script>

<template>
  <div>
    <div class="container">
      <h1>
        Note App
        <button @click="addNote" data-test="add-note">
          <DocumentPlusIcon />
        </button>
      </h1>
      <TransitionGroup tag="ul" name="slide">
        <li v-for="note in notes" :key="note.id">
          <span>
            {{ note.title }}
          </span>
          <div class="flex gap-1">
            <button class="remove" @click="editNote(note.id)">
              <PencilSquareIcon />
            </button>
            <button class="remove" @click="removeNote(note.id)">
              <TrashIcon />
            </button>
          </div>
        </li>
      </TransitionGroup>
    </div>
    <NoteModal
      v-model="modalVisible"
      :info="editInfo"
      @add="add"
      @edit="edit"
    />
  </div>
</template>
