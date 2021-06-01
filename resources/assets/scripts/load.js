const load = (bodyClass, callback) => {
  if (bodyHasClass(bodyClass)) {
      callback(bodyClass);
  }
}

const bodyHasClass = (selector) => {
  return document.body.classList.contains(selector);
};

export default load;