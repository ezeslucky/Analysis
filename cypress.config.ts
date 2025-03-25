/* eslint-disable prettier/prettier */
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  // default username / password on init
  env: {
    analyzr_user: 'ezeslucky',
    analyzr_password: 'ezeslucky',
  },
});
