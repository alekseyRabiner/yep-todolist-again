export const checkEmptyInput = ({desc, title}, event) => {
  const elems = event.target.elements;
  if (!(title && desc)) {
    elems.desc.value ? null : elems.desc.classList.add('has-danger');
    elems.title.value ? null : elems.title.classList.add('has-danger');
    return false;
  }
  return true;
};
