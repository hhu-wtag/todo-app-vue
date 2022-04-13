const mixin1 = {
  data: function () {
    return {
      message: "This data property is in mixin",
      age: 42,
    }
  },
  created: function () {
    console.log("Hello from Mixin created Hook")
  },

  mounted: function () {
    console.log("Hello from Mixin Mounted Hook")
  },
}

export default mixin1
