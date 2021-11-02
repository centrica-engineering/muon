export default (name, el) => {
  const prefix = process.env.MUON_PREFIX;
  const element = `${prefix}-${name}`;

  customElements.define(element, el);

  const elName = name ? name : element;
  const defaultValues = {
    title: element,
    component: elName
  };

  const template = (args, inner) => {
    const dynamicArgs = Object.keys(args).map((a) => {
      if (typeof args[a] === 'boolean') {
        return args[a] === true ? a : undefined;
      } else {
        return `${a}="${args[a]}"`;
      }
    }).filter((a) => a).join(' ');

    return `
    <${element} ${dynamicArgs}>${inner ? inner(args) : ''}</${element}>
  `;
  };

  return {
    defaultValues,
    element,
    elName,
    template
  };

};
