export function imagePromise(state) {
  Promise.all(
    Array.from(document.querySelectorAll("img")).map((img) => {
      if (img.complete) return Promise.resolve(img.naturalHeight !== 0)
      return new Promise((resolve) => {
        img.addEventListener("load", () => resolve(true))
        img.addEventListener("error", () => resolve(false))
      })
    })
  ).then((results) => {
    if (results.every((res) => res)) {
      setTimeout(() => {
        state(false)
      }, 500)
      console.log("all images  finished loading")
    } else {
      setTimeout(() => {
        state(false)
      }, 500)
      console.log("some images failed to load, all finished loading")
    }
  })
}
