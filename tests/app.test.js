import { describe, it, vi, expect } from "vitest";
import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import NoteModal from "@/components/NoteModal.vue";

describe("The app without the bug", () => {
  // 1
  it("the title and content were not updated when adding or editing notes", async () => {
    const wrapper = mount(App, {
      global: { stubs: { "transition-group": false } },
    });

    wrapper.find('[data-test="add-note"]').trigger("click");

    await wrapper.vm.$nextTick();

    const { content: modalContent, title: modalTitle } =
      wrapper.findComponent(NoteModal).vm.note;

    expect({
      title: modalTitle,
      content: modalContent,
    }).toEqual({
      title: "",
      content: "",
    });

    const notes = wrapper.findAll("li");

    const firstNote = notes.at(0);

    firstNote.find("button").trigger("click");

    await wrapper.vm.$nextTick();

    const modal = wrapper.findComponent(NoteModal);
    const { content, title } = modal.vm.note;
    expect({
      title,
      content,
    }).toEqual({
      title: "Meeting with Clients",
      content: "Discuss project updates and deliverables with clients at 2 PM.",
    });
  });

  // 2
  it("the page was reloaded when adding or editing notes", async () => {
    const event = vi.fn();

    // triggered when clicking the submit button without preventing the default behavior
    window._virtualConsole.emit = event;

    const wrapper = mount(App, {
      attachTo: "body",
      global: { stubs: { "transition-group": false } },
    });

    const notes = wrapper.findAll("li");

    const firstNote = notes.at(0);

    firstNote.find("button").trigger("click");

    await wrapper.vm.$nextTick();

    const modal = wrapper.findComponent(NoteModal);

    modal.vm.note.title = "Hello world!";

    const submitBtn = wrapper.find('[data-test="submit"]');

    submitBtn.trigger("click");

    await wrapper.vm.$nextTick();

    expect(event).not.toHaveBeenCalled();
  });
});
