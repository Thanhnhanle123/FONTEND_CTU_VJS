<template>
    <div v-if="!contact" class="page">
        <h4>Thêm liên lạc</h4>
        <ContactForm :contact="contact" @submit:contact="addContact" />
        <p>{{ message }}</p>
    </div>

    <div v-if="contact" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <ContactForm v-if="contact" :contact="contact" @submit:contact="updateContact"
            @delete:contact="deleteContact" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
    components: {
        ContactForm,
    },
    props: {
        id: { type: String, default: null },
    },
    data() {
        return {
            contact: null,
            message: "",
        };
    },
    methods: {
        async addContact(data) {
            try {
                await ContactService.create(data);
                alert('Liên hệ thêm thành công.');
                this.$router.push({ name: "contactbook" });
            } catch (error) {
                console.log(error);
            }
        },
        async getContact(id) {
            try {
                this.contact = await ContactService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateContact(data) {
            try {
                if (this.contact) {
                    await ContactService.update(this.contact._id, data);
                    alert('Liên hệ được cập nhật thành công.');
                    this.$router.push({ name: "contactbook" });
                }
            } catch (error) {
                console.log(error);
            }
        },
        async deleteContact() {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    if (this.contact) {
                        await ContactService.delete(this.contact._id);
                        this.$router.push({ name: "contactbook" });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        if (this.id != undefined && this.id != null) {
            this.getContact(this.id);
        }
        this.message = "";
    },
};
</script>
