var app = new Vue({
  el: "#app",
  data: {
    name: null,
    email: null,
    tokenExistence: null,
    imagesSrc: null,
    selectedFile: null,
  },
  // mounted: function () {
  //   this.loadImages
  //   this.checkToken
  // },
  methods: {
    getToken() {
      axios.post('http://35.240.157.177/request-token', {
          name: this.name,
          email: this.email,
        })
        .then(function (response) {
          if (response.data.error) {
            alert(response.data.error.errorMessage)
          } else {
            localStorage.token = response.data.uuid;
            console.log(localStorage);
            this.tokenExistence = true;
            alert("token is well received!")
          }
        })
    },
    checkToken() {
      console.log("checkToken Jalan...");
      if (localStorage.token) {
        this.tokenExistence = true;
      } else {
        this.tokenExistence = false;
      }
    },
    loadImages() {
      // window.location = "images.html"
      console.log("loadImages jalan...");
      axios.get("http://35.240.157.177/image", {
          'headers': {
            'authorization': localStorage.token
          }
        })
        .then(function (imagesData) {
          console.log(imagesData);
          this.imagesSrc = imagesData.data;
          console.log(this.imagesSrc);
          this.tokenExistence = true;
          // console.log(this.tokenExistence);
          // console.log(this.imageSrc);
        })
        .catch(function () {
          this.tokenExistence = false;
        })
    },
    onUpload() {
      const formData = new FormData()
      formData.append('image', this.selectedFile, this.selectedFile.name)
      console.log(formData);
      axios({
        method: 'post',
        url: "http://35.240.157.177/image",
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': localStorage.token,
        }
      })
      // axios.post("http://35.240.157.177/image", {
      //     'headers': {
      //       'authorization': localStorage.token
      //     },
      //     'data': formData
      //   })
      //   .then((msg) => {
      //     console.log(msg);
      //   })
    },
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    }
  }
})
