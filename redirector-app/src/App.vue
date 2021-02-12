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
            <v-text-field label="redirect url" v-model="redirect" />
            <v-btn color="primary" @click="go()">Go</v-btn>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <div>
              <v-icon @click="encrypt()">mdi-refresh</v-icon>
              Encrypted data:
            </div>
            <v-card-text>
              {{ encryptedData }}
            </v-card-text>
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
    secret: 'correct-horse-battery-staple',
    salt: 'e8239bc9d83f791a',
    redirect: '',
    returnUrl: '',
    encryptedData: '',
  }),
  async created() {
    this.redirect = this.$route.query.redirect;
    this.returnUrl = this.$route.query.returnUrl;
  },
  methods: {
    encrypt() {
      this.encryptedData = itsencrypt(this.data, this.secret, this.salt);
    },
    go() {
      window.location.replace(`${this.redirect}?Token=${this.urlencode(itsencrypt(this.secret, this.secret, this.salt))}&DT=${this.urlencode(itsencrypt(this.data, this.secret, this.salt))}&OneLogin=TEST&returnUrl=${this.returnUrl}`);
    },
    urlencode(source) {
      // Encode in classical base64
      let encodedSource = source;

      // Remove padding equal characters
      encodedSource = encodedSource.replace(/=+$/, '');

      // Replace characters according to base64url specifications
      encodedSource = encodedSource.replace(/\+/g, '-');
      encodedSource = encodedSource.replace(/\//g, '_');

      return encodedSource;
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
