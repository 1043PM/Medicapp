<template>
  <v-navigation-drawer v-model="drawer" fixed app>
    <div class="profile">
      <div>
        <img :src="user.photo">
      </div>
      <div>
        <span>{{user.email}}</span>
      </div>
    </div>

    <v-list dense>
      <v-list-tile v-for="option in options" :key="option.title" v-bind:to="option.url">
        <v-list-tile-action>
          <v-icon>{{option.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{option.title}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="logout()">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Salir</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>




<script>
import bus from '../../bus';
export default {
  data: () => ({
    drawer: false,
    options: [
      {
        title: "Registros médicos",
        icon: "assignment_ind",
        url: "/panel/reports"
      }
    ],
    user: {
      name: "Alex",
      email: "Alex@gmail.com",
      photo:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhIVFRUQEhAVFRUVEBAQFRUVFRIWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0dHR8rLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tNzc3LS03Ky0rK//AABEIAJsBRAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAACAQMEBQYABwj/xAA2EAACAQMDAgUCBAUDBQAAAAAAAQIDBBEFEiExQQYTIlFhcYEyQpGxBxRSocEVFiMzQ1Ni8P/EABoBAAIDAQEAAAAAAAAAAAAAAAECAAMEBQb/xAAkEQACAgICAQUBAQEAAAAAAAAAAQIRAyEEMRIFEyIyQVFhFP/aAAwDAQACEQMRAD8A8xTCyNoVMzmRoMJAJnZDZWO5HISI6kOQYAVZLpzIN5UJXRdSuuJclPbOxwsbS2BFZOB3AtjG9sUWAKLDSbVTlh9kButi2WGi2DTU89UaiK4wR7aiopJLoiSYpyt2WJC4HENZF3FYULIbqQyFvQqkgWEr6lAOMP8A7BJmAg+QKG0OxYDQsSWQfQMkLTY6QI1BjqB2hRJRByKCEiLgZIWxcjiG0HkYDYUuhnrtqlPjtJSX6l+Q763h+KXYeMmnYYjtHX1FvMfTjhlta6lTm0k+ZLKMHqksPMehBhqk4vhnShzsiM3I9Pw5Ns9UqVYx25f43iPySaNPPQ8zjrjnjc36V6X7cdjU6P4ijCMFslJYjHP+WXR9Qb7Obl9IpfBmqVD4Odv8E639Sz7r4H1SLVyjkSwNOmU8rYblbl3KiMzol8eSJLGyodMQsnQOLf8AoKvakfPx2RJAZOMjstDyYuRpSCyRlbiOJhxYwmHCQrBFbH5z4IdUkTkRpsqjo7vH+g0ghDkhiwVMu/DTeZfVFFk0fh38P3K8n1CjRphZGwkzEW2KcC2JkhLDwKkDk5yISwgcAZDQGgoVRQ5KKGkHkhBEhxAoJIhBMDkEIohKQG6IlbHEKmNwjKTUYLMn2NDaeD6klmrUcfiIcank+qLJLHjXzZR4FZeXPg+cVmnWk3/7IoqlOcHsqLDRa4Tj9ihTxy+rFTEr01KDT9gkEGLB0ZC6gvUnn4M9WksmxuaXrcWujePozN6tZbZPBpxv8Hmm0RqdUudL1VJKDXf+xnN2A41CSx2JDJWmepaL4hnSUUoqUd3TLzhs39tcKfQ+f9OusNepprHRnpngW/qTT3ZajLGX+ZYBCTi6Zl5eGEl5I3biNygOxkDNl6yaOK4oYcDgmzg+4xPbR87fyEmDLTp+xuaOmr2DlpnwdJcMofLZ59K1khtrBs72wwZy/oYKMmDxL8WXzK3IcWNsWn1MzNKxsemR2TJRyuCLUTKUdfAkoCZBycIgssFwajw3T9PPuZjJrPDc47Eu66lWX6kLpxBHJIbaMjGFwdtOSFyAKOSOwDJ46h2ttVqv/jg384wv1K25N/FWXQgu2wlAXYW9v4SuZdZRj8AXHhq5hzhSx7dRnjzL8C54fyRVuAm0daa4ksM4iv8ARJAKIeBEEkESxAZP26vgJosdBsHKe59E/wC40cLyNIiyKG2X3h7R/KipyXqks59i9ndKKzKSSXv0Iyq4ST7Hnv8AEDxRBSnSSbgk48P8yO1DFHGqRy82SWadm1/3bbKWxV4Zz0yhvV7ZVoZjjdHMk+OeOh4c6tnK4Unv8tyg5dU+iyv1yej+D/FtGVWtRgm4xf8Ax7uXt2pfuGaUlsEG4vRzhh/D5BnIl37TfHZsr608Rb9kcuSqVHSjK0U2s1XuyuyIF0t0FnlkS/v25v2ZY2kE4/OMktxZoxq0ZivRw3lDcYF5qlBJZKNs0Rdoz5IpMkW/DR6h/D+9m4yjKPpi47JdOvVHltGrg2HgqunWSlJrhuKy0nL2wVStMryK4M9ehM5zI1GfpX0D3CpnAlpscczhlsQcFmco0EHKkh0SbS6s9bpHHim3oodTooyV/b5bz0NRrl7FcJ9DF39422cnl510j0fp/Ck/lITZSXDjkiV5U+ywMTmxpr3Oars7jxwSoeU8dBqUgUwZgoSkujkdtOihQsUEu/Dc/U449mUjkWmgXG2pj+r/AALNaAmbVsDItOeVkTJhY4uRJSxyK0BKnmUY/wBUkn9CeN6Ci10DSPOe+pxHjC7P5N3bW8IRW1rHfjGCoscRjhfb6FL411yVKmoReHJOTfx0wdfBhjCJg5GaUpeKZor3xLbUs+ZVjHGE+e7FsfEFvX/6NaM8dcPk8DrapPLbbal1T5F0nXZW9TzIxTfC6vhZy+PoWtoz+J7fr2nKpBzivVFN8dzILKNrpWtQuKcZxjiM6aa+6MlewxJr2bX9zn8nFFbRv4+WXTAgOsYQayYTUwi00Cvhyj9Giq2nQk4SU126/Q0YZ+LKpxtGznVPHPGtJ+bPP/kl+j5R6VS1BSRReI9Ejc+qLxLGHnozpvIpIxLG4s8nRo/4fUn/ADEprpGDX6tEmXgStnmpBR/Vmj0fTKdrDbF5k+W+7YkppIKxuy1qSIF/WUYPPfgkqRW+IZry/uc9u5GxKjIXMMy4LPTKjxz24K2Msy+5Z0qe2XXjgadmnGM6zB468GfbNRrFT04x26mXkv3Lcb0UZuw6aNn4I0xVZqeZLyWmmsYb9smMpo9U8A2U6dFb1huUnj47CzM2WbjFmxoRwhzI2mK5CI4j27CycBk4agUVJT+ILmKg0201yi2q1MLoef8Aia+bk10WX3PS8qfjGkV+ncfzmrKe/um2+XgrKlVscnUTGZNHC7ez1uoqgJTAcxJPJY2mkOaTTxkjaRXuXRXxkEy4uNHUI56sqaqwwJ2BpoSILB3HYIK2LgeoVXGSkuzGUGgMiRr9K1ZVFjGC42mCsrpweV9zW6VfOovYy5IU9DonrgbbxOD9pIdaBwVxdSsDbNVZ1+Opj/4g5bz2cEl9mWFC928A6io1o7ZfZnWhkUomCcWpWeVTTyNSi28LlvhfV9DVXPhGo3mE1hsuPD/hCFOSqVZbpJ5S7ILpASs1XhWg6NvBS/7dKKf1x0IFzVzLPu/3Jd/qCUdkfjJXU6eXlmLkZLNWGJIpxyPxoBU44HkYTVQz5IX8uOocgiJhZBlbNfh4GZuouqLlRQLpL2LozZXKKZSTqzfbAkafdlvO3iMTtsEcmwJJERIr9Vtt6x9S3cCNXQl0yxKzz+6pOLY7Y3Ek+ec+5otVtFJcLkzcIbZc9sl/laHSaZZ6lNuC+EZqUuS9qTk4dM4KepHksxv4leVbHLKm5SSXdo9d8MUKsKUY1eqcl78dkYvwboyqPzG1iD5WOvdP+x6XSWEI5bOby8iUfFD6ZzYGRCJHKDOAycGmQqL2tGMcyeOp5hr9dOTw88v9z0TXaUZQe544PMNTpxUnh5O5y23KjZ6VFVZXSngalPIdRICKOc9HXdk3TbPe/hM1tGmopJFFovC+pcOsZJy2accNC3slsZlLpcs0d224mdulyNCQs1oiM7IuDkXGZipCNnMQgRyMiVaXTg00/sQshKQrjYUbPTNV8zOexaxkef21Zp5TwXllrEuj5Ms8dbQ6VmiqRTGKm5dORKFwpckhSRWptCuH9IyvZL8rC/nZvhD6Q9Tp4D70mKsaGLehJvMizpwSQ0mORkVuTZdFUOQyPJjCmEpgGH0wlIjqoDUvYRXqkl9yJWK2To1DtxS1deox/P8AoP2urU6j9Ms/qWeLE8izyKxmMw0yIlDdWBX3CwWjIF7EkkGEtlbVWTO6hQSln3Zo6hX3dJNPJIs0fhW78Q46DGl2EqtaC2txc1ufbC6kq10/zOFJJNpfc3ugaTGjCK6uK6/PuXRejHy8qgibpOm06UWoR25eSwEjg7IUefnNyZwuRBGxxAsnA5OAGyo1enF03uPK9XjHcz1rULTzYOGep5l4h0adKb3fudzmRfZo9LmujOSQsEFKIOTmM7zRe6XJOPTlE+USh02pLOI45NNGjJrkyyjsujLRFa4KK+hyzU07bnkzurU+eBoqiubsqpAsNoVRLkVAIRitCMhDmzkhEHFkIORyWOnUlIroyLfR1+5TldIeG2XlrFpEymBRisDqZhWyyUR6CHExrISIysdTDyMqQW4lBHNx1Sqkm32GmyJqM/8Ajl9Boq2BzpEO41CpUzseEv1KWpUmnzyyFWu5Rbw2gVqcsdTdCKRklN2TJVG/ypfYm2VaosNrGHgoJ30n3Dp3036cseS0BSs9Ksq6ccknzCg0WTUEmWiqGKT2aYrRNVQZu3wM+cdXqeki2FkKbI9eHpf0H0xm6/C/oCnY/nop9Iot14Q7PL+uOT0y0l6UYXwzVfm8x4inh/U21KZZ+HJ502TVI7cRlMOMh0c4kbjtwzvO3j0QcycN7hCUQFoxPifRstteZLHfe8c9jaSmVWprfFx3NZ9j02aNxMfEyuErPJrilhvtj7kYvNbsnGTKNvk4clTPWY8inGx2lUceUy/0fUm8qUuEZvIdOo10KpRstUj0CzuIS7r9SNrFnBx3Rx3MZC5ku7S+of8AOyxjc8fURRI5IGtTw8DMkE5sCUsjiioFoVCkIgIochA5BRYGQchTLuxgkkU1DqXlrB4Mud6L8dFlRkPwkQ6bwP05mQskybGQakMQYbkMiiTHdwm8YcxN4RbJORi5WU17nKZzkPHsBj9Utmmyq2M3VxbRl1K1aNFdzTHMktlUoWZqFFvsXOl6dzl/YtKdhGK9yRTjgWeW9IMYJEu1WESFUIfnpIgV9UinxyypQbLVbL3z0VN9rsE9i5+SlutQnJYXBAtbeTmu/JbGKXYXBm3sp7lkjaxVxHC6sk2UcQRn9Yud1TC7PH3A0VSf4W/hilNycvy/5NingoPDdvKEEpdc5LyTAzkcyduhzeEqhGcjt46MSZLUw95CUwlUHGslSmIM7xAkscrywVF5ULC5mUl3UPS5p0jBiRUatBSMtdWvOcGnu5ZKu5OHOVyO/wAXK4oz844BwWc0huVun0Es6HmmrK9iYJ0bX3JFKkl2A2ByRXLOBGW9elmJVyhyLY8WAggZCphGOOyIc2QDY/ar1I0trHgzFs+Uam0fCMucshIckLRlydUWSJVr7OcGZRsdyLVTFdQplq0X3wdLVYLuixY2UyZbuYPmopJ6xH3GZ6yuxZ7TFs0PnIGVyjL1dXk+gw76o2MsDJs1rukR7jU4R6szUnOXVsKFtnqH24otWKUixq67nohiWqTY3C2Q+qSJ8V0jRDjf0aVaUurYdO3bJFOl8E2lbyfRE8i1QhFbI9O3SLa009JJtcsetbDvIl1qiS+ghnzZl0iFqFz5cCk0m082puz0km17nXHmV6m2KbWTUaJoKprL6vGQ9HMy5lFMuLWntXyPM7GEBknZxsknKVgyEyKxtsZAQaYqkM7hdw4SRk4ZUhSABvKhSXci0uimujt8uZnxIh1SuuVwWc+hXXXQ5Cezq4iqmDkOoAMbF0ORQ9TQ1AfpkCPxjlYKy7oNFtSGNQRW9F2Mo5wYkR+qMMZMtZzYIcUEMBj2ntblk09FrCMrb/iRo7V8GfKtiomnOCfDWRvIqZR0GxmrpNOXOMEKfh5P8LLpPgcix1J/0nkZ/wD24/cT/QZLokzROQLYfckOp1+Ge/0eS/KFDTJf04LxSYs5E8mx/d/wqIaY2EtN+SxyC2Cw+8yNCwj/AFD9Ozivk6DCmxRPekSKdOK6IN1SCpMk0hkiqU2yTCtgotW1DL2xZK1WbUeHgzsZPd91+5ZQhvfDlo4RW7DzyvfkvWyDpv4V9F+xLbEl2cnlSuZzYLZ0gQoy0dKQ1JhSGpDDJCbhdwDOChqHFM4FHBFP/9k="
    }
  }),
  methods: {
    logout() {}
  },
  beforeMount() {
    let user = this.$store.getters.getUser

    console.log(user);

    console.log(user[0]);

    this.user.name = user[0].name;
    this.user.email = user[0].email;

    bus.$on("notificationDrawer", () => {
      this.drawer = !this.drawer;
    });
  }
};
</script>

<style>
.profile {
  background: url("https://i.imgur.com/wt4NRqA.jpg");
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  height: 160px;
}

.profile div {
  display: flex;
  margin: 0px 24px;
}

.profile div img {
  margin-top: 16%;
  width: 65px;
  height: 65px;
  border-radius: 50%;
}

.profile div span {
  color: white;
  margin-top: 4%;
}
</style>