<template>
  <v-app id="app">
    <v-main>
      <v-container class="main">
        <v-card>
          <v-card-title>
            Redirector
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-text>
            <v-text-field label="data" v-model="data" />
            <v-text-field label="secret" v-model="secret" />
            <v-text-field label="salt" v-model="salt" />
            <v-text-field label="return url" v-model="returnUrl" />
            <v-btn color="primary" @click="redirect()">Go</v-btn>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <div>
              Encrypted data:
            </div>
            {{ encrypted }}
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import itsencrypt from './its-encryption';

export default {
  name: 'App',
  components: {},
  data: () => ({
    data: '',
    secret: '',
    salt: '',
    returnUrl: '',
  }),
  computed: {
    encrypted() {
      return itsencrypt(this.data, this.secret, this.salt);
    },
  },
  async created() {
    this.returnUrl = this.$route.query.returnUrl;
  },
  methods: {
    redirect() {
      window.location.replace(`${this.returnUrl}?tk=${itsencrypt(this.secret, this.secret, this.salt)}&dt=${itsencrypt(this.data, this.secret, this.salt)}`);
    },
  },
};
</script>

<style scoped>
.main {
  width: 350px;
  min-width: 25vw;
}

.v-btn {
  width: 100%
}
</style>
