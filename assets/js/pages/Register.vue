<template>
    <b-spaced-container>
        <b-form title='Register New User' action-title='Register' @submit='register' :disabled="inProgress">
            <b-field label="Name" help="Your user name">
                <input type="text" v-model="name" required></input>
            </b-field>
            <b-field label="Phone Number" help="Your phone number">
                <input type="tel" v-model="phoneNumber" required></input>
            </b-field>
            <div slot="footer">
                <router-link to="/login">Login with existing user</router-link>
            </div>
        </b-form>
    </b-spaced-container>
</template>
<script>

import BSpacedContainer from '@components/BSpacedContainer.vue'
import BForm from '@components/BForm.vue'
import BField from '@components/BField.vue'
import {postData} from '../request'
import normalizePhoneNumber from '../phone-number'

export default {
    data: () => ({
        name: '',
        phoneNumber: '',
        inProgress: false
    }),
    methods: {
        register() {
            this.$data.phoneNumber = normalizePhoneNumber(this.$data.phoneNumber)
            postData('/register', this.$data, () => {
                this.$router.push({path: '/verifyCode', query: {phoneNumber: this.$data.phoneNumber}});
            }, this.$data);
        }
    },
    components: {
        'b-form': BForm,
        'b-field': BField,
        'b-spaced-container': BSpacedContainer
    }
}
</script>
